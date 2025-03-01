import { WorkflowEditor } from 'app/(automation)/workflows/editor/[workflow_id]/_components/workflow-editor';
import TaskMenu from './_components/task-menu';

export default async function WorkflowPage(props: {
  params: Promise<{ workflow_id: string }>;
}) {
  const params = await props.params;
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* TODO: Topbar */}
      <section className="flex justify-center w-full h-full overflow-auto">
        <TaskMenu />
        <main className="w-svw h-svh">
          <WorkflowEditor />
        </main>
      </section>
    </div>
  );
}
