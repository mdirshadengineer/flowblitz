import { TaskParamType, TaskType } from 'src/module/workflow/types/task-type';
import { CodeIcon, LucideProps } from 'lucide-react';

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: 'Get html from page',
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-cyan-600" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
      required: true
    }
  ],
  outputs: [
    { name: 'HTML', type: TaskParamType.STRING },
    { name: 'Web page', type: TaskParamType.BROWSER_INSTANCE }
  ]
};
