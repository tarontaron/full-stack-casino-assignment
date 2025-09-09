import { Button, Form, Input, Typography } from 'antd';
import type { FormInstance } from 'antd';
import type { TLoginForm } from '../types/auth';

type TLoginFormProps = {
  onSubmit: (values: TLoginForm) => void;
};

const { useForm } = Form;

const LoginForm = ({ onSubmit }: TLoginFormProps ) => {

  const [form] = useForm<TLoginForm>();

  return (
    <Form form={form as FormInstance<TLoginForm>} onFinish={onSubmit} >
      <Typography.Title level={4}>Login</Typography.Title>
      <Form.Item name="email" rules={[{ required: true }]}>
        <Input placeholder="email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="password" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;
