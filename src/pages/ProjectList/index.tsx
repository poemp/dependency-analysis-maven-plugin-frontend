import {getAllProjectList} from '@/services/ant-design-pro/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import {Button} from 'antd';
import React, {useRef} from 'react';


const ProjectList: React.FC = () => {

  const actionRef = useRef<ActionType>();


  /**
   * 数据列
   */
  const columns: ProColumns<API.Project>[] = [
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
      <ProTable<API.Project, API.PageParams>
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
    </PageContainer>
  );
};

export default ProjectList;
