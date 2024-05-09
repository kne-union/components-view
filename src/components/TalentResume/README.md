
# TalentResume


### 概述

人才简历


### 示例(全屏)

#### 示例代码

- TalentResumeCard
- 人才简历卡片
- _TalentResume(@components/TalentResume),_mockData(./mock/talent-resume.json)

```jsx
const { TalentResumeCard } = _TalentResume;
const { default: mockData } = _mockData;

const BaseExample = () => {
  return (
    <TalentResumeCard
      item={mockData.data}
      actionOptions={[
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
  );
};

render(<BaseExample />);

```

- TalentResumeList
- 人才简历列表
- _TalentResume(@components/TalentResume),_mockData(./mock/talent-resume-list.json),_remoteLoader(@kne/remote-loader),_reachFetch(@kne/react-fetch),_lodash(lodash),_antd(antd)

```jsx
const { TalentResumeList } = _TalentResume;
const { default: mockData } = _mockData;
const { createWithRemoteLoader } = _remoteLoader;
const { withFetch } = _reachFetch;
const { get } = _lodash;
const { Button, Space } = _antd;
const { useCallback, useState } = React;

const api = {
  loader: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('哈哈哈哈');
      }, 1000);
    });
  }
};

const ListInner = createWithRemoteLoader({
  modules: ['StateTag']
})(
  withFetch(({ remoteModules, data }) => {
    const [StateTag] = remoteModules;
    const [checkedList, setCheckedList] = useState([{ id: '288616017280630784' }]);

    const onChange = useCallback(
      (e, item) => {
        let _checkedList = JSON.parse(JSON.stringify(checkedList));
        if (e.target.checked) {
          _checkedList.push(item);
        } else {
          const index = _checkedList.findIndex(i => get(i, 'id') === item.id);
          _checkedList.splice(index, 1);
        }
        setCheckedList(_checkedList);
      },
      [data.pageData, checkedList]
    );
    return (
      <TalentResumeList
        data={data}
        keywords={['华', '女', '北京', '法', '律师', '测试']}
        showCheckbox
        checkedList={checkedList.map(item => get(item, 'id'))}
        onChange={onChange}
        onClick={item => {
          alert(`点击了 ID 为 ${get(item, 'id')} 的候选人`);
        }}
        infoExtra={item => <div className={'info-extra'}>ID: {get(item, 'id')}</div>}
        actionOptions={[
          {
            children: '加入'
          },
          {
            type: 'ModalButton',
            api,
            modalProps: ({ data }) => ({
              title: '测试弹窗',
              children: data
            }),
            children: '弹窗操作'
          },
          {
            children: '移除'
          },
          {
            children: '操作1'
          },
          {
            children: '操作2'
          }
        ]}
        footer={item => (
          <Space wrap>
            {get(item, 'tags.skillsTags', []).map(({ tagName }) => (
              <StateTag key={tagName} text={tagName} type={'skill'} showBorder showBackground={false} />
            ))}
          </Space>
        )}
      />
    );
  })
);

const ListFetch = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();

  return <ListInner keywords={['华', '女', '北京', '法', '律师', '测试']} {...apis.getResumeList} />;
});

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [Global] = remoteModules;

  return (
    <Global
      preset={{
        apis: {
          oss: {
            loader: async () => {}
          },
          getResumeList: {
            loader: async () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(mockData.data);
                }, 500);
              });
            }
          }
        }
      }}
    >
      <ListFetch />
    </Global>
  );
});

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

