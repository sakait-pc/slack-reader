import {Layout, Button} from 'antd';
const {Sider} = Layout;

interface Props {
  closeThread: () => void;
}

const Thread = ({closeThread}: Props) => {
  return (
    <Sider style={{color: '#fff'}}>
      <Button onClick={closeThread}>×</Button>
    </Sider>
  );
};

export default Thread;
