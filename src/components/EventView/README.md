
# EventView


### 概述

用来展示事件数据


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _EventView(@components/EventView),remoteLoader(@kne/remote-loader),antd(antd)

```jsx
const { default: EventView } = _EventView;
const { createWithRemoteLoader } = remoteLoader;
const { Button } = antd;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Content', 'components-core:File@FileLink']
})(({ remoteModules }) => {
  const [Content, FileLink] = remoteModules;
  return <div style={{ 'width': '360px' }}>
    <EventView>
      <EventView.Part title="Offer" subTitle="2024-03-21 15:36:35" extra={<Button size="small">修改预计开票金额</Button>}>
        <Content labelAlign="auto" list={[{
          label: '标题标题', content: '我是内容我是内容'
        }, {
          label: '时间', content: '2022-12-22'
        }, {
          label: '附件', content: <FileLink id="01" originName="我是一个图片.jpg" />
        }, {
          label: '金额类型字段', content: '2000.00元'
        }, {
          label: '备注信息', content: '大段的文字描述大段的文字描述大段的文字描述大段的文字描述大段的文字描述大段的文字描述大段的文字描'
        }, {
          label: '补充说明', content: '一句补充说明'
        }, {
          label: '复杂类型', content: <Button type="link" className="btn-no-padding">文字按钮</Button>
        }, {
          label: '补充说明', content: '一句补充说明一句补充说明'
        }]} />
      </EventView.Part>
      <EventView.Part title="客户面试" subTitle="2024-03-21 15:36:35">
        <EventView.Part>
          <Content labelAlign="auto" list={[{
            label: '标题标题', content: '我是内容我是内容'
          }, {
            label: '时间', content: '2022-12-22'
          }, {
            label: '补充说明', content: '一句补充说明'
          }]} />
        </EventView.Part>
        <EventView.Part title="客户3面">
          <Content labelAlign="auto" list={[{
            label: '标题标题', content: '我是内容我是内容'
          }, {
            label: '时间', content: '2022-12-22'
          }, {
            label: '补充说明', content: '一句补充说明'
          }]} />
        </EventView.Part>
        <EventView.Part title="客户2面">
          <Content labelAlign="auto" list={[{
            label: '标题标题', content: '我是内容我是内容'
          }, {
            label: '时间', content: '2022-12-22'
          }, {
            label: '补充说明', content: '一句补充说明'
          }]} />
        </EventView.Part>
        <EventView.Part title="客户1面">
          <Content labelAlign="auto" list={[{
            label: '标题标题', content: '我是内容我是内容'
          }, {
            label: '时间', content: '2022-12-22'
          }, {
            label: '补充说明', content: '一句补充说明'
          }]} />
        </EventView.Part>
      </EventView.Part>
    </EventView>
  </div>;
});

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

