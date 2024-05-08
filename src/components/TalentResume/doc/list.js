const { TalentResumeList } = _TalentResume;
const { default: mockData } = _mockData;
const { createWithRemoteLoader } = _remoteLoader;

const ListInner = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();

  return <TalentResumeList keywords={['华', '女', '北京', '法', '律师', '测试']} {...apis.getResumeList} />;
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
      <ListInner />
    </Global>
  );
});

render(<BaseExample />);
