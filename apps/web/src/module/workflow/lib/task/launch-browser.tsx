import { TaskParamType, TaskType } from 'src/module/workflow/types/task-type';
import { GlobeIcon, LucideProps } from 'lucide-react';

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: 'Launch Browser',
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-cyan-600" {...props} />
  ),
  isEntryPoint: true,
  inputs: [
    {
      name: 'Website Url',
      type: TaskParamType.STRING,
      helperText: 'eg: https://www.google.com',
      required: true,
      hideHandle: true
    }
  ],
  outputs: [{ name: 'Web page', type: TaskParamType.STRING }]
};
