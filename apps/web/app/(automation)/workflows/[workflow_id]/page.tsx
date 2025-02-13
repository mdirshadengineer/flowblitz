export default async function WorkflowPage(props: {
  params: Promise<{ workflow_id: string }>;
}) {
  const params = await props.params;
  return (
    <div>
      <h1>Workflow</h1>
      <p>Workflow ID: {params.workflow_id}</p>
      {/* Render workflow execution details */}
    </div>
  );
}
