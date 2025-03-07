import { Button } from 'components/ui/button';
import { CodeIcon } from 'lucide-react';
import React from 'react';

function PreviewDialogBtn() {
  return (
    <Button variant={'outline'} className="gap-2">
      <CodeIcon className="w-6 h-6" />
      Preview
    </Button>
  );
}

export default PreviewDialogBtn;
