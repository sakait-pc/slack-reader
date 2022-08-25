import {useState, useEffect} from 'react';
import type {Data, PostByChannel, TimeLineData, Post, User} from './entities';
import {END_POINT, initialState, defaultChannelIndex} from './constants';
import {ensure} from './utils';
import TopHeader from './components/Header/TopHeader';
import SideMenu from './components/SideMenu/SideMenu';
import TimeLine from './components/TimeLine/TimeLine';
import Thread from './components/Thread/Thread';
import {Layout} from 'antd';
import './App.css';

const getUserById = (users: Array<User>) => {
  return users.reduce((userById, user) => {
    return {
      ...userById,
      [user.id]: user,
    };
  }, {});
};

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
        const userById = getUserById(data.users);
        setData(data);
        setTimeLine({channel, posts, userById});
      } catch (e) {
        console.error('ERROR: fetchDataAsync: ', e);
      }
    };
    fetchDataAsync();
  }, []);

  const onClickChannel = (channelId: string) => {
    const channel = ensure(
      $data.channels.find((channel) => channel.id === channelId),
    );
    const {posts} = ensure(
      $data.posts.find(
        (postByChannel: PostByChannel) => postByChannel.channelId === channelId,
      ),
    );
    const {userById} = ensure($timeLine);
    setTimeLine({
      channel,
      posts,
      userById,
    });
  };

  const openThread = (threadTS: string) => {
    const thread = ensure(
      $timeLine?.posts.filter((post) => post.thread_ts === threadTS),
    );
    setThread(thread);
  };

  const closeThread = () => setThread(null);

  const {channels, users} = $data;
  if (channels.length === 0 || users.length === 0) return null;
  if ($timeLine === null || $timeLine.posts.length === 0) return null;

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
        {$thread && (
          <Thread
            closeThread={closeThread}
            thread={$thread}
            userById={$timeLine.userById}
          />
        )}
      </Layout>
    </Layout>
  );
};

export default App;
