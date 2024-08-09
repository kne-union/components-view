import { Flex } from 'antd';
import DialogList from './DialogList';
import InputBar from './InputBar';
import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';
import style from './style.module.scss';
import InputSpeechBar from './InputSpeechBar';

/*dialogueFormat
{
  text:1, // 文本交互
  speech:2 // 语音交互
}*/

const inputBar = {
  1: InputBar,
  2: InputSpeechBar
};

const IMView = createWithRemoteLoader({
  modules: ['components-core:Common@SimpleBar']
})(({ remoteModules, className, list, defaultValue = '', disabled, inputDisabled, disabledChildren = null, onSubmit, hideInput, dialogueFormat = 1, playAudioData, setPlayAudioData, ...props }) => {
  const [SimpleBar] = remoteModules;
  const InputComponent = inputBar[dialogueFormat];

  return (
    <Flex vertical gap={16} className={classnames(className, style['im-view'])}>
      {disabled ? (
        <div className={style['dialog-list']}>{disabledChildren}</div>
      ) : (
        <SimpleBar className={style['dialog-list']}>
          <DialogList list={list} dialogueFormat={dialogueFormat} playAudioData={playAudioData} setPlayAudioData={setPlayAudioData} />
        </SimpleBar>
      )}
      {!hideInput && <InputComponent defaultValue={defaultValue} onSubmit={onSubmit} disabled={inputDisabled || disabled} {...props} />}
    </Flex>
  );
});

export default IMView;
