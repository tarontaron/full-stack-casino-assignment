import PrivateLayout from '../components/PrivateLayout';
import ProfilePage from '../pages/Profile';

const PrivateRouter = () => {
  return (
    <PrivateLayout>
      <ProfilePage />
    </PrivateLayout>
  );
};

export default PrivateRouter;
