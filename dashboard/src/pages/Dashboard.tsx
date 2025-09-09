import GamesTable from '../components/GamesTable';
import PlayersTable from '../components/PlayersTable';

const Dashboard = () => {
  return (
    <div style={{ overflow: 'auto' }}>
      <GamesTable />
      <PlayersTable />
    </div>
  );
};

export default Dashboard;
