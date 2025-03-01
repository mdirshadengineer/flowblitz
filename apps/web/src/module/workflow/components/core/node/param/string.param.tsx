import { memo, useId, useRef } from 'react';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { ParamProps } from 'src/module/workflow/types/app-node';

const StringParam = memo(function StringParam({
  param,
  value,
  updateNodeParamValue
}: ParamProps) {
  const internalValueRef = useRef(value ?? ''); // Using useRef instead of useState
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    internalValueRef.current = e.target.value;
    // console.log('@VALUE', internalValueRef.current); // Logs value but does not trigger re-renders
  };

  const handleBlur = () => {
    updateNodeParamValue(internalValueRef.current);
  };

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Input
        id={id}
        name={param.name}
        className="text-xs ring-1 ring-zinc-950 dark:ring-zinc-600 bg-zince-50 dark:bg-zinc-950"
        defaultValue={internalValueRef.current} // Use defaultValue instead of controlled value
        placeholder="Enter value here"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
});

export default StringParam;
