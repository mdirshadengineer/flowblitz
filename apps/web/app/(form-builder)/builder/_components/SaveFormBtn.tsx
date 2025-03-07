import { Button } from 'components/ui/button';
import { Save } from 'lucide-react';
import React from 'react';

function SaveFormBtn() {
  return (
    <Button variant={'outline'} className="gap-2">
      <Save className="w-6 h-6" /> Save
    </Button>
  );
}

export default SaveFormBtn;
