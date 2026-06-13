/**
 * 应用常量定义
 */

// HTTP 状态码常量
export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// 响应代码常量
export const RESPONSE_CODE = {
  SUCCESS: 0,
  ERROR: -1,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

// 用户角色常量
export const USER_ROLE = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

// 队列名称常量
export const QUEUE_NAME = {
  EMAIL: 'email',
  SMS: 'sms',
  NOTIFICATION: 'notification',
};

// 消息类型常量
export const MESSAGE_TYPE = {
  SYSTEM: 'system',
  NOTICE: 'notice',
  ALERT: 'alert',
};

// 任务状态常量
export const TASK_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  SUCCESS: 'success',
  FAILED: 'failed',
};

// 会话相关常量
export const SESSION_KEYS = {
  USER_ID: 'userId',
  USERNAME: 'username',
  ROLE: 'role',
  LOGIN_TIME: 'loginTime',
};

// 错误消息常量
export const ERROR_MESSAGES = {
  UNAUTHORIZED: '未授权访问',
  FORBIDDEN: '权限不足',
  USER_NOT_FOUND: '用户不存在',
  INVALID_CREDENTIALS: '用户名或密码错误',
  ALREADY_EXISTS: '已存在',
  VALIDATION_ERROR: '参数验证失败',
};

// 响应消息常量
export const RESPONSE_MESSAGES = {
  SUCCESS: '操作成功',
  ERROR: '操作失败',
  LOGIN_SUCCESS: '登录成功',
  LOGIN_FAILED: '登录失败',
  REGISTER_SUCCESS: '注册成功',
  REGISTER_FAILED: '注册失败',
  UNAUTHORIZED: '未授权访问',
  FORBIDDEN: '权限不足',
};