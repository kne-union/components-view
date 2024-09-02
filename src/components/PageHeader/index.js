import { Space, Row, Col } from 'antd';
import classnames from 'classnames';
import { createWithRemoteLoader } from '@kne/remote-loader';

import importMessages from './locale';
import style from './style.module.scss';

export const PageHeaderInner = createWithRemoteLoader({
  modules: ['components-core:Icon', 'components-core:ButtonGroup']
})(({ remoteModules, className, title, iconType, info, tags, tagSplit, tagClassName, buttonOptions, buttonOptionsMaxWidth, addonBefore, addonAfter }) => {
  const [Icon, ButtonGroup] = remoteModules;
  return (
    <Row className={classnames(className, style['page-header'])} wrap={false} gutter={10}>
      {addonBefore && <Col>{addonBefore}</Col>}
      <Col flex={1}>
        <Space direction="vertical">
          <Row wrap={false}>
            <Col flex={1} className={style['main']}>
              <Space align="start">
                {iconType && (
                  <div className={style['icon-outer']}>
                    <Icon colorful type={iconType} size={24} />
                  </div>
                )}
                <div className={style['title']}>{title}</div>
                {info && <div className={style['info']}>{info}</div>}
              </Space>
            </Col>
            {buttonOptions && (
              <Col flex={1} className={style['button-options']} style={{ '--max-width': buttonOptionsMaxWidth }}>
                <ButtonGroup {...buttonOptions} />
              </Col>
            )}
          </Row>
          {tags && (
            <Space className={tagClassName} split={tagSplit} size={[16, 8]}>
              {tags.map((item, index) => {
                return (
                  <div key={index} className={style['tags']}>
                    {item}
                  </div>
                );
              })}
            </Space>
          )}
        </Space>
      </Col>
      {addonAfter && <Col>{addonAfter}</Col>}
    </Row>
  );
});

const PageHeader = createWithRemoteLoader({
  modules: ['components-core:Intl@IntlProvider']
})(({ remoteModules, ...props }) => {
  const [IntlProvider] = remoteModules;

  return (
    <IntlProvider importMessages={importMessages} moduleName="PageHeader">
      <PageHeaderInner {...props} />
    </IntlProvider>
  );
});

PageHeaderInner.defaultProps = {
  tagSplit: <span className={style['tag-split']}>|</span>,
  tagClassName: ''
};

PageHeader.defaultProps = {
  tagSplit: <span className={style['tag-split']}>|</span>,
  tagClassName: ''
};

export default PageHeader;
