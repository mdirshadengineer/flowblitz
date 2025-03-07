'use client';

import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Pencil } from 'lucide-react';
import {
  ElementsType,
  FormElement,
  FormElementInstance
} from 'src/form/FormElements';

const type: ElementsType = 'TextField';

const extraAttributes = {
  label: 'Text Field',
  helperText: 'Helper text',
  required: true,
  placeHolder: 'Value here...'
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAttributes
  }),
  designerBtnElement: {
    icon: Pencil,
    label: 'Text field'
  },
  designerComponent: DesignerComponent,
  formComponent: () => <p>Form Component</p>,
  propertiesComponent: () => <p>Properties Component</p>
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        <span className="text-foreground">{label} </span>
        <span className="text-red-500">{required && '*'}</span>
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}
