
# TalentResume


### 概述

人才简历


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _TalentResume(@components/TalentResume),_mockData(./mock/talent-resume.json)

```jsx
const { TalentResumeCard } = _TalentResume;
const { default: mockData } = _mockData;

const BaseExample = () => {
  return <TalentResumeCard item={mockData.data} />;
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

