import style from './style.module.scss';
import List from './List';
import Result from './Result';
import Table from './Table';
import Part from './Part';

const typeMapping = {
  list: List,
  result: Result,
  table: Table,
  part: Part
};
const ReportView = ({ type = 'list', report, title }) => {
  const Component = typeMapping[type];
  return (
    <div className={style['report-view']}>
      {title && <div className={style['title']}>{title}</div>}
      <Component report={report} />
    </div>
  );
};

export default ReportView;
