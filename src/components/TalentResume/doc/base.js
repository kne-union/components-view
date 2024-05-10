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
