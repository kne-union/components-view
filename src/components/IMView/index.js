import { Flex } from 'antd';
import DialogList from './DialogList';
import InputBar from './InputBar';
import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';
import style from './style.module.scss';

const IMView = createWithRemoteLoader({
  modules: ['components-core:Common@SimpleBar']
})(({ remoteModules, className, list, defaultValue = '', disabled, inputDisabled, disabledChildren = null, onSubmit }) => {
  const [SimpleBar] = remoteModules;
  return (
    <Flex vertical gap={16} className={classnames(className, style['im-view'])}>
      {disabled ? (
        <div className={style['dialog-list']}>{disabledChildren}</div>
      ) : (
        <SimpleBar className={style['dialog-list']}>
          <DialogList list={list} />
        </SimpleBar>
      )}
      <InputBar defaultValue={defaultValue} onSubmit={onSubmit} disabled={inputDisabled || disabled} />
    </Flex>
  );
});

export default IMView;
