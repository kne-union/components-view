import { useMemo } from 'react';
import { Row, Col, Space, Flex, Divider } from 'antd';
import groupBy from 'lodash/groupBy';
import style from './style.module.scss';
import classNames from 'classnames';

const Table = ({ report }) => {
  const { columns, list, group } = Object.assign(
    {},
    {
      columns: [],
      group: [],
      list: []
    },
    report
  );

  const { groupList, groupColumn, otherColumns } = useMemo(() => {
    const groupList = groupBy(list, 'group');
    const groupIndex = columns.findIndex(item => item.name === 'group');
    const otherColumns = columns.slice(0);
    const groupColumn = columns[groupIndex];
    otherColumns.splice(groupIndex, 1);
    return {
      groupList,
      groupColumn,
      otherColumns: new Map(otherColumns.map(item => [item.name, item]))
    };
  }, [columns, list]);

  const groupMap = useMemo(() => {
    return new Map(group.map(item => [item.name, item]));
  }, [group]);

  return (
    <Flex vertical gap={groupColumn?.isSubTitle ? 10 : 32} className={style['table-view']}>
      <Row wrap={false} className={style['table-header']}>
        {groupColumn?.isSubTitle ? null : (
          <Col span={groupColumn.span}>
            <div className={style['table-header-col-item']}>{groupColumn.title}-</div>
          </Col>
        )}
        <Col span={groupColumn?.isSubTitle ? 24 : 24 - groupColumn.span}>
          <Row wrap={false}>
            {Array.from(otherColumns.values()).map(({ title, name, span }) => {
              return (
                <Col span={span} key={name}>
                  <div className={style['table-header-col-item']}>{title}</div>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <Space direction="vertical">
        {Object.keys(groupList).map(groupName => {
          const list = groupList[groupName];
          const currentGroup = groupMap.get(groupName);
          const otherSpan = groupColumn?.isSubTitle ? 24 : 24 - groupColumn.span;
          return (
            <div>
              {groupColumn?.isSubTitle ? (
                <Divider>{currentGroup.label}</Divider>
              ) : /*<Row wrap={false} className={style['table-sub-header']}>
                    <Col>
                      <div className={style['table-header-col-item']}>{currentGroup.label}</div>
                    </Col>
                  </Row>*/
              null}
              <Row key={groupName} wrap={false}>
                {/*<Col span={groupColumn.span}>
                <div className={style['table-group-label']}>{currentGroup.label}</div>
              </Col>*/}
                <Col span={otherSpan}>
                  {list.map((item, index) => {
                    return (
                      <Row wrap={false} key={index} className={classNames({ [style['table-row-item']]: index !== list?.length - 1 })}>
                        {Array.from(otherColumns.values()).map(({ name }) => {
                          const currentColumn = otherColumns.get(name);
                          return (
                            <Col span={currentColumn.span} key={name}>
                              <div className={classNames(style['table-col-item'], { [style['table-col-item-description']]: name === 'description' })}>
                                {currentColumn.hasOwnProperty('valueOf') && typeof currentColumn.valueOf === 'function' ? currentColumn.valueOf(item[name], item) : item[name]}
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    );
                  })}
                </Col>
              </Row>
            </div>
          );
        })}
      </Space>
    </Flex>
  );
};

export default Table;
