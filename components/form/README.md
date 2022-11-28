### Test

```tsx
import {Form, FormItem, useForm} from '@/components/form'

const Demo:FC = () => {
  const formRef = useRef<IFormInstance>(null);
  const [form] = useForm();
  return (
    <Form
      form={form}
      ref={formRef}
      labelPosition='center'
      labelWidth={200}
      initailValue={{}}
      rules={{
        username: [
          {required: true, message: '请输入用户名'},
          {pattern: /^\s*$/, message: '请输入正确的用户名'}
        ]
      }}
      onFinish={(value) => {
        console.log(value);
      }}
      onFinishFailed={(errorInfo) => {
        console.log(errorInfo);
      }}
    >
      <FormItem label='用户名' name='username' suffix={<View>后缀</View>}>
        <Input />
      </FormItem>
      <FormItem label='密码' name='password'>
        <Input />
      </FormItem>
      <FormItem label='复选框' name='checkboxValue'>
        <CheckboxGroup>
          <Checkbox value='0'>0</Checkbox>
          <Checkbox value='1'>1</Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label='复选框' name='radioValue'>
        <RadioGroup>
          <Radio value='0'>0</Radio>
          <Radio value='1'>1</Radio>
        </RadioGroup>
      </FormItem>
      <Button formType='submit'>提交</Button>
    </Form>
  );
}
```

### Form Props

```typescript
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
```



### FormItem Props

```typescript
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
```

### Form Event

```typescript
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
```







