import type { CSSProperties, ReactElement, ReactNode } from "react";

export interface IField {
  /** 是否必填 */
  required?: boolean;
  /** 不满足条件时的提示 */
  message?: string;
  /** 正则 */
  pattern?: RegExp
}

export interface IFormProps<T = any> {
  /** 默认值 */
  initailValue?: T;
  /**表单实例 */
  form?: IFormInstance<T>;
  /** 校验规则 */
  rules?: Record<string, IField[]>;
  /** label宽度 */
  labelWidth?: number;
  /** label对齐方式 */
  labelPosition?: 'left' | 'center' | 'right';
  children?: ReactNode;
  /** 校验成功 */
  onFinish?: (value: T) => void;
  /** 校验失败 */
  onFinishFailed?: (errInfo: IError[]) => void;
}

export interface IFormItemProps {
  /** 标签的文本 */
  label?: string;
  /** 必填样式设置。如不设置，则会根据校验规则自动生成 */
  required?: boolean;
  /** 字段名 */
  name?: string;
  /** children */
  children?: ReactElement
  /** 后缀 */
  suffix?: ReactNode
  /** 样式 */
  className?: CSSProperties
}
/** 校验不通过时的错误信息 */
export interface IError {
  /** key值 */
  name: string;
  /** 提示信息 */
  message: string;
}

export interface ICallback<T = any> {

  onFinish: (value: T) => void;
  onFinishFailed: (value: IError[]) => void
}

export interface IFormInstance<T = any> {
  /** 获取表单 */
  getFieldsValue: () => T;
  /** 获取某一单项值 */
  getFieldValue: (key: keyof T) => T[keyof T];
  /** 设置表单值 */
  setFieldsValue: (value: Partial<T>) => void;
  /** 设置初始值 */
  setInitailValue: (value: T) => void;
  /** 注册组件实例 */
  registerFieldEntities: (value) => () => void;
  /** 设置校验函数回调 */
  setCallback: (rules: Record<string, IField[]>, callback: Partial<ICallback<T>>) => void;
  /** 提交 */
  submit: () => void;
}

export interface InternalFormInstance {
  /** 手动校验表单 */
  validate?: () => void;
  /** 重置表单 */
  reset?: () => void
}