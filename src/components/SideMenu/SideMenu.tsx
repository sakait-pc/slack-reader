import type {Channel, User} from '../../entities';
import {Layout, Menu, Avatar, Image} from 'antd';
const {Sider} = Layout;
import type {MenuProps} from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    label,
    key,
    icon,
    children,
    type,
  } as MenuItem;
};

interface Props {
  channels: Array<Channel>;
  users: Array<User>;
}

const SideMenu = ({channels, users}: Props) => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const channelsMenuItems = () => {
    return channels.map(({id, name}) => {
      return getItem(`# ${name}`, id);
    });
  };

  const membersMenuItems = () => {
    return users.map(({id, name, image}) => {
      return getItem(
        name,
        id,
        <Avatar src={<Image src={image} style={{width: 32}} />} />,
      );
    });
  };

  const items: MenuProps['items'] = [
    getItem('Channels', 'sub1', null, channelsMenuItems()),
    getItem('Members', 'sub2', null, membersMenuItems()),
  ];

  const existsItems = () => channels.length !== 0 && users.length !== 0;

  return (
    <Sider theme="light">
      {existsItems() && (
        <Menu
          onClick={onClick}
          defaultOpenKeys={['sub1', 'sub2']}
          mode="inline"
          items={items}
        />
      )}
    </Sider>
  );
};

export default SideMenu;
