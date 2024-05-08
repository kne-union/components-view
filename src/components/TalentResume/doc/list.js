const { TalentResumeList } = _TalentResume;
const { default: mockData } = _mockData;
const { createWithRemoteLoader } = _remoteLoader;
const { withFetch } = _reachFetch;
const { get } = _lodash;
const { Button, Space } = _antd;
const { useCallback, useState } = React;

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
        cardClassName={'list-card-item'}
        onClick={item => {
          alert(`点击了 ID 为 ${get(item, 'id')} 的候选人`);
        }}
        infoExtra={item => <div className={'info-extra'}>ID: {get(item, 'id')}</div>}
        rightActionsArea={item => (
          <>
            <Button>加入</Button>
            <Button type={'primary'}>移除</Button>
          </>
        )}
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
