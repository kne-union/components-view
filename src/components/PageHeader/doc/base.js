const { PageHeaderInner } = _PageHeader;
const { default: Space } = space;

const api = {
  loader: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('哈哈哈哈');
      }, 1000);
    });
  }
};

const BaseExample = () => {
  return (
    <Space direction="vertical">
      <PageHeaderInner
        title="详情页名称"
        info="编号:85767"
        options={[
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
        ]}
        tags={['辅助信息', '辅助信息', '辅助信息', '辅助信息']}
      />
      <PageHeaderInner
        title="详情页名称非常长的情况详情页名称非常长的情况详情页名称非常长的情况详情页名称非常长的情况详情页名称非常长的情况页名称非常长的情况页名称非常长的情况"
        info="编号:85767"
        options={[
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
            children: '操作4'
          }
        ]}
      />
      <PageHeaderInner
        iconType="icon-color-shenpi-biaoti"
        title="详情页名称"
        info="编号:85767"
        options={[
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
            children: '操作4'
          }
        ]}
      />
    </Space>
  );
};

render(<BaseExample />);
