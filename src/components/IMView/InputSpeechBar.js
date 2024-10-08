import { useEffect, useRef, useState } from 'react';
import { Button, Flex, Space } from 'antd';
import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';

import style from './style.module.scss';
import Recording from './Recording';

const InputSpeechBar = createWithRemoteLoader({
  modules: ['components-core:Icon']
})(({ remoteModules, disabled, result, onStart, onComplete, onCancel, onRecording }) => {
  const [Icon] = remoteModules;
  const [isPending, setIsPending] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const lastNodeRef = useRef(null);

  useEffect(() => {
    if (lastNodeRef) {
      lastNodeRef?.current?.scrollTo?.(0, 100);
    }
  }, [lastNodeRef, result]);

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
              <Recording />
              录音中
            </Space>
          ) : (
            <div className={style['not-start-tips']}>点击右侧开始录音，即刻与模拟候选人聊天吧!</div>
          )}
          <Space size={12}>
            {isFocus && onCancel ? (
              <span
                className={style['record-cancel']}
                onClick={() => {
                  setIsPending(false);
                  onCancel?.();
                  setIsFocus(prevState => !prevState);
                }}
              >
                取消
              </span>
            ) : null}
            <Button
              type="link"
              disabled={disabled}
              loading={isPending}
              className={classnames({}, style['record-btn'], { [style['not-disabled']]: !disabled })}
              onClick={async () => {
                setIsPending(true);
                if (isFocus) {
                  await onComplete?.();
                } else {
                  await onStart?.();
                }
                setIsPending(false);
                setIsFocus(prevState => !prevState);
                // onRecording?.();
              }}
            >
              <Icon type="yuyin" />
              {isFocus ? '结束录音并发送' : '开始录音'}
            </Button>
          </Space>
        </div>
        {isFocus && (
          <div
            className={classnames(style['input-result'], {
              [style['no-result']]: !result
            })}
            ref={lastNodeRef}
          >
            {result || '您可以开始说话'}
          </div>
        )}
      </div>
    </Flex>
  );
});

export default InputSpeechBar;
