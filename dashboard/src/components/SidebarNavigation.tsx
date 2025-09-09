import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, type MenuProps } from 'antd';
import type { SelectInfo } from 'rc-menu/lib/interface';

import routesConfig from '../routes/routesConfig';

type MenuItem = Required<MenuProps>['items'][number];

const navigationItems: MenuItem[] = [
  { key: routesConfig.private.index, label: 'Home' },
  { key: routesConfig.private.players, label: 'Players' },
  {
    key: 'games',
    label: 'Games',
    children: [
      { key: routesConfig.private.gamesByRevenue, label: 'Games by Revenue' },
      { key: routesConfig.private.mostPopularGames, label: 'Most Popular Games' },
    ],
  }
];

const SidebarNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onSelect = (item: SelectInfo) => {
    navigate(item.keyPath[0]);
  };

  return (
    <Menu
      selectable
      mode="vertical"
      theme="dark"
      items={navigationItems}
      defaultSelectedKeys={[pathname]}
      onSelect={onSelect}
    />
  );
};

export default SidebarNavigation;
