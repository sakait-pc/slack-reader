import React from 'react';
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
  return (
    <Row justify="center">
      <Col>
        <Title style={styles.title}>Hello, Slack Reader.</Title>
        <Text>過去のSlack投稿閲覧用アプリです。</Text>
      </Col>
    </Row>
  );
};

interface Styles {
  [key: string]: React.CSSProperties;
}

const styles: Styles = {
  title: {
    marginBlock: 16,
    fontSize: 32,
  },
};

export default App;
