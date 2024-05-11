
# CardView


### 概述

用于定义一个卡片内容


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _CardView(@components/CardView),remoteLoader(@kne/remote-loader),antd(antd)

```jsx
const { default: CardView } = _CardView;
const { createWithRemoteLoader } = remoteLoader;
const { Space, Card } = antd;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Image', 'components-core:StateTag', 'components-core:ButtonGroup']
})(({ remoteModules }) => {
  const [Image, StateTag, ButtonGroup] = remoteModules;
  return <Card>
    <CardView avatar={<Image.Avatar gender="M" shape="circle" size={50} />} title="叶媛媛"
              subtitle="ID：307574846282268672"
              tags={<>
                <StateTag text="已授权" type="success" />
                <StateTag text="简历完整度：78" type="progress" />
              </>}
              options={<ButtonGroup list={[{
                type: 'primary', children: '操作1'
              }, {
                children: '操作2'
              }, {
                children: '操作3'
              }, {
                children: '操作3', message: '确定要执行操作吗？'
              }]} />}
              attributes={['女', '33岁', '上海', '8年', '硕士研究生']}
              properties={['电话: 13288372283', '邮箱: edade@163.com']} footer={<Space>
      <StateTag text="法律顾问" type="skill" showBorder showBackground={false} />
      <StateTag text="投资并购" type="skill" showBorder showBackground={false} />
      <StateTag text="股权质押" type="skill" showBorder showBackground={false} />
      <StateTag text="不动产" type="skill" showBorder showBackground={false} />
    </Space>} />
  </Card>;
});

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

