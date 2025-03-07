'use client';

import { Form } from '@prisma/client';
import PreviewDialogBtn from './PreviewDialogBtn';
import SaveFormBtn from './SaveFormBtn';
import PublishFormBtn from './PublishFormBtn';
import React from 'react';
import FormBuilderEdiror from './Editor';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper';

function FormBuilder({ form }: { form: Form }) {
  return (
    <DndContext>
      <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Form:</span>
          {form.name}
        </h2>
        <div className="flex items-center gap-2">
          <PreviewDialogBtn />
          {!form.published && (
            <>
              <SaveFormBtn />
              <PublishFormBtn />
            </>
          )}
        </div>
      </nav>
      <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/rain.svg)] dark:bg-[url(/rain-dark.svg)]">
        <FormBuilderEdiror />
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
