import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import type { ForwardRefRenderFunction } from 'react';
import { Form } from '@tarojs/components';
import { IFormInstance, IFormProps } from './type';
import { formContext } from './form-context';
import { useForm } from './useForm';

const QMForm: ForwardRefRenderFunction<IFormInstance, IFormProps> = (
  props,
  ref
) => {
  const {
    children,
    initailValue,
    form,
    rules = {},
    onFinish,
    onFinishFailed,
    ...reset
  } = props;
  const [formInstance] = useForm(form);

  formInstance.setCallback(rules, {
    onFinish,
    onFinishFailed,
  });

  useEffect(() => {
    if (initailValue) {
      formInstance.setInitailValue(initailValue);
    }
  }, [initailValue]);

  useImperativeHandle(ref, () => formInstance);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault;
        formInstance.submit();
      }}
    >
      <formContext.Provider value={{ formInstance, rules, ...reset }}>
        {children}
      </formContext.Provider>
    </Form>
  );
};

export default forwardRef(QMForm);
