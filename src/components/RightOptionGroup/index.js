import { createWithRemoteLoader } from '@kne/remote-loader';
import { useMemo } from 'react';
import { Button, Dropdown, Space } from 'antd';

import style from './style.module.scss';

const RightOptionGroup = createWithRemoteLoader({
  modules: ['components-core:Icon', 'components-core:LoadingButton', 'components-core:ConfirmButton', 'components-core:Modal@ModalButton', 'components-core:FormInfo@FormModalButton', 'components-core:Modal@TabsModalButton']
})(({ remoteModules, hasPrimary, showCount, showDropDownMenuBtn, options, getPopupContainer }) => {
  const [Icon, LoadingButton, ConfirmButton, ModalButton, FormModalButton, TabsModalButton] = remoteModules;
  const mapping = useMemo(() => {
    return {
      Button,
      LoadingButton,
      ConfirmButton,
      ModalButton,
      FormModalButton,
      TabsModalButton
    };
  }, [LoadingButton, ConfirmButton, ModalButton, FormModalButton, TabsModalButton]);

  return (
    <Space>
      {(showDropDownMenuBtn ? options.slice(0, showCount) : options).map(({ key, type, hidden, ...item }, index) => {
        const ButtonComponent = (type && mapping?.[type]) || Button;
        return hidden ? null : (
          <ButtonComponent
            {...item}
            key={key || index}
            size="middle"
            type={hasPrimary && index === 0 ? 'primary' : 'default'}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        );
      })}
      {options.length > showCount && showDropDownMenuBtn && (
        <Dropdown
          getPopupContainer={getPopupContainer}
          overlayClassName={style['overlay']}
          menu={{
            items: options.slice(showCount).map(({ type, key, ...item }, index) => {
              const ButtonComponent = (type && mapping?.[type]) || Button;
              return {
                key: key || index,
                label: <ButtonComponent {...item} size="middle" type="default" />
              };
            })
          }}
        >
          <Button>
            <Icon size={12} type="icon-arrow-thin-down" />
          </Button>
        </Dropdown>
      )}
    </Space>
  );
});

RightOptionGroup.defaultProps = {
  showCount: 3,
  hasPrimary: true,
  options: [],
  showDropDownMenuBtn: true
};

export default RightOptionGroup;
