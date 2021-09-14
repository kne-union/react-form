import ruleValidate from './ruleValidate';
import createSetFieldInfo from './createSetFieldInfo';
import { computedFormData } from '../util';
import _get from 'lodash/get';

const fieldValidateCreator = ({ formStateRef, setFormState, otherProps, taskQueue, emitter }) => {
  const setFieldInfo = createSetFieldInfo({ formStateRef });
  return ({ name, index }) => {
    const item = formStateRef.current[name];
    // 初始化校验状态
    setFormState(
      setFieldInfo({
        name,
        index,
        key: 'validate',
        value: {
          status: 3,
          msg: ''
        }
      })
    );
    //处理空格的情况
    const value = _get(item.data[index], 'value'),
      noTrim = _get(item.data[index], 'noTrim');
    let trimValue = value;
    if (typeof value === 'string' && noTrim !== true) {
      trimValue = value.trim();
      if (value !== trimValue) {
        emitter.emit('form-field-data-change', { name, value: trimValue, index });
      }
    }
    //添加任务
    taskQueue.append({
      id: index,
      runner: () => {
        return ruleValidate({
          filed: Object.assign({}, item.field, { rule: item.data[index].rule }),
          value: trimValue,
          formRules: otherProps.current.rules,
          getFormData: () => {
            return computedFormData(formStateRef.current);
          }
        });
      },
      complete: validate => {
        const validateRes = {
          status: validate.result === true ? 1 : 2,
          msg: validate.errMsg
        };
        setFormState(
          setFieldInfo({
            name,
            index,
            key: 'validate',
            value: validateRes
          })
        );
        emitter.emit('form-field-validate-complete', {
          name,
          value: trimValue,
          index,
          validate: validateRes
        });
      }
    });
  };
};

export default fieldValidateCreator;
