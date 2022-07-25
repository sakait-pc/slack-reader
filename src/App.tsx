import {useState, useEffect} from 'react';
import type {Projects} from './entities';
import {END_POINT} from './constants';
import type {Styles} from './styles';
import {
  Row,
  Col,
  // Space,
  // Button,
  // Tabs,
  Typography,
} from 'antd';
import './App.css';
// const {TabPane} = Tabs;
const {Text, Title} = Typography;

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
    <Row justify="center">
      <Col>
        <Title style={styles.title}>Hello, Slack Reader.</Title>
        <Text>過去のSlack投稿閲覧用アプリです。</Text>
        <Text>{$projects[0]}</Text>
      </Col>
    </Row>
  );
};

const styles: Styles = {
  title: {
    marginBlock: 16,
    fontSize: 32,
  },
};

export default App;
