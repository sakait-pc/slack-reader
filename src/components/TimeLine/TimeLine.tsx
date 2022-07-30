import type {Data} from '../../entities';
import type {Styles} from '../../styles';
import {Row, Col, Typography} from 'antd';
const {Text, Title} = Typography;

interface Props {
  data: Data;
}

// TODO: antdのContentを使った方がいいかもしれない
const TimeLine = ({data}: Props) => {
  return (
    <Row justify="center">
      <Col>
        <Title style={styles.title}>Hello, Slack Reader.</Title>
        <Text>過去のSlack投稿閲覧用アプリです。</Text>
        <Text>{data.channels[0]?.name}</Text>
      </Col>
    </Row>
  );
};

const styles: Styles = {
  title: {
    marginBlock: 16,
    fontSize: 32,
  },
};

export default TimeLine;
