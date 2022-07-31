import {Channel} from '../../entities';
import {Layout, Menu} from 'antd';
const {Sider} = Layout;
import type {MenuProps} from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    label,
    key,
    children,
    type,
  } as MenuItem;
};

interface Props {
  channels: Array<Channel>;
}

const SideMenu = ({channels}: Props) => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const subMenuItems = () => {
    return channels.map(({id, name}) => {
      return getItem(`# ${name}`, id);
    });
  };

  const items: MenuProps['items'] = [
    getItem('Channels', 'sub1', subMenuItems()),
  ];

  return (
    <Sider theme="light">
      {channels.length !== 0 && (
        <Menu
          onClick={onClick}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
      )}
    </Sider>
  );
};

export default SideMenu;
