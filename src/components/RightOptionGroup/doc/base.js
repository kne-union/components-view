const { default: RightOptionGroup } = _RightOptionGroup;
const { Space } = _antd;

const api = {
  loader: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('哈哈哈哈');
      }, 1000);
    });
  }
};

const defaultOptions = [
  {
    children: '新建'
  },
  {
    children: '操作1'
  },
  {
    children: '操作2'
  },
  {
    children: '操作3'
  },
  {
    type: 'ModalButton',
    api,
    modalProps: ({ data }) => ({
      title: '测试弹窗',
      children: data
    }),
    children: '弹窗操作'
  }
];

const BaseExample = () => {
  return (
    <Space direction={'vertical'}>
      <RightOptionGroup showDropDownMenuBtn={false} options={defaultOptions} />
      <RightOptionGroup options={defaultOptions} />
    </Space>
  );
};

render(<BaseExample />);
