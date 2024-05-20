import { Flex, Row, Col } from 'antd';
import { createWithRemoteLoader } from '@kne/remote-loader';
import get from 'lodash/get';
import classnames from 'classnames';
import style from './style.module.scss';
import { useEffect, useRef } from 'react';

const DialogList = createWithRemoteLoader({
  modules: ['components-core:Image']
})(({ remoteModules, list = [], empty = null }) => {
  const [Image] = remoteModules;
  const lastNodeRef = useRef(null);

  useEffect(() => {
    if (lastNodeRef) {
      lastNodeRef?.current?.scrollIntoView?.();
    }
  }, [lastNodeRef, list]);

  return (
    <Flex vertical gap={24}>
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
                    ref={index === list?.length - 1 ? lastNodeRef : null}
                  >
                    {message}
                  </div>
                </Col>
              </Row>
            );
          })
        : empty}
    </Flex>
  );
});

export default DialogList;
