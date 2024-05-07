import { Space, Row, Col, Button, Dropdown } from 'antd';
import classnames from 'classnames';
import importMessages from './locale';
import style from './style.module.scss';
import { useMemo } from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';

export const PageHeaderInner = createWithRemoteLoader({
  modules: ['components-core:Icon', 'components-core:LoadingButton', 'components-core:ConfirmButton', 'components-core:Modal@ModalButton', 'components-core:FormInfo@FormModalButton', 'components-core:Modal@TabsModalButton']
})(({ remoteModules, className, title, iconType, info, tags, tagSplit, tagClassName, hasPrimary, showCount, options, getPopupContainer }) => {
  const [Icon, LoadingButton, ConfirmButton, ModalButton, FormModalButton, TabsModalButton] = remoteModules;
  const mapping = useMemo(() => {
    return {
      Button,
      LoadingButton,
      ConfirmButton,
      ModalButton,
      FormModalButton,
      TabsModalButton
    };
  }, [LoadingButton, ConfirmButton, ModalButton, FormModalButton, TabsModalButton]);
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
            <Space>
              {_options.slice(0, showCount).map(({ key, type, hidden, ...item }, index) => {
                const ButtonComponent = (type && mapping?.[type]) || Button;
                return hidden ? null : <ButtonComponent {...item} key={key || index} size="middle" type={hasPrimary && index === 0 ? 'primary' : 'default'} />;
              })}
              {_options.length > showCount && (
                <Dropdown
                  getPopupContainer={getPopupContainer}
                  overlayClassName={style['overlay']}
                  menu={{
                    items: _options.slice(showCount).map(({ type, key, ...item }, index) => {
                      const ButtonComponent = (type && mapping?.[type]) || Button;
                      return {
                        key: key || index,
                        label: <ButtonComponent {...item} size="middle" type="default" />
                      };
                    })
                  }}
                >
                  <Button>
                    {/*{showDropDownMenuBtn ? (
                        <FormattedMessage id="more" moduleName="PageHeader" />
                      ) : '更多'}*/}
                    <Icon size={12} type="icon-arrow-thin-down" />
                  </Button>
                </Dropdown>
              )}
            </Space>
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
  showCount: 3,
  hasPrimary: true,
  tagSplit: <span className={style['tag-split']}>|</span>,
  tagClassName: '',
  showDropDownMenuBtn: false
};

PageHeader.defaultProps = {
  showCount: 3,
  hasPrimary: true,
  tagSplit: <span className={style['tag-split']}>|</span>,
  tagClassName: '',
  showDropDownMenuBtn: true
};

export default PageHeader;
