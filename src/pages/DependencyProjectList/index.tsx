import {artifactUsingProjects} from '@/services/ant-design-pro/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import { useLocation } from 'react-router-dom'
import React, {useEffect, useRef, useState} from 'react';


const DependencyProjectList: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [dataSource,setDataSource] = useState<API.Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation()

  /**
   * 获取数据
   */
  function fetchData() {
    setLoading(true);
    //获取请求路径里面的参数
    const utm = new URLSearchParams(location.search)
    if (utm.get("artifactId")) {
      const artifactId = utm.get("artifactId");
      artifactUsingProjects(artifactId as string).then((res) => {
        if (res?.status === 0) {
          const {data} = res;
          // @ts-ignore
          setDataSource(data?data:[]);
        }
        setLoading(false);
      });
    }

  }
  /**
   * start page will run
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * 数据列
   */
  const columns: ProColumns<API.Project>[] = [
    {
      title: "name",
      dataIndex: 'name',
      tip: 'project name',
      width:350,
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
  ];

  return (
    <PageContainer title={"use artifact project list"}>
      <ProTable<API.Project, API.PageParams>
        headerTitle={"all dependency project"}
        actionRef={actionRef}
        rowKey="key"
        size="small"
        loading={loading}
        bordered={true}
        search={{
          labelWidth: 120,
        }}
        dataSource={dataSource}
        columns={columns}
        defaultSize={"small"}
      />
    </PageContainer>
  );
};

export default DependencyProjectList;
