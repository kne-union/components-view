import { Flex } from 'antd';
import DialogList from './DialogList';
import InputBar from './InputBar';

const IMView = ({ list, defaultValue = '', onSubmit }) => {
  return (
    <Flex vertical gap={16}>
      <DialogList list={list} />
      <InputBar defaultValue={defaultValue} onSubmit={onSubmit} />
    </Flex>
  );
};

export default IMView;
