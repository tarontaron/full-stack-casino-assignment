import { Button, Form, Input } from 'antd';

import type { TLoginForm } from '../types';

type TLoginFormProps = {
  onSubmit: (values: TLoginForm) => void;
};

const LoginForm = ({ onSubmit }: TLoginFormProps) => {
  const [form] = Form.useForm<TLoginForm>();

  const onFinish = (values: TLoginForm) => {
    onSubmit(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
