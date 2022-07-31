import {useState, useEffect} from 'react';
import type {Data, PostByChannel, Post} from './entities';
import {END_POINT, initialState, defaultChannelIndex} from './constants';
import TopHeader from './components/Header/TopHeader';
import SideMenu from './components/SideMenu/SideMenu';
import TimeLine from './components/TimeLine/TimeLine';
import {Layout} from 'antd';
import './App.css';

const App = () => {
  const [$data, setData] = useState<Data>(initialState);
  const [$posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(END_POINT);
        if (!response.ok) throw new Error(response.statusText);
        const data: Data = await response.json();
        const {posts} = data.posts[defaultChannelIndex];
        setData(data);
        setPosts(posts);
      } catch (e) {
        console.error('ERROR: fetchDataAsync: ', e);
      }
    };
    fetchDataAsync();
  }, []);

  const onClickChannel = (channelId: string) => {
    const byChannel = $data.posts.find(
      (postByChannel: PostByChannel) => postByChannel.channelId === channelId,
    );
    if (!byChannel) return;
    setPosts(byChannel.posts);
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
        <TimeLine posts={$posts} />
      </Layout>
    </Layout>
  );
};

export default App;
