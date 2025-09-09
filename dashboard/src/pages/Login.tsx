import type { TLoginForm } from '../types/auth';
import LoginForm from '../components/LoginForm';
import { useAuthStore } from '../store/auth';
import useLoginMutation from '../queries/auth/useLoginMutation';

const LoginPage = () => {

  const login = useAuthStore(state => state.login);
  const { mutateAsync } = useLoginMutation();
  
  const onFormSubmit = async (values: TLoginForm) => {
    const { access_token } = await mutateAsync(values as TLoginForm);
    await login(access_token);
    console.log('Login form submitted with values:', values);
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: 6 }}>
      <LoginForm onSubmit={onFormSubmit} />
    </div>
  );
};

export default LoginPage;