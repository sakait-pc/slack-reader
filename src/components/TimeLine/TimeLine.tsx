import type {TimeLineData} from '../../entities';
import type {Styles} from '../../styles';
import {Layout, Space, Row, Typography, Popover} from 'antd';
const {Content} = Layout;
const {Text, Title} = Typography;

interface Props {
  timeLine: TimeLineData | null;
}

const container = (timeLine: TimeLineData) => {
  const {
    channel: {name, topic, purpose},
    posts,
  } = timeLine;
  const title = `#${name}`;
  const description = <p>{purpose}</p>;
  return {
    description,
    title,
    topic,
    posts,
  };
};

const TimeLine = ({timeLine}: Props) => {
  if (timeLine === null) return null;
  const {description, title, topic, posts} = container(timeLine);
  if (posts.length === 0) return null;
  return (
    <Content>
      <Row align="middle" style={styles.header}>
        <Space>
          <Popover content={description}>
            <Title>{title}</Title>
          </Popover>
          <Text>{topic}</Text>
        </Space>
      </Row>
      {posts.map((post) => (
        <p key={post.ts}>{post.text}</p>
      ))}
    </Content>
  );
};

const styles: Styles = {
  header: {
    padding: '8px',
  },
};

export default TimeLine;
