import { TaskParamType } from 'src/module/workflow/types/task-type';

export const ColorForHandle: Record<TaskParamType, string> = {
  [TaskParamType.BROWSER_INSTANCE]: '!bg-sky-400',
  STRING: '!bg-amber-400'
};
