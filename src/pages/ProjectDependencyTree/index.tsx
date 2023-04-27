import {Tree} from 'antd';
import React, {useEffect, useState} from 'react';
import {getProjectArtifactTreeByProjectId, getProjectById} from "@/services/ant-design-pro/api";
import {PageContainer,} from '@ant-design/pro-components';
import type {DataNode, DirectoryTreeProps} from 'antd/es/tree';

const { DirectoryTree } = Tree;

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;



const ProjectDependencyTree: React.FC = () => {

  const [,setDataSource] = useState<API.Project>({});

  // @ts-ignore
  const [treeData,setTreeData] = useState<DataNode[]>([])

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  /**
   * 获取数据
   */
  function fetchData() {
    //获取请求路径里面的参数
    const utm = new URLSearchParams(location.search)
    if (utm.get("projectId")) {
      const projectId = utm.get("projectId");
      getProjectById(projectId as string).then((res) => {
        if (res?.status === 0) {
          const {data} = res;
          // @ts-ignore
          setDataSource(data?data:[]);
        }
      });
    }
  }

  function getProjectDependencyTree(){
    //获取请求路径里面的参数
    const utm = new URLSearchParams(location.search)
    if (utm.get("projectId")) {
      const projectId = utm.get("projectId");
      getProjectArtifactTreeByProjectId(projectId as string).then((res) => {
        if (res?.status === 0) {
          const {data} = res;
          // @ts-ignore
          setTreeData(data?data:[]);
        }
      });
    }

  }

  /**
   * start page will run
   */
  useEffect(() => {
    fetchData();
    getProjectDependencyTree()
  }, []);


  // @ts-ignore
  return (
    <PageContainer title={"project dependency tree"}>
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    </PageContainer>

  );
};

export default ProjectDependencyTree;
