import type {UserById, Post} from '../../entities';
import type {Styles} from '../../styles';
import {headerHeight} from '../../styles';
import {Button} from 'antd';
import PostItem from '../Common/PostItem';

interface Props {
  closeThread: () => void;
  thread: Array<Post>;
  userById: UserById;
}

const Thread = ({closeThread, thread, userById}: Props) => {
  return (
    <div style={styles.thread}>
      <div style={styles.closeButtonWrap}>
        <Button onClick={closeThread}>X</Button>
      </div>
      {thread.map((post) => (
        <PostItem key={post.ts} post={post} user={userById[post.user]} />
      ))}
    </div>
  );
};

const styles: Styles = {
  thread: {
    height: `calc(100vh - ${headerHeight})`,
    width: '30%',
    padding: '16px',
    overflowY: 'scroll',
    overflowWrap: 'break-word',
    borderLeft: '1px solid #333',
  },
  closeButtonWrap: {
    position: 'fixed',
    top: '64px',
    right: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
};

export default Thread;
