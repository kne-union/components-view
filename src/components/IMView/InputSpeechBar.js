import { useState } from 'react';
import { Button, Flex, Space } from 'antd';
import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';

import style from './style.module.scss';
import { ReactComponent as RecordingSvg } from './svg/recording.svg';

const InputSpeechBar = createWithRemoteLoader({
  modules: ['components-core:Icon']
})(({ remoteModules, disabled, result, onStart, onComplete, onRecording }) => {
  const [Icon] = remoteModules;
  const [isPending, setIsPending] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const handlerSubmit = async () => {
    if (onComplete) {
      setIsPending(true);
      await onComplete?.();
      setIsPending(false);
    }
  };

  return (
    <Flex
      className={classnames(style['input-bar'], {
        [style['disabled']]: disabled,
        [style['focus']]: isFocus
      })}
    >
      <div className={style['input-wrap']}>
        <div className={style['input-wrap-action']}>
          {isFocus ? (
            <Space size={4} className={style['recording-wrap']}>
              <RecordingSvg className={style['recording-svg']} />
              录音中
            </Space>
          ) : (
            <div className={style['not-start-tips']}>点击右侧开始录音，即刻与模拟候选人聊天吧!</div>
          )}
          <Button
            type="link"
            disabled={disabled}
            loading={isPending}
            className={style['record-btn']}
            onClick={async () => {
              setIsFocus(prevState => !prevState);
              if (isFocus) {
                await handlerSubmit();
              } else {
                onStart?.();
              }
              // onRecording?.();
            }}
          >
            <Icon type="yuyin" />
            {isFocus ? '结束录音并发送' : '开始录音'}
          </Button>
        </div>
        {isFocus && (
          <div
            className={classnames(style['input-result'], {
              [style['no-result']]: !result
            })}
          >
            {result || '您可以开始说话'}
          </div>
        )}
      </div>
    </Flex>
  );
});

export default InputSpeechBar;
