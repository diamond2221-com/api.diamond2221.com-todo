
export type TodoList = TodoItem[];
export interface TodoItem {
  addTime: string;
  addUser: number;
  desc: string;
  expirTime: string;
  id: number;
  name: string;
  upTime: string;
  status: TodoStatus
}

/**
 * 1 正常状态
 * 2 删除
 * 3 过期
 */
export type TodoStatus = 1 | 2 | 3
