import {toHTML} from 'slack-markdown';
import DOMPurify from 'dompurify';
import type {Post} from '../../entities';
import type {Styles} from '../../styles';
import {headerHeight} from '../../styles';
import {Button, Divider} from 'antd';

interface Props {
  closeThread: () => void;
  thread: Array<Post>;
}

const Thread = ({closeThread, thread}: Props) => {
  return (
    <div style={styles.thread}>
      <div style={styles.closeButtonWrap}>
        <Button onClick={closeThread}>X</Button>
      </div>
      {thread.map((post) => (
        <div key={post.ts}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(toHTML(post.text)),
            }}
          />
          <Divider />
        </div>
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
