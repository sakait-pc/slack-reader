import type {Post, UserById} from '../../entities';
import type {Styles} from '../../styles';
import {toDate, sanitizeHTML} from '../../utils';
import {Typography, Avatar, Image, Divider} from 'antd';
const {Text} = Typography;

interface Props {
  post: Post;
  userById: UserById;
  replyButton?: React.ReactNode;
}

const PostItem = ({post, userById, replyButton}: Props) => {
  const {ts, user, text, reactions} = post;
  const {name, image} = userById[user];
  return (
    <div>
      <div style={styles.postHeader}>
        <Avatar src={<Image src={image} style={styles.avatar} />} />
        <div style={styles.postTitle}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{toDate(ts)}</Text>
        </div>
      </div>
      <div style={styles.body}>
        <div dangerouslySetInnerHTML={sanitizeHTML(text)} />
        <div style={styles.reaction}>
          {reactions &&
            reactions.map((reaction, index) => {
              const title = reaction.users
                .map((id) => userById[id].name)
                .join(', ');
              return (
                <div key={index}>
                  <span
                    title={title}
                    dangerouslySetInnerHTML={sanitizeHTML(`:${reaction.name}:`)}
                    style={styles.emoji}
                  />
                  {reaction.count > 1 && (
                    <span style={styles.reactionCount}>{reaction.count}</span>
                  )}
                </div>
              );
            })}
        </div>
        {replyButton}
      </div>
      <Divider style={styles.divider} />
    </div>
  );
};

const styles: Styles = {
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: '8px',
  },
  avatar: {
    width: 32,
  },
  postTitle: {
    marginLeft: '8px',
  },
  body: {
    marginLeft: '40px',
  },
  name: {
    fontWeight: 700,
    fontSize: '16px',
  },
  date: {
    marginLeft: '8px',
    fontSize: '14px',
  },
  reaction: {
    display: 'flex',
    marginTop: '8px',
  },
  emoji: {
    verticalAlign: 'text-bottom',
  },
  reactionCount: {
    marginLeft: '4px',
  },
  divider: {
    borderTop: '1px solid rgba(0, 0, 0, 0.30)',
  },
};

export default PostItem;
