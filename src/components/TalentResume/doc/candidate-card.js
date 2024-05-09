const { CandidateCard } = _TalentResume;
const { default: mockData } = _mockData;
const { get } = _lodash;

const BaseExample = () => {
  return <CandidateCard resumeData={mockData.data} basicInfo={['女', '20岁', '上海', '1年']} extra={<div>额外信息</div>} detailInfo={<div>详细信息</div>} more={<div>更多信息</div>} skillTag={get(mockData.data, 'tags.skillsTags', [])} />;
};

render(<BaseExample />);
