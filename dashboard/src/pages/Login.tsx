import type { TLoginForm } from '../types/auth';
import { useAuthStore } from '../store/auth';
import useLoginMutation from '../services/queries/useLoginMutation.ts';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const login = useAuthStore(state => state.login);
  const { mutateAsync } = useLoginMutation();

  const onFormSubmit = async (values: TLoginForm) => {
    const { access_token } = await mutateAsync(values as TLoginForm);
    await login(access_token);
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: 6 }}>
      <LoginForm onSubmit={onFormSubmit} />
    </div>
  );
};

export default LoginPage;
