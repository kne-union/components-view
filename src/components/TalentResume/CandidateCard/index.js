import { Col, Divider, Row, Space } from 'antd';
import { get } from 'lodash';
import style from './style.module.scss';
import classnames from 'classnames';
import { createWithRemoteLoader } from '@kne/remote-loader';

const CandidateCard = createWithRemoteLoader({
  modules: ['Image', 'Highlight', 'Highlight@HighlightProvider', 'StateTag']
})(({ remoteModules, resumeData = {}, keywords, basicInfo, more, extra, skillTag = null, detailInfo }) => {
  const [Image, Highlight, HighlightProvider, StateTag] = remoteModules;

  return (
    <div className={classnames(style['candidate-card'], 'candidate-card')}>
      <HighlightProvider list={keywords}>
        <Row justify="space-between" wrap={false}>
          <Col className={style.avatar}>
            <Image.Avatar id={get(resumeData, 'photo')} shape="square" size={88} gender={get(resumeData, 'gender')} />
          </Col>
          <Col flex={1}>
            <Space direction="vertical" size={8}>
              <Space size={8} align={'start'}>
                <span className={style.name}>
                  <Highlight>{get(resumeData, 'name') || '姓名缺失'}</Highlight>
                </span>
                <span className={style.id}>
                  ID：<Highlight>{get(resumeData, 'id')}</Highlight>
                </span>
                {extra}
              </Space>
              {basicInfo ? (
                <Space split={<Divider type="vertical" />}>
                  {basicInfo.map(item => (
                    <div key={item}>{item}</div>
                  ))}
                </Space>
              ) : null}
              {detailInfo}
            </Space>
          </Col>
          <Col>{more}</Col>
        </Row>
        {skillTag ? (
          <Space wrap className={style['skills-tags']}>
            {skillTag.map(({ tagName }) => (
              <StateTag key={tagName} text={tagName} type={'skill'} showBorder showBackground={false} />
            ))}
          </Space>
        ) : null}
      </HighlightProvider>
    </div>
  );
});

CandidateCard.defaultProps = {
  more: null,
  resumeData: {},
  keywords: []
};
export default CandidateCard;
