import { Flex, Row, Col, Empty } from 'antd';
import { createWithRemoteLoader } from '@kne/remote-loader';
import get from 'lodash/get';
import classnames from 'classnames';
import style from './style.module.scss';

const DialogList = createWithRemoteLoader({
  modules: ['components-core:Image']
})(({ remoteModules, list = [], empty }) => {
  const [Image] = remoteModules;
  return (
    <Flex vertical gap={24} className={style['dialog-list']}>
      {list && list.length > 0
        ? list.map(({ id, user, message }, index) => {
            const isMaster = get(user, 'isMaster');
            return (
              <Row key={id || index} gutter={12} wrap={false}>
                <Col order={isMaster ? 0 : 1}>
                  <div style={{ width: '40px' }} />
                </Col>
                <Col order={isMaster ? 1 : 0}>
                  <Image.Avatar {...Object.assign({}, get(user, 'avatar'))} shape="circle" className={style['avatar']} size={40} />
                </Col>
                <Col flex={1}>
                  <div
                    className={classnames(style['message'], {
                      [style['is-master']]: isMaster
                    })}
                  >
                    {message}
                  </div>
                </Col>
              </Row>
            );
          })
        : empty || <Empty />}
    </Flex>
  );
});

export default DialogList;
