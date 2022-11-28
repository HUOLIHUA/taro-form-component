import { useRef } from "react";
import { ICallback, IError, IField, IFormInstance } from "./type";

export class FormStore {
  private initialValue: Record<string, any>
  private fieldEntities: any[]
  private callback: Partial<ICallback>
  private rules: Record<string, IField[]>
  constructor() {
    this.initialValue = {}
    // 组件实例
    this.fieldEntities = [];
    /** 校验函数回调 */
    this.callback = {}
    /** 校验规则 */
    this.rules = {}
  }

  private getFieldsValue = () => {
    return { ...this.initialValue }
  }

  private getFieldValue = (key: string) => {
    return this.initialValue[key]
  }

  private setFieldsValue = (newValue) => {
    this.initialValue = {
      ...this.initialValue,
      ...newValue
    }

    // 更新组件
    this.fieldEntities.forEach((entity) => {
      Object.keys(newValue).forEach((k) => {
        if (k === entity.props.name) {
          entity.forceUpdate();
        }
      });
    });
  }

  private setInitailValue = (initialValue) => {
    this.initialValue = initialValue

    // 更新组件
    this.fieldEntities.forEach((entity) => {
      Object.keys(initialValue).forEach((k) => {
        if (k === entity.props.name) {
          entity.forceUpdate();
        }
      });
    });
  }

  private registerFieldEntities = (entity) => {
    this.fieldEntities.push(entity)
    return () => {
      this.fieldEntities = this.fieldEntities.filter(
        (_entity) => _entity != entity
      );
      delete this.initialValue[entity.props.name];
    };
  }

  private setCallback = (rules: Record<string, IField[]>, newCallback: ICallback) => {
    this.rules = rules
    this.callback = {
      ...this.callback,
      ...newCallback
    }
  }

  private validate = (value) => {
    const errInfo = Object.keys(this.rules).reduce((result, key) => {
      const rulesWithKey = this.rules[key]
      const error = rulesWithKey.find(item => {
        if (item.required && !value[key]) {
          return item
        }
        if (item.pattern && !item.pattern.test(value[key])) {
          return item
        }
      })
      if (error) {
        result.push({
          name: key,
          message: error.message || `请输入${key}`
        })
      }
      return result
    }, [] as IError[])
    errInfo.forEach(item => console.error(item))
    return errInfo
  }

  private submit = () => {
    const { onFinishFailed, onFinish } = this.callback
    const value = this.getFieldsValue()
    const errorInfo = this.validate(value)
    if (errorInfo.length && onFinishFailed) {
      return onFinishFailed(errorInfo)
    }
    if (onFinish) {
      onFinish(value)
    }
  }

  public getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      setInitailValue: this.setInitailValue,
      registerFieldEntities: this.registerFieldEntities,
      setCallback: this.setCallback,
      submit: this.submit
    }
  }
}

export function useForm<T = any>(form?: IFormInstance<T>): [IFormInstance<T>] {
  const ref = useRef<IFormInstance>()
  if (!ref.current) {
    if (form) {
      ref.current = form
    } else {
      const form = new FormStore()
      ref.current = form.getForm()
    }
  }
  return [ref.current]
}