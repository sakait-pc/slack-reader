import {toHTML} from 'slack-markdown';
import DOMPurify from 'dompurify';
import type {TimeLineData} from '../../entities';
import type {Styles} from '../../styles';
import {Layout, Space, Row, Typography, Popover, Divider, Button} from 'antd';
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
  // TODO: スレッド内の投稿をまとめる
  return (
    <Content style={styles.content}>
      <Row align="middle" style={styles.header}>
        <Space>
          <Popover content={description}>
            <Title>{title}</Title>
          </Popover>
          <Text>{topic}</Text>
        </Space>
      </Row>
      {posts.map((post) => (
        <div key={post.ts}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(toHTML(post.text)),
            }}
          />
          {post.replies && (
            <div style={styles.replyBtn}>
              <Button>返信</Button>
            </div>
          )}
          <Divider />
        </div>
      ))}
    </Content>
  );
};

const styles: Styles = {
  content: {
    padding: '16px',
  },
  header: {
    padding: '8px',
  },
  replyBtn: {
    marginTop: '16px',
  },
};

export default TimeLine;
