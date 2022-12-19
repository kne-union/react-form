import { useMemo } from 'react';
import stateToError from '../common/stateToError';
import stateToIsPass from '../common/stateToIsPass';

const useOpenApi = ({ emitter, fields, formState, formData, isPass }) => {
  return useMemo(() => {
    return {
      emitter, submit: (...args) => {
        emitter.emit('form-submit', args);
      }, get isPass() {
        return isPass;
      }, get data() {
        return formData;
      }, get fields() {
        return fields;
      }, get formState() {
        return formState;
      }, set data(data) {
        emitter.emit('form-data-set', { data });
      }, get errors() {
        return stateToError(formState);
      }, reset() {
        emitter.emit('form-data-reset');
      }, onReady(callback) {
        emitter.addListener('form-mount', () => {
          callback && callback();
        });
      }, onDestroy(callback) {
        emitter.addListener('form-unmount', () => {
          callback && callback();
        });
      }, validateField({ name, groupName, groupIndex }) {
        emitter.emit('form-field-validate', { name, groupName, groupIndex });
      }, validateAll() {
        return new Promise((resolve) => {
          emitter.emit('form-validate-all', {
            callback: ({ formState }) => {
              resolve({
                isPass: stateToIsPass(formState), errors: stateToError(formState)
              });
            }
          });
        });
      }, setFormData: (data, runValidate = true) => {
        emitter.emit('form-data-set', { data, runValidate });
      }, getFormData() {
        return formData;
      }, setFieldValidate({ name, validate, groupName, groupIndex }) {
        emitter.emit('form-data-set-field-validate', { name, groupName, groupIndex, validate });
      }, setField({ name, value, groupName, groupIndex, runValidate = true }) {
        emitter.emit('form-data-set-field', { name, groupName, groupIndex, value, runValidate });
      }, setFields(list) {
        list.forEach(({ name, value, groupName, groupIndex, runValidate = true }) => {
          emitter.emit('form-data-set-field', { name, groupName, groupIndex, value, runValidate });
        });
      }
    };
  }, [emitter, fields, formState, isPass, formData]);
};

export default useOpenApi;
