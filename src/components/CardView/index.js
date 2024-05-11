import { Flex, Row, Col, Divider, Space } from 'antd';
import classnames from 'classnames';
import style from './style.module.scss';

const CardView = ({ className, avatar, title, subtitle, tags, options, attributes, properties, info, footer }) => {
  return (
    <Flex className={classnames(className)} gap={8}>
      {avatar && <div className={classnames(style['avatar'], 'card-view-avatar')}>{avatar}</div>}
      <Flex className={classnames(style['main'], 'card-view-main')} vertical gap={8}>
        <Row wrap={false} className={classnames(style['title-area'], 'card-view-title-area')}>
          <Col flex={1}>
            <Space>
              {[
                ['title', title],
                ['subtitle', subtitle],
                ['tags', tags]
              ]
                .filter(item => !!item[1])
                .map(([name, item]) => {
                  return (
                    <div key={name} className={classnames(style[name], `card-view-${name}`)}>
                      {item}
                    </div>
                  );
                })}
            </Space>
          </Col>
          {options && <Col>{options}</Col>}
        </Row>
        {(attributes || properties || info) && (
          <Row wrap={false} className={classnames(style['attr-area'], 'card-view-attr-area')}>
            {(attributes || properties) && (
              <Col span={info ? 12 : 24}>
                <Flex vertical gap={8}>
                  {attributes && (
                    <Space split={<Divider type="vertical" />}>
                      {attributes.map((item, index) => {
                        return (
                          <div key={index} className={classnames(style['attr'], 'card-view-attr')}>
                            {item}
                          </div>
                        );
                      })}
                    </Space>
                  )}
                  {properties && (
                    <Space>
                      {properties.map((item, index) => {
                        return (
                          <div key={index} className={classnames(style['props'], 'card-view-props')}>
                            {item}
                          </div>
                        );
                      })}
                    </Space>
                  )}
                </Flex>
              </Col>
            )}
            {info && <Col span={attributes || properties ? 12 : 24}>{info}</Col>}
          </Row>
        )}
        {footer && <div className={classnames(style['footer'], 'card-view-footer')}>{footer}</div>}
      </Flex>
    </Flex>
  );
};

export default CardView;
