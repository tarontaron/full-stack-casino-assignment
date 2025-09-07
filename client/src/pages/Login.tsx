import type { TLoginForm } from '../types';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const onFormSubmit = (values: TLoginForm) => {
    console.log('Login form submitted with values:', values);
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: 6 }}>
      <LoginForm onSubmit={onFormSubmit} />
    </div>
  );
};

export default LoginPage;
