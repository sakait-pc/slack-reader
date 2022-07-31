import {useState, useEffect} from 'react';
import type {Data, PostByChannel, TimeLineData} from './entities';
import {END_POINT, initialState, defaultChannelIndex} from './constants';
import TopHeader from './components/Header/TopHeader';
import SideMenu from './components/SideMenu/SideMenu';
import TimeLine from './components/TimeLine/TimeLine';
import {Layout} from 'antd';
import './App.css';

const App = () => {
  const [$data, setData] = useState<Data>(initialState);
  const [$timeLine, setTimeLine] = useState<TimeLineData | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(END_POINT);
        if (!response.ok) throw new Error(response.statusText);
        const data: Data = await response.json();
        const channel = data.channels[defaultChannelIndex];
        const {posts} = data.posts[defaultChannelIndex];
        setData(data);
        setTimeLine({channel, posts});
      } catch (e) {
        console.error('ERROR: fetchDataAsync: ', e);
      }
    };
    fetchDataAsync();
  }, []);

  const onClickChannel = (channelId: string) => {
    const channel = $data.channels.find((channel) => channel.id === channelId);
    if (!channel) return;
    const byChannel = $data.posts.find(
      (postByChannel: PostByChannel) => postByChannel.channelId === channelId,
    );
    if (!byChannel) return;
    setTimeLine({channel, posts: byChannel.posts});
  };

  const {channels, users} = $data;

  return (
    <Layout>
      <TopHeader />
      <Layout>
        <SideMenu
          channels={channels}
          users={users}
          onClickChannel={onClickChannel}
        />
        <TimeLine timeLine={$timeLine} />
      </Layout>
    </Layout>
  );
};

export default App;
