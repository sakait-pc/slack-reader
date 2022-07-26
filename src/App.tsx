import {useState, useEffect} from 'react';
import type {Projects} from './entities';
import {END_POINT} from './constants';
import TopHeader from './components/Header/TopHeader';
import SideMenu from './components/SideMenu/SideMenu';
import TimeLine from './components/TimeLine/TimeLine';
import {Layout} from 'antd';
import './App.css';

const App = () => {
  const [$projects, setProjects] = useState<Projects>([]);

  useEffect(() => {
    const f = async () => {
      const response = await fetch(END_POINT);
      const projects: Projects = await response.json();
      setProjects(projects);
    };
    f();
  }, []);

  return (
    <Layout>
      <TopHeader />
      <Layout>
        <SideMenu />
        <TimeLine projects={$projects} />
      </Layout>
    </Layout>
  );
};

export default App;
