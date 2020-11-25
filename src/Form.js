import React, { forwardRef, useImperativeHandle, useMemo, useState, useRef, useEffect } from 'react';
import { Provider } from './context';
import useEvent from './useEvent';
import _get from 'lodash/get';
import ruleValidate from './ruleValidate';
import cancelablePromise from './cancelablePromise';
import { computedFormData, parseFormData, computedIsPass, computedError } from './util';
import { Group } from './group';
import RULES from './RULES';

const useFormStateEvent = ({ state, rules, onPrevSubmit, onError, onSubmit, debug }) => {
  const emitter = useEvent(debug);
  const [formState, setFormState] = state;
  const formStateRef = useRef(formState);
  const formRulesRef = useRef(rules);
  const onPrevSubmitRef = useRef(onPrevSubmit);
  const onErrorRef = useRef(onError);
  const onSubmitRef = useRef(onSubmit);
  const eventQueue = useRef([]);
  formStateRef.current = Object.assign({}, formState);
  formRulesRef.current = Object.assign({}, rules);
  onSubmitRef.current = onSubmit;
  onErrorRef.current = onError;
  onPrevSubmitRef.current = onPrevSubmit;

  useEffect(() => {
    emitter.emit('form-state-change', { data: computedFormData(formState), state: formState });
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
    const getTaskKey = ({ index }) => {
      return index;
    };
    const getFormData = () => {
      return computedFormData(formStateRef.current);
    };
    emitter.addListener('form-field-add', ({ name, label, rule, index, groupName, groupIndex, fieldRef }) => {
      setFormState(oldState => {
        const fieldItem = Object.assign({}, oldState[name], {});

        if (!fieldItem.field) {
          fieldItem.field = { name, label, rule };
          fieldItem.data = {};
        }
        fieldItem.data[index] = {
          index: groupIndex,
          groupName,
          fieldRef
        };
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
          if (Object.keys(fieldItem.data).length === 0) {
            delete state[name];
          }
          state[name] = fieldItem;
        }
        return state;
      });
    });
    emitter.addListener('form-field-validate', ({ name, index, noTrim }) => {
      const item = formStateRef.current[name];
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

      const value = _get(item.data[index], 'value');
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
          formRules: formRulesRef.current,
          getFormData
        })
      );
      task.then(validate => {
        setFormState(
          createSetFieldInfo({
            name,
            index,
            key: 'validate',
            value: {
              status: validate.result === true ? 1 : 2,
              msg: validate.errMsg
            }
          })
        );
        splitTask();
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
        return parseFormData(oldFormSate, data);
      });
    });
    emitter.addListener('form-data-reset', () => {
      setFormState(oldFormSate => {
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
      Object.keys(formStateRef.current).forEach(name => {
        const field = formStateRef.current[name];
        Object.getOwnPropertySymbols(field.data).forEach(index => {
          emitter.emit('form-field-validate', { name, index });
        });
      });
      Promise.all(eventQueue.current.map(({ task }) => task))
        .then(() => {
          return (async () => {
            const isPass = computedIsPass(formStateRef.current);
            if (!isPass) {
              const errors = computedError(formStateRef.current);
              emitter.emit('form-submit-error', errors);
              onErrorRef.current && (await onErrorRef.current(errors));
              return false;
            }

            const formData = getFormData();
            emitter.emit('form-prev-submit');
            if (onPrevSubmitRef.current && (await onPrevSubmitRef.current(formData)) === false) {
              emitter.emit('form-prev-submit-error');
              return false;
            }
            onSubmitRef.current && onSubmitRef.current(formData);
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
  }, [emitter, setFormState]);

  return emitter;
};

const Form = forwardRef((props, ref) => {
  const { onPrevSubmit, rules, data, onError, onSubmit, debug } = props;
  const formRules = Object.assign({}, RULES, rules);
  const formState = useState({});
  const [formIsMount, setFormIsMount] = useState(false);
  const dataRef = useRef(data);
  const [formData] = formState;
  const emitter = useFormStateEvent({ state: formState, onPrevSubmit, onError, onSubmit, rules: formRules, debug });
  useEffect(() => {
    setFormIsMount(true);
    emitter.emit('form-mount');
    setTimeout(() => {
      dataRef.current && emitter.emit('form-data-set', { data: dataRef.current });
    }, 0);
    return () => {
      setFormIsMount(false);
      emitter.emit('form-unmount');
    };
  }, [emitter]);

  const submitFormData = useMemo(() => computedFormData(formData), [formData]);

  useImperativeHandle(
    ref,
    () => {
      return {
        emitter,
        submit: () => {
          emitter.emit('form-submit');
        },
        get isPass() {
          return computedIsPass(formData);
        },
        get data() {
          return computedFormData(formData);
        },
        set data(data) {
          emitter.emit('form-data-set', { data });
        },
        reset() {
          emitter.emit('form-data-reset');
        },
        validateField(name, groupName) {
          const field = formData[name];
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
    [emitter, formData]
  );
  return (
    <Provider
      value={{
        formState: formData,
        formData: submitFormData,
        rules: formRules,
        emitter
      }}>
      {formIsMount ? <Group>{props.children}</Group> : null}
    </Provider>
  );
});

export default Form;
