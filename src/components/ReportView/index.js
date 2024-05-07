import style from './style.module.scss';
import { Flex } from 'antd';
import List from './List';
import Result from './Result';
import Table from './Table';
import Part from './Part';
import classNames from 'classnames';

const typeMapping = {
  list: List,
  result: Result,
  table: Table,
  part: Part,
  info: ({ children }) => <div className={classNames(style['info'], 'report-view-info')}>{children}</div>
};
const ReportView = ({ type = 'list', report, title, extra, ...props }) => {
  const Component = typeMapping[type];
  return (
    <div className={style['report-view']}>
      <Flex className={style['title-outer']} justify="space-between">
        {title && <div className={style['title']}>{title}</div>}
        {extra && <div className={style['title-extra']}>{extra}</div>}
      </Flex>

      <Component report={report} {...props} />
    </div>
  );
};

export default ReportView;
