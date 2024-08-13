
# PageHeader


### 概述

用于页面头上显示一些标题，重要信息和重要操作


### 示例(全屏)


#### 示例样式

```scss
.example-driver-preview {
  background: #cccccc;
}
```

#### 示例代码

- 基本示例
- 展示基本示例
- _PageHeader(@components/PageHeader),space(antd/lib/space)

```jsx
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
        buttonOptionsMaxWidth={'300px'}
        buttonOptions={{
          list: [
            {
              type: 'primary',
              children: '操作1'
            },
            {
              children: '操作2'
            },
            {
              children: '操作3'
            },
            {
              children: '操作3',
              message: '确定要执行操作吗？'
            }
          ]
        }}
        tags={['辅助信息', '辅助信息', '辅助信息', '辅助信息']}
      />
      <PageHeaderInner
        title="详情页名称非常长的情况详情页名称非常长的情况详情页名称非常长的情况详情页名称非常长的情况详情页名称非常长的情况页名称非常长的情况页名称非常长的情况"
        info="编号:85767"
        buttonOptionsMaxWidth={'300px'}
        buttonOptions={{
          list: [
            {
              type: 'primary',
              children: '操作1'
            },
            {
              children: '操作2'
            },
            {
              children: '操作3'
            },
            {
              children: '操作3',
              message: '确定要执行操作吗？'
            }
          ]
        }}
      />
      <PageHeaderInner
        iconType="icon-color-shenpi-biaoti"
        title="详情页名称"
        info="编号:85767"
        buttonOptionsMaxWidth={'30%'}
        buttonOptions={{
          list: [
            {
              type: 'primary',
              children: '操作1'
            },
            {
              children: '操作2'
            },
            {
              children: '操作3'
            },
            {
              children: '操作3',
              message: '确定要执行操作吗？'
            }
          ]
        }}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- 在Layout里面使用
- 展示在Layout里面使用
- _PageHeader(@components/PageHeader),remoteLoader(@kne/remote-loader)

```jsx
const { createWithRemoteLoader } = remoteLoader;
const { PageHeaderInner } = _PageHeader;

const Example = createWithRemoteLoader({
  modules: ['components-core:Layout', 'components-core:Layout@Page']
})(({ remoteModules }) => {
  const [Layout, Page] = remoteModules;
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        menu={<div className="layout-menu">左侧菜单区</div>}
        title="标题"
        hideCloseSvg={true}
        menuFixed={false}
        name="pageHeaderLayout"
        header={
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
            tags={['辅助信息', '辅助信息', '辅助信息', '辅助信息']}
          />
        }
        headerFixed={false}
      >
        <div>内容区</div>
      </Page>
    </Layout>
  );
});

render(<Example />);

```


### API

| 属性名        | 说明                       | 类型         | 默认值 |
|------------|--------------------------|------------|-----|
| title      | 标题内容                     | string,jsx | -   |
| iconType   | 标题前的icon的type，注意只支持彩色图标  | string     | -   |
| info       | 辅助信息内容                   | string,jsx | -   |
| tags       | 标题下方的标签内容区               | array      | -   |
| hasPrimary | 是否让第一个操作按钮为perimary类型    | boolean    | -   |
| showCount  | 展示出的操作按钮个数多余的会收起到更多里面    | number     | 3   |
| options    | 操作按钮组，每一项的内容为Button组件的参数 | array      | -   |

