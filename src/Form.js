import React, { forwardRef, useImperativeHandle, useMemo, useState, useRef, useEffect } from 'react';
import { Provider } from './context';
import useEvent from './useEvent';
import _get from 'lodash/get';
import unset from 'lodash/unset';
import cloneDeep from 'lodash/cloneDeep';
import ruleValidate from './ruleValidate';
import cancelablePromise from './cancelablePromise';
import { getFields, computedFormData, parseFormData, computedIsPass, computedError } from './util';
import Group from './group';
import RULES from './RULES';
import { filterEmpty } from './empty';
import { runInterceptors } from './interceptors';

const usePropsRef = props => {
  const propsRef = useRef({});
  Object.keys(props).forEach(name => {
    propsRef.current[name] = props[name];
  });
  return propsRef;
};

const useFormStateEvent = ({ state, initDataRef, rules, interceptors, noFilter, onPrevSubmit, onError, onSubmit, debug }) => {
  const emitter = useEvent(debug);
  const [formState, setFormState] = state;
  const eventQueue = useRef([]);
  const propsRef = usePropsRef({
    formState,
    rules,
    onPrevSubmit,
    onError,
    onSubmit
  });

  useEffect(() => {
    emitter.emit('form-state-change', { data: computedFormData(formState, interceptors), state: formState });
  }, [emitter, formState]);

  useEffect(() => {
    const createSetFieldInfo = ({ name, index, key, value }) => oldState => {
      const field = Object.assign({}, oldState[name]);
      const filedData = Object.assign({}, field.data);
      const fieldDataItem = Object.assign({}, filedData[index]);
      fieldDataItem[key] = value;
      filedData[index] = fieldDataItem;
      field.data = filedData;
      return Object.assign({}, oldState, { [name]: field });
    };
    const validateAllFields = () => {
      Object.keys(propsRef.current.formState).forEach(name => {
        const field = propsRef.current.formState[name];
        Object.getOwnPropertySymbols(field.data).forEach(index => {
          emitter.emit('form-field-validate', { name, index });
        });
      });
      return Promise.all(eventQueue.current.map(({ task }) => task));
    };
    const getTaskKey = ({ index }) => {
      return index;
    };
    const getFormData = () => {
      const value = computedFormData(propsRef.current.formState, interceptors);
      return noFilter ? value : filterEmpty(value);
    };
    emitter.addListener('form-field-add', ({ name, label, rule, interceptor, noTrim, value, index, groupName, fieldRef }) => {
      setFormState(oldState => {
        const fieldItem = Object.assign({}, oldState[name], {});

        if (!fieldItem.field) {
          fieldItem.field = { name, label, rule };
          fieldItem.data = {};
        }
        const nextIndex = Object.getOwnPropertySymbols(fieldItem.data).length;
        const formDefaultValue =
          value ||
          (() => {
            if (groupName && groupName === name) {
              const path = `["${groupName}"]["${nextIndex}"]`;
              const target = _get(initDataRef.current, path);
              const other = cloneDeep(initDataRef.current);
              if (Array.isArray(other[groupName])) {
                other[groupName].splice(nextIndex, 0);
              }
              initDataRef.current = other;
              return target;
            }

            if (groupName) {
              const path = `["${groupName}"]["${nextIndex}"]["${name}"]`;
              const target = _get(initDataRef.current, path);
              const other = cloneDeep(initDataRef.current);
              unset(other, path);
              initDataRef.current = other;
              return target;
            }
            return _get(initDataRef.current, name);
          })();
        fieldItem.data[index] = {
          index: nextIndex,
          SymbolIndex: index,
          noTrim,
          groupName,
          fieldRef,
          interceptor
        };
        if (formDefaultValue !== undefined) {
          fieldItem.data[index].value = runInterceptors(interceptors, 'input', interceptor)(formDefaultValue);
          setTimeout(() => {
            emitter.emit('form-field-validate', { name, index });
          });
        }
        return Object.assign({}, oldState, {
          [name]: fieldItem
        });
      });
    });
    emitter.addListener('form-field-remove', ({ name, index }) => {
      setFormState(oldState => {
        const state = Object.assign({}, oldState);
        const fieldItem = Object.assign({}, oldState[name]);
        if (fieldItem.data) {
          delete fieldItem.data[index];
          if (Object.getOwnPropertySymbols(fieldItem.data).length === 0) {
            delete state[name];
          } else {
            state[name] = fieldItem;
          }
        }
        return state;
      });
    });
    emitter.addListener('form-field-validate', ({ name, index }) => {
      const item = propsRef.current.formState[name];
      setFormState(
        createSetFieldInfo({
          name,
          index,
          key: 'validate',
          value: {
            status: 3,
            msg: ''
          }
        })
      );

      const splitTask = () => {
        const currentTask = eventQueue.current.find(({ id }) => id === getTaskKey({ name, index }));
        eventQueue.current.splice(eventQueue.current.indexOf(currentTask), 1, 0);
        return currentTask;
      };

      const currentTask = eventQueue.current.find(({ id }) => id === getTaskKey({ name, index }));
      if (currentTask) {
        currentTask.task.cancel();
        splitTask();
      }
      const value = _get(item.data[index], 'value'),
        noTrim = _get(item.data[index], 'noTrim');
      let trimValue = value;
      if (typeof value === 'string' && noTrim !== true) {
        trimValue = value.trim();
        if (value !== trimValue) {
          emitter.emit('form-field-data-change', { name, value: trimValue, index });
        }
      }
      const task = cancelablePromise(
        ruleValidate({
          filed: item.field,
          value: trimValue,
          formRules: propsRef.current.rules,
          getFormData
        })
      );
      task.then(validate => {
        const validateRes = {
          status: validate.result === true ? 1 : 2,
          msg: validate.errMsg
        };
        setFormState(
          createSetFieldInfo({
            name,
            index,
            key: 'validate',
            value: validateRes
          })
        );
        splitTask();
        emitter.emit('form-field-validate-complete', { name, value: trimValue, index, validate: validateRes });
      });
      eventQueue.current.push({
        id: getTaskKey({ name, index }),
        task
      });
    });
    emitter.addListener('form-field-data-change', ({ name, value, index }) => {
      setFormState(oldState => {
        const newState = createSetFieldInfo({
          name,
          index,
          key: 'value',
          value: value
        })(oldState);

        //在有接收到字段的新的值，将验证状态初始化
        return createSetFieldInfo({
          name,
          index,
          key: 'validate',
          value: {
            status: 0,
            msg: ''
          }
        })(newState);
      });
    });
    emitter.addListener('form-data-set', ({ data }) => {
      setFormState(oldFormSate => {
        initDataRef.current = data;
        return parseFormData(oldFormSate, data, interceptors);
      });
      setTimeout(validateAllFields);
    });
    emitter.addListener('form-data-reset', () => {
      setFormState(oldFormSate => {
        initDataRef.current = {};
        const data = Object.assign({}, oldFormSate);
        Object.keys(data).forEach(name => {
          const filedData = data[name].data;
          Object.getOwnPropertySymbols(data[name].data).forEach(index => {
            delete filedData[index].validate;
            delete filedData[index].value;
          });
        });
        return data;
      });
    });
    emitter.addListener('form-data-set-field', ({ name, value }) => {
      const groupName = value.groupName;
      setFormState(oldFormSate => {
        const data = Object.assign({}, oldFormSate);
        let fieldData = _get(data[name], 'data');
        if (!groupName) {
          fieldData = {};
          Object.getOwnPropertySymbols(fieldData).forEach(index => {
            fieldData[index] = value;
          });
        } else {
          const index = Object.getOwnPropertySymbols(fieldData).find(index => {
            return _get(fieldData, `[${index}]["groupName"]`) === groupName;
          });
          fieldData[index] = value;
        }

        return Object.assign({}, data, { [name]: fieldData });
      });
    });
    emitter.addListener('form-submit', () => {
      validateAllFields()
        .then(() => {
          return (async () => {
            const isPass = computedIsPass(propsRef.current.formState);
            if (!isPass) {
              const errors = computedError(propsRef.current.formState);
              emitter.emit('form-submit-error', errors);
              propsRef.current.onError && (await propsRef.current.onError(errors));
              return false;
            }

            const formData = getFormData();
            emitter.emit('form-prev-submit');
            if (propsRef.current.onPrevSubmit && (await propsRef.current.onPrevSubmit(formData)) === false) {
              emitter.emit('form-prev-submit-error');
              return false;
            }
            propsRef.current.onSubmit && propsRef.current.onSubmit(formData);
            emitter.emit('form-submit-success', formData);
            return true;
          })();
        })
        .then(
          res => {
            emitter.emit('form-submit-end', res);
          },
          e => {
            console.error(e);
            emitter.emit('form-error', e);
          }
        )
        .then(() => {
          emitter.emit('form-submit-complete');
        });
    });
    return () => {
      emitter.removeAllListeners();
    };
  }, [emitter, setFormState, propsRef, initDataRef]);

  return emitter;
};

const Form = forwardRef((props, ref) => {
  const { onPrevSubmit, rules, interceptors, noFilter, data, onError, onSubmit, debug } = props;
  const formRules = Object.assign({}, RULES, rules);
  const [formState, setFormState] = useState({});
  const [formIsMount, setFormIsMount] = useState(false);
  const initDataRef = useRef(data);
  const emitter = useFormStateEvent({
    state: [formState, setFormState],
    initDataRef,
    onPrevSubmit,
    onError,
    onSubmit,
    rules: formRules,
    interceptors,
    noFilter,
    debug
  });
  useEffect(() => {
    setFormIsMount(true);
    initDataRef.current && emitter.emit('form-data-set', { data: initDataRef.current });
    emitter.emit('form-mount');
    return () => {
      emitter.emit('form-unmount');
    };
  }, [emitter]);

  const formData = useMemo(() => computedFormData(formState, interceptors), [formState]);
  const fields = useMemo(() => {
    return getFields(formState, (item, field) => {
      return {
        field: item,
        label: field.label,
        name: field.name,
        rule: field.rule
      };
    });
  }, [formState]);

  useImperativeHandle(
    ref,
    () => {
      return {
        emitter,
        submit: () => {
          emitter.emit('form-submit');
        },
        get isPass() {
          return computedIsPass(formState);
        },
        get data() {
          return computedFormData(formState, interceptors);
        },
        get fields() {
          return fields;
        },
        get formState() {
          return formState;
        },
        set data(data) {
          emitter.emit('form-data-set', { data });
        },
        reset() {
          emitter.emit('form-data-reset');
        },
        onReady(callback) {
          emitter.addListener('form-mount', () => {
            callback && callback();
          });
        },
        onDestroy(callback) {
          emitter.addListener('form-unmount', () => {
            callback && callback();
          });
        },
        validateField(name, groupName) {
          const field = formState[name];
          const index = Object.getOwnPropertySymbols(field.data).find(index => {
            const item = field.data[index];
            return !groupName || groupName === item.groupName;
          });
          if (!index) {
            console.error(`group[${groupName}]中没有找到字段[${name}]`);
            return;
          }
          emitter.emit('form-field-validate', { name, index });
        },
        setField({ name, value }) {
          emitter.emit('form-data-set-field', { name, value });
        }
      };
    },
    [emitter, fields, formState]
  );
  return (
    <Provider
      value={{
        formState,
        formData,
        initDataRef,
        formIsMount,
        rules: formRules,
        fields,
        emitter
      }}>
      <Group>{props.children}</Group>
    </Provider>
  );
});

export default Form;
