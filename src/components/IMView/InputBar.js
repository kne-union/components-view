import { useState } from 'react';
import { Input, Button, Flex } from 'antd';
import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';
import style from './style.module.scss';

const InputBar = createWithRemoteLoader({
  modules: ['components-core:Icon']
})(({ remoteModules, disabled, defaultValue, onSubmit }) => {
  const [value, onChange] = useState(defaultValue);
  const [isPending, setIsPending] = useState(false);
  const [Icon] = remoteModules;
  const handlerSubmit = async () => {
    setIsPending(true);
    const result = onSubmit && (await onSubmit(JSON.stringify(value)));
    result !== false && onChange('');
    setIsPending(false);
  };

  return (
    <Flex
      className={classnames(style['input-bar'], {
        [style['disabled']]: disabled
      })}
    >
      <Input.TextArea
        autoSize={{ minRows: 1, maxRows: 4 }}
        disabled={disabled}
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
        variant="borderless"
        placeholder="Enter发送，或点击右侧箭头发送，Ctrl+Enter换行"
        onPressEnter={e => {
          e.preventDefault();
          if (e.ctrlKey) {
            onChange(value => value + '\n');
            return;
          }
          return handlerSubmit();
        }}
      />
      <Button type="link" disabled={disabled} loading={isPending} icon={<Icon type="icon-fasongduihua" size={20} />} onClick={handlerSubmit} />
    </Flex>
  );
});

export default InputBar;
