
# IMView


### 概述

显示一个IM对话框


### 示例(全屏)


#### 示例样式

```scss
.outer {
  background: var(--primary-color-06);
}

.inner {
  width: 636px;
  margin: 0 auto;
  padding: 100px;
  box-sizing: content-box;
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _IMView(@components/IMView)

```jsx
const { default: IMView } = _IMView;
const BaseExample = () => {
  return (
    <div className="outer">
      <div className="inner">
        <IMView
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

```

- 语音交互
- 语音交互
- _IMView(@components/IMView)

```jsx
const { default: IMView } = _IMView;
const BaseExample = () => {
  return (
    <div className="outer">
      <div className="inner">
        <IMView
          dialogueFormat={2}
          onCancel={() => console.log('cancel...')}
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

```

- 不显示输入框
- 不显示输入框
- _IMView(@components/IMView)

```jsx
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

```

- 输入框禁止输入
- 输入框禁止输入
- _IMView(@components/IMView)

```jsx
const { default: IMView } = _IMView;
const BaseExample = () => {
  return (
    <div className="outer">
      <div className="inner">
        <IMView
          inputDisabled
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

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

