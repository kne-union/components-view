const { TalentResumeCard } = _TalentResume;
const { default: mockData } = _mockData;

const BaseExample = () => {
  return <TalentResumeCard item={mockData.data} />;
};

render(<BaseExample />);
