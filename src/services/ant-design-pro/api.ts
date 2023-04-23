// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function currentUserLocal(options?: { [key: string]: any }) {
  return new Promise<{
    data:API.CurrentUser
  }>(function (resolve, reject) {
    resolve({
      data: {
        name: "Maven管理员",
        avatar: "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        userid: "1",
        email: "xue@2013@sina.com",
        title: "依赖",
        group: "信息中心",
        notifyCount: 1,
        unreadCount: 2,
        phone: "15608015145",
      }
    })
  })
}

/** 登录接口 POST /api/login/account */
export async function loginLocal(body: API.LoginParams, options?: { [key: string]: any }) {
  return new Promise<API.LoginResult>(function (resolve, reject) {
    resolve({
      status: "ok",
      type: "hash",
      currentAuthority: "some",
    })
  })
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * 獲取所有項目列表
 * @constructor
 */
export async  function getAllProjectList(options?: { [key: string]: any }){
  return request<API.Result<API.Project[]>>('/api/projects', {
    method: 'GET',
    ...(options || {}),
  });
}
/**
 * 獲取所有依赖
 * @constructor
 */
export async  function getAllArtifactList(options?: { [key: string]: any }){
  return request<API.Result<API.Artifact[]>>('/api/artifacts', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
