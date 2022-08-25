import {toHTML} from 'slack-markdown';
import DOMPurify from 'dompurify';
import type {Post, User} from '../../entities';
import type {Styles} from '../../styles';
import {toDate} from '../../utils';
import {Typography, Avatar, Image, Divider} from 'antd';
const {Text} = Typography;

interface Props {
  post: Post;
  user: User;
  replyButton?: React.ReactNode;
}

const PostItem = ({post, user, replyButton}: Props) => {
  const {name, image} = user;
  return (
    <div key={post.ts}>
      <div style={styles.postHeader}>
        <Avatar src={<Image src={image} style={{width: 32}} />} />
        <div style={styles.postTitle}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{toDate(post.ts)}</Text>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(toHTML(post.text)),
        }}
      />
      {replyButton}
      <Divider style={styles.divider} />
    </div>
  );
};

const styles: Styles = {
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: '16px',
  },
  postTitle: {
    marginLeft: '8px',
  },
  name: {
    fontWeight: 700,
    fontSize: '16px',
  },
  date: {
    marginLeft: '8px',
    fontSize: '14px',
  },
  divider: {
    borderTop: '1px solid rgba(0, 0, 0, 0.30)',
  },
};

export default PostItem;
