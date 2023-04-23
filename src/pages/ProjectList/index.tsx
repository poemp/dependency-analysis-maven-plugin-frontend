import {getAllProjectList, removeRule} from '@/services/ant-design-pro/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {FooterToolbar, PageContainer, ProTable,} from '@ant-design/pro-components';
import {FormattedMessage} from '@umijs/max';
import {Button, message} from 'antd';
import React, {useRef, useState} from 'react';


/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const ProjectList: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);


  /**
   * 数据列
   */
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: "name",
      dataIndex: 'name',
      tip: 'project name',
      width:350,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              console.log(entity)
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: "group",
      dataIndex: 'groupId',
    },
    {
      title: "artifactId",
      dataIndex: 'artifactId',
    },
    {
      title: "baseVersion",
      dataIndex: 'baseVersion',
      hideInForm: true,
      search:false
    },
    {
      title: "version",
      dataIndex: 'version',
    },
    {
      title: "uploadTime",
      dataIndex: 'createTime',
      hideInForm: true,
      search:false
    },
    {
      title: "operating",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [

        // eslint-disable-next-line react/jsx-key
        <Button
          type="link"
          title={"maven dependency tree"}
          onClick={
          ()=>{
            console.log(record)
          }
        } >tree</Button>,

        // eslint-disable-next-line react/jsx-key
        <Button
          title={"maven dependency tree"}
          type="link"
          onClick={
            ()=>{
              console.log(record)
            }
          } >list</Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={"all project"}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={getAllProjectList}
        columns={columns}
        defaultSize={"small"}
      />
      {/*選擇情況*/}
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default ProjectList;
