import { Space, Row, Col } from 'antd';
import classnames from 'classnames';
import importMessages from './locale';
import style from './style.module.scss';
import { useMemo } from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';
import RightOptionGroup from '../RightOptionGroup';

export const PageHeaderInner = createWithRemoteLoader({
  modules: ['Icon']
})(({ remoteModules, className, title, iconType, info, tags, tagSplit, tagClassName, hasPrimary, showCount, options, getPopupContainer, showDropDownMenuBtn }) => {
  const [Icon] = remoteModules;

  const _options = useMemo(() => {
    return options
      ? (options || []).filter(item => {
          if (typeof item.display === 'function') {
            return item.display();
          }
          return item.display !== false;
        })
      : null;
  }, [options]);

  return (
    <Space direction="vertical" className={classnames(className, style['page-header'])}>
      <Row gutter={[120, 12]} wrap={false}>
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
        {_options && (
          <Col>
            <RightOptionGroup options={_options} hasPrimary={hasPrimary} showCount={showCount} getPopupContainer={getPopupContainer} showDropDownMenuBtn={showDropDownMenuBtn} />
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
  );
});

const PageHeader = createWithRemoteLoader({
  modules: ['components-core:Intl']
})(({ remoteModules, ...props }) => {
  const [Intl] = remoteModules;
  const { IntlProvider } = Intl;

  return (
    <IntlProvider importMessages={importMessages} moduleName="PageHeader">
      <PageHeaderInner {...props} />
    </IntlProvider>
  );
});

PageHeaderInner.defaultProps = {
  tagSplit: <span className={style['tag-split']}>|</span>,
  tagClassName: '',
  showDropDownMenuBtn: false
};

PageHeader.defaultProps = {
  tagSplit: <span className={style['tag-split']}>|</span>,
  tagClassName: ''
};

export default PageHeader;
