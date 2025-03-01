export default async function WorkflowExecutionPage(props: {
  params: Promise<{ execution_id: string }>;
}) {
  const params = await props.params;
  return (
    <div>
      <h1>Workflow Exectuion</h1>
      <p>Execution ID: {params.execution_id}</p>
      {/* Render workflow execution details */}
    </div>
  );
}
