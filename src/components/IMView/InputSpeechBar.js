import { useState } from 'react';
import { Input, Button, Flex, Space, Divider } from 'antd';
import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';
import style from './style.module.scss';
import { ReactComponent as RecordingSvg } from './svg/recording.svg';

const InputSpeechBar = createWithRemoteLoader({
  modules: ['components-core:Icon']
})(({ remoteModules, disabled, defaultValue, onSubmit, result }) => {
  const [Icon] = remoteModules;
  const [value, onChange] = useState(defaultValue);
  const [isPending, setIsPending] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const handlerSubmit = async () => {
    setIsPending(true);
    const result = onSubmit && (await onSubmit(value));
    result !== false && onChange('');
    setIsPending(false);
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
          <Space
            className={style['record-btn']}
            onClick={() => {
              setIsFocus(prevState => !prevState);
            }}
            size={2}
          >
            <Icon type="yuyin" />
            {isFocus ? '结束录音并发送' : '开始录音'}
          </Space>
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
