import {useState, useEffect} from 'react';
import type {Data} from './entities';
import {END_POINT, initialState} from './constants';
import TopHeader from './components/Header/TopHeader';
import SideMenu from './components/SideMenu/SideMenu';
import TimeLine from './components/TimeLine/TimeLine';
import {Layout} from 'antd';
import './App.css';

const App = () => {
  const [$data, setData] = useState<Data>(initialState);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(END_POINT);
        if (!response.ok) throw new Error(response.statusText);
        const data: Data = await response.json();
        setData(data);
      } catch (e) {
        console.error('ERROR: fetchDataAsync: ', e);
      }
    };
    fetchDataAsync();
  }, []);

  return (
    <Layout>
      <TopHeader />
      <Layout>
        <SideMenu />
        <TimeLine data={$data} />
      </Layout>
    </Layout>
  );
};

export default App;
