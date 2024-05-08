import { createWithRemoteLoader } from '@kne/remote-loader';
import get from 'lodash/get';
import { isNil } from 'lodash';
import { Col, Divider, Row, Space, Timeline, Typography } from 'antd';
import dayjs from 'dayjs';
import classnames from 'classnames';

import style from './style.module.scss';

const TalentResumeCard = createWithRemoteLoader({
  modules: ['Highlight', 'Image', 'Icon', 'Enum', 'Common@AddressEnum']
})(({ remoteModules, item, indexArea, infoExtra, onClick, extraResumeNode, showNode, rightActionsArea, footer }) => {
  const [Highlight, Image, Icon, Enum, AddressEnum] = remoteModules;

  return (
    <div className={classnames(style['resume-card'], 'resume-card')}>
      <Row gutter={16} className={classnames(style['resume-card-border'])} onClick={onClick} wrap={false}>
        <Col className={style['index-area-wrap']}>
          <Space align="center">
            {indexArea}
            <Image.Avatar size={50} id={get(item, 'photo')} shape="circle" gender={get(item, 'gender')} />
          </Space>
        </Col>
        <Col flex={1}>
          <Row align="bottom" className={style['row-top']} justify="space-between">
            <Col>
              <Space size={12} align={'center'}>
                <span className={style.name}>
                  <Highlight>{get(item, 'name') || '姓名缺失'}</Highlight>
                </span>
                <Space align={'center'} size={0}>
                  {infoExtra}
                </Space>
              </Space>
            </Col>
            <Col className={style['fixed-button']}>
              <Space size={16}>{rightActionsArea}</Space>
            </Col>
          </Row>
          <Row wrap={false} className={style['row-center']}>
            <Col span={12}>
              <Space
                className={classnames('space-full', style['row-basic'], {
                  [style['no-edu']]: !get(item, 'educations[0]')
                })}
                size={[12, 0]}
                split={<Divider type="vertical" />}
                wrap={true}
              >
                {get(item, 'gender') && (
                  <Highlight>
                    {
                      {
                        M: '男',
                        F: '女'
                      }[get(item, 'gender')]
                    }
                  </Highlight>
                )}
                {get(item, 'age') > 0 && <span>{get(item, 'age') || '-'}岁</span>}
                {!isNil(get(item, 'currentLocation')) && <>{Number.isInteger(Number(get(item, 'currentLocation'))) ? <AddressEnum name={get(item, 'currentLocation')} /> : get(item, 'currentLocation')}</>}
                {get(item, 'workExperience') > 0 && <span>{get(item, 'workExperience') || '-'}年</span>}
                {get(item, 'degree') >= 0 && <Enum name={get(item, 'degree')} moduleName="degreeEnum" />}
              </Space>

              {get(item, 'educations[0]') && (
                <div className={classnames(style['row-education'])}>
                  <Row wrap={true}>
                    {get(item, 'educations[0].school', '-') && (
                      <Col className={classnames(style['edu-subject'])} title={get(item, 'educations[0].school', '-')}>
                        <Icon className="color-main" size={16} type="icon-yuanxiao" />
                        <Typography.Text
                          ellipsis={{
                            tooltip: true
                          }}
                        >
                          <Highlight>{get(item, 'educations[0].school', '-')}</Highlight>
                        </Typography.Text>
                      </Col>
                    )}
                    {get(item, 'educations[0].subject', '-') && (
                      <Col className={classnames(style['edu-subject'])} title={get(item, 'educations[0].subject', '-')}>
                        <Icon className="color-main" size={16} type="icon-zhuanye" />
                        <Typography.Text
                          ellipsis={{
                            tooltip: true
                          }}
                        >
                          <Highlight>{get(item, 'educations[0].subject', '-')}</Highlight>
                        </Typography.Text>
                      </Col>
                    )}
                  </Row>
                </div>
              )}
            </Col>
            <Col flex={1} className={get(item, 'works.length') > 1 ? style['work-time-line'] : ''}>
              {get(item, `works[0]`) && (
                <Timeline>
                  <Timeline.Item className={!get(item, `works[1]`) && style['without-time-line']}>
                    <Row align="middle" wrap={false}>
                      <Col className={style['company-time']}>
                        {get(item, `works[0].startTime`) && (
                          <>
                            {dayjs(get(item, `works[0].startTime`)).format('YYYY.MM')}-{dayjs(get(item, `works[0].endTime`)).format('YYYY.MM') || '至今'}
                          </>
                        )}
                      </Col>
                      <Col flex={1} className={style['work-box']}>
                        <div className={style['work-company']}>
                          <Typography.Text
                            ellipsis={{
                              tooltip: true
                            }}
                          >
                            <Highlight>{get(item, `works[0].company`)}</Highlight>
                          </Typography.Text>
                        </div>
                        <div className={style['work-position']}>
                          <Typography.Text
                            ellipsis={{
                              tooltip: true
                            }}
                          >
                            <Highlight>{get(item, `works[0].position`)}</Highlight>
                          </Typography.Text>
                        </div>
                      </Col>
                    </Row>
                  </Timeline.Item>
                </Timeline>
              )}
              {get(item, `works[1]`) && (
                <Timeline>
                  <Timeline.Item>
                    <Row align="middle" wrap={false}>
                      <Col className={style['company-time']}>
                        {get(item, `works[1].startTime`) && (
                          <>
                            {dayjs(get(item, `works[0].startTime`)).format('YYYY.MM')}-{dayjs(get(item, `works[0].endTime`)).format('YYYY.MM') || '至今'}
                          </>
                        )}
                      </Col>
                      <Col flex={1} className={style['work-box']}>
                        <div className={style['work-company']}>
                          <Typography.Text
                            ellipsis={{
                              tooltip: true
                            }}
                          >
                            <Highlight>{get(item, `works[1].company`)}</Highlight>
                          </Typography.Text>
                        </div>
                        <div className={style['work-position']}>
                          <Typography.Text
                            ellipsis={{
                              tooltip: true
                            }}
                          >
                            <Highlight>{get(item, `works[1].position`)}</Highlight>
                          </Typography.Text>
                        </div>
                      </Col>
                    </Row>
                  </Timeline.Item>
                </Timeline>
              )}
            </Col>
          </Row>
          {footer}
          {showNode && extraResumeNode}
        </Col>
      </Row>
    </div>
  );
});

export default TalentResumeCard;
