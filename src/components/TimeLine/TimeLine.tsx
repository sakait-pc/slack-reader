import type {Post} from '../../entities';
import type {Styles} from '../../styles';
import {Layout, Row, Col, Typography} from 'antd';
const {Content} = Layout;
const {Text, Title} = Typography;

interface Props {
  posts: Array<Post>;
}

const TimeLine = ({posts}: Props) => {
  if (posts.length === 0) return null;
  return (
    <Content>
      <Row justify="center">
        <Col>
          <Title style={styles.title}>Hello, Slack Reader.</Title>
          <Text>過去のSlack投稿閲覧用アプリです。</Text>
          <Text>{posts[0].date}</Text>
        </Col>
      </Row>
    </Content>
  );
};

const styles: Styles = {
  title: {
    marginBlock: 16,
    fontSize: 32,
  },
};

export default TimeLine;
