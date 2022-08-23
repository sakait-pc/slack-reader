import {toHTML} from 'slack-markdown';
import DOMPurify from 'dompurify';
import type {Post} from '../../entities';
import type {Styles} from '../../styles';
import {Layout, Button, Divider} from 'antd';
const {Sider} = Layout;

interface Props {
  closeThread: () => void;
  thread: Array<Post>;
}

const Thread = ({closeThread, thread}: Props) => {
  return (
    <Sider theme="light">
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
    </Sider>
  );
};

const styles: Styles = {
  closeButtonWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: '16px',
  },
};

export default Thread;
