import style from './style.module.scss';
import { Flex } from 'antd';
import List from './List';
import Result from './Result';
import Table from './Table';
import Part from './Part';
import classNames from 'classnames';

const ReportView = ({ title, extra, className, children }) => {
  return (
    <div className={classNames(style['report-view'], className)}>
      <Flex className={style['title-outer']} justify="space-between">
        {title && <div className={style['title']}>{title}</div>}
        {extra && <div className={style['title-extra']}>{extra}</div>}
      </Flex>
      {children}
    </div>
  );
};

ReportView.List = List;
ReportView.Result = Result;
ReportView.Table = Table;
ReportView.Part = Part;

export default ReportView;
