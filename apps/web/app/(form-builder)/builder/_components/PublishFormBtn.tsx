import { Button } from 'components/ui/button';
import { Rocket } from 'lucide-react';
import React from 'react';

function PublishFormBtn() {
  return (
    <Button
      variant={'outline'}
      className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-indigo-900"
    >
      <Rocket className="w-6 h-6" /> Publish
    </Button>
  );
}

export default PublishFormBtn;
