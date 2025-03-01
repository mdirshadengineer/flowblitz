export default async function WorkflowVersionPage(props: {
  params: Promise<{ version_id: string }>;
}) {
  const params = await props.params;
  return (
    <div>
      <h1>Workflow Versions</h1>
      <p>Version ID: {params.version_id}</p>
      {/* Render workflow history details */}
    </div>
  );
}
