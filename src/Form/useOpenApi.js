import { useImperativeHandle } from 'react';

const useOpenApi = ({ emitter, fields, interceptors, formState, formData, isPass }, ref) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        emitter,
        submit: (...args) => {
          emitter.emit('form-submit', args);
        },
        get isPass() {
          return isPass;
        },
        get data() {
          return formData;
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
        setFieldValidate({ name, value, groupName, groupIndex }) {
          emitter.emit('form-data-set-field', {
            name,
            value: {
              groupName,
              groupIndex,
              validate: value
            }
          });
        }
      };
    },
    [emitter, fields, formState, isPass, formData]
  );
};

export default useOpenApi;
