import { Flex, Row, Col } from 'antd';
import { createWithRemoteLoader } from '@kne/remote-loader';
import get from 'lodash/get';
import classnames from 'classnames';
import style from './style.module.scss';
import { useEffect, useRef } from 'react';
import { ReactComponent as VoicePlaybackSvg } from './svg/voice-playback.svg';

const DialogList = createWithRemoteLoader({
  modules: ['components-core:Image']
})(({ remoteModules, list = [], empty = null, dialogueFormat, playAudio }) => {
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
        ? list.map(({ id, user, message, duration = 13 }, index) => {
            const isMaster = get(user, 'isMaster');
            return (
              <Row key={id || index} gutter={12} wrap={false}>
                <Col order={isMaster ? 0 : 1}>
                  <div style={{ width: '40px' }} />
                </Col>
                <Col order={isMaster ? 1 : 0}>
                  <Image.Avatar {...Object.assign({}, get(user, 'avatar'))} shape="circle" className={style['avatar']} size={40} />
                </Col>
                <Col
                  flex={1}
                  className={classnames({
                    [style['in-right']]: isMaster
                  })}
                >
                  <div
                    className={classnames(style['message'], {
                      [style['is-master']]: isMaster
                    })}
                    ref={index === list?.length - 1 ? lastNodeRef : null}
                  >
                    {dialogueFormat === 2 ? (
                      <div className={style['speech-input-wrap']}>
                        <div className={style['speech-input']} onClick={() => playAudio?.({ id, user, message, duration, index })}>
                          <VoicePlaybackSvg className={style['speech-input-svg']} />
                          <span>{`${duration}‘’`}</span>
                        </div>
                      </div>
                    ) : null}
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
