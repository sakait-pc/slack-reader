import {useState, useEffect} from 'react';
import type {Data, PostByChannel, TimeLineData, Post} from './entities';
import {END_POINT, initialState, defaultChannelIndex} from './constants';
import TopHeader from './components/Header/TopHeader';
import SideMenu from './components/SideMenu/SideMenu';
import TimeLine from './components/TimeLine/TimeLine';
import Thread from './components/Thread/Thread';
import {Layout} from 'antd';
import './App.css';

const App = () => {
  const [$data, setData] = useState<Data>(initialState);
  const [$timeLine, setTimeLine] = useState<TimeLineData | null>(null);
  const [$thread, setThread] = useState<Array<Post> | null>(null);

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

  const openThread = (threadTS: string | undefined) => {
    if (threadTS === undefined) return;
    const thread = $timeLine?.posts.filter(
      (post) => post.thread_ts === threadTS,
    );
    if (thread === undefined) return;
    setThread(thread);
  };

  const closeThread = () => setThread(null);

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
        <TimeLine timeLine={$timeLine} openThread={openThread} />
        {$thread && <Thread closeThread={closeThread} />}
      </Layout>
    </Layout>
  );
};

export default App;
