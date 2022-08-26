import type {TimeLineData, Post} from '../../entities';
import type {Styles} from '../../styles';
import {headerHeight} from '../../styles';
import {ensure} from '../../utils';
import {Layout, Space, Row, Typography, Popover, Button} from 'antd';
import PostItem from '../Common/PostItem';
const {Content} = Layout;
const {Text, Title} = Typography;

interface Props {
  timeLine: TimeLineData;
  openThread: (threadTS: string) => void;
}

const filterReplies = (posts: Array<Post>) =>
  posts.filter((post) => !post.parent_user_id);

const container = (timeLine: TimeLineData) => {
  const {
    channel: {name, topic, purpose},
    posts: rawPosts,
    userById,
  } = timeLine;
  const title = `#${name}`;
  const description = <p>{purpose}</p>;
  const posts = filterReplies(rawPosts);
  return {
    description,
    title,
    topic,
    posts,
    userById,
  };
};

const TimeLine = ({timeLine, openThread}: Props) => {
  const getReplyButton = (post: Post) => {
    if (post.replies) {
      return (
        <div style={styles.replyBtn}>
          <Button onClick={() => openThread(ensure(post.thread_ts))}>
            {post.reply_count}
            <Text style={styles.replyCount}>件の返信</Text>
          </Button>
        </div>
      );
    }
  };

  const {description, title, topic, posts, userById} = container(timeLine);
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
        <PostItem
          key={post.ts}
          post={post}
          userById={userById}
          replyButton={getReplyButton(post)}
        />
      ))}
    </Content>
  );
};

const styles: Styles = {
  content: {
    height: `calc(100vh - ${headerHeight})`,
    padding: '16px',
    overflowWrap: 'break-word',
    overflowY: 'scroll',
  },
  header: {
    padding: '8px',
  },
  replyBtn: {
    marginTop: '8px',
  },
  replyCount: {
    marginLeft: '4px',
  },
};

export default TimeLine;
