import type {Channel, User} from '../../entities';
import {defaultChannelIndex} from '../../constants';
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
  onClickChannel: (channelId: string) => void;
}

const SideMenu = ({channels, users, onClickChannel}: Props) => {
  const onClick: MenuProps['onClick'] = (e) => {
    onClickChannel(e.key);
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

  return (
    <Sider theme="light">
      <Menu
        onClick={onClick}
        defaultSelectedKeys={[channels[defaultChannelIndex].id]}
        defaultOpenKeys={['sub1', 'sub2']}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SideMenu;
