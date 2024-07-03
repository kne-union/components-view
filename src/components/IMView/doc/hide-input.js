const { default: IMView } = _IMView;
const BaseExample = () => {
  return (
    <div className="outer">
      <div className="inner">
        <IMView
          hideInput
          list={[
            {
              id: 1,
              message: '您好，我是张伟，来自XYZ科技公司的招聘',
              user: {
                isMaster: true
              }
            },
            {
              id: 2,
              message: '是的，您好。',
              user: {}
            },
            {
              id: 3,
              message: '很高兴能和您通话。我注意到您在boss上更新了您的简历，并且您在软件开发领域有着丰富的经验。我们对您的背景非常感兴趣，不知道您是否对探讨新的职业机会感兴趣？',
              user: {
                isMaster: true
              }
            }
          ]}
        />
      </div>
    </div>
  );
};

render(<BaseExample />);
