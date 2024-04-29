import { useState } from 'react';
import { Input, Button } from 'antd';
import { createWithRemoteLoader } from '@kne/remote-loader';
import style from './style.module.scss';

const InputBar = createWithRemoteLoader({
  modules: ['components-core:Icon']
})(({ remoteModules, defaultValue, onSubmit }) => {
  const [value, onChange] = useState(defaultValue);
  const [isPending, setIsPending] = useState(false);
  const [Icon] = remoteModules;
  const handlerSubmit = async () => {
    setIsPending(true);
    const result = onSubmit && (await onSubmit());
    result !== false && onChange('');
    setIsPending(false);
  };
  return (
    <Input
      className={style['input-bar']}
      value={value}
      onChange={e => {
        onChange(e.target.value);
      }}
      variant="borderless"
      placeholder="Enter发送，或点击右侧箭头发送"
      addonAfter={<Button type="link" loading={isPending} icon={<Icon type="icon-caidan" size={20} />} onClick={handlerSubmit} />}
      onPressEnter={handlerSubmit}
    />
  );
});

export default InputBar;
