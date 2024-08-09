import style from './style.module.scss';
import classnames from 'classnames';

const Recording = () => {
  return (
    <div className={style['recording-svg']}>
      {['one', 'two', 'three', 'four'].map(item => (
        <div key={item} className={classnames({}, style['item'], style[item])}></div>
      ))}
    </div>
  );
};

export default Recording;
