import { Flex, Row, Col } from 'antd';
import { createWithRemoteLoader } from '@kne/remote-loader';
import get from 'lodash/get';
import classnames from 'classnames';
import style from './style.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as VoicePlaybackSvg } from './svg/voice-playback.svg';
import dayjs from 'dayjs';

const DialogList = createWithRemoteLoader({
  modules: ['components-core:Image']
})(({ remoteModules, list = [], empty = null, dialogueFormat }) => {
  const [Image] = remoteModules;
  const lastNodeRef = useRef(null);

  const playingRef = useRef(null);

  const [playing, setPlaying] = useState({});

  useEffect(() => {
    if (lastNodeRef) {
      lastNodeRef?.current?.scrollIntoView?.();
    }
  }, [lastNodeRef, list]);

  return (
    <Flex vertical gap={24}>
      {list && list.length > 0
        ? list.map(({ id, user, message, duration = 0, fileId, ...props }, index) => {
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
                    {dialogueFormat === 2 && duration ? (
                      <div className={style['speech-input-wrap']}>
                        <div
                          className={style['speech-input']}
                          onClick={() => {
                            if (playingRef.current && playingRef.current.fileId !== fileId) {
                              if (playingRef.current.playing === true) {
                                playingRef.current.audio.pause();
                              }
                              playingRef.current = null;
                            }
                            if (playingRef.current && playingRef.current.playing === true && playingRef.current.fileId === fileId) {
                              playingRef.current.audio.pause();
                              playingRef.current = null;
                              return;
                            }
                            const audio = new Audio(`/api-node/v1/static/file-id/${fileId}`);
                            audio.currentTime = 0;
                            audio.play();
                            playingRef.current = { id, user, message, duration, fileId, ...props, audio, playing: true };
                            // 监听播放完成事件
                            audio.addEventListener('ended', function () {
                              console.log('音频播放完成');
                            });
                            // 监听播放暂停事件
                            audio.addEventListener('pause', function () {
                              console.log('音频播放暂停');
                            });
                            // 监听播放错误事件
                            audio.addEventListener('error', function () {
                              console.error('音频播放出错');
                            });
                          }}
                        >
                          <VoicePlaybackSvg
                            className={classnames({}, style['speech-input-svg'], {
                              // [style['audio-is-playing']]: !!isPlaying,
                              'audio-is-playing': !!playingRef.current?.playing
                            })}
                          />
                          <span>{dayjs(duration < 1000 ? 1000 : duration).format(duration >= 1000 * 60 ? 'm‘s‘’' : 's‘’')}</span>
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
