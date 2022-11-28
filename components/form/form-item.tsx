import { View, Text } from '@tarojs/components';
import React, { cloneElement } from 'react';
import type { BaseEventOrig } from '@tarojs/components';
import type { InputProps } from '@tarojs/components/types/Input';
import { formContext } from './form-context';
import styles from './index.module.less';
import { IFormItemProps } from './type';
import { pxTransform } from '@tarojs/taro';

interface IState {
  labelWidth: number;
  labelPosition: 'left' | 'center' | 'right';
}

class FormItem extends React.Component<IFormItemProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 180,
      labelPosition: 'left',
    };
  }

  context!: React.ContextType<typeof formContext>;
  // 注册组件，方便forceUpdate更新
  unRegister: () => void;
  static contextType = formContext;

  componentDidMount() {
    const { formInstance, labelWidth, labelPosition } = this.context;
    if (formInstance) {
      this.unRegister = formInstance.registerFieldEntities(this);
    }
    if (labelWidth) {
      this.setState({
        labelWidth,
      });
    }
    if (labelPosition) {
      this.setState({
        labelPosition,
      });
    }
  }

  componentWillUnmount() {
    if (this.unRegister) {
      this.unRegister();
    }
  }

  getControlled = () => {
    const { formInstance } = this.context;
    const { name, children } = this.props;
    if (!name) {
      return;
    }
    if (children?.type === 'input') {
      return {
        value: formInstance?.getFieldValue(name),
        onInput: (e: BaseEventOrig<InputProps.inputEventDetail>) => {
          formInstance?.setFieldsValue({
            [name]: e.detail.value,
          });
        },
      };
    }
    if (
      children?.type === 'radio-group' ||
      children?.type === 'checkbox-group'
    ) {
      return {
        value: formInstance?.getFieldValue(name),
        onChange: (e: BaseEventOrig<any>) => {
          formInstance?.setFieldsValue({
            [name]: e.detail.value,
          });
        },
      };
    }
  };

  // 是否显示必填样式
  showRequiredStyle() {
    const { rules = {} } = this.context;
    const { required, name } = this.props;
    if (required) {
      return true;
    }
    return Object.keys(rules).some((key) => name === key);
  }

  render() {
    const { label, className, suffix, children } = this.props;
    const { labelWidth, labelPosition } = this.state;

    // TODO 这个类型问题还没找到解决方案
    const childrenNode = cloneElement(children, this.getControlled());
    return (
      <View className={`${styles['form-item-wrapper']} ${className}`}>
        <View
          className={styles['label-wrapper']}
          style={{ textAlign: labelPosition, width: pxTransform(labelWidth) }}
        >
          <Text>{label}</Text>
          {this.showRequiredStyle() && (
            <Text className={styles['required']}>*</Text>
          )}
        </View>

        <View className={styles['input-wrapper']}>{childrenNode}</View>
        <View className={styles['suffix-wrapper']}>{suffix}</View>
      </View>
    );
  }
}

export default FormItem;
