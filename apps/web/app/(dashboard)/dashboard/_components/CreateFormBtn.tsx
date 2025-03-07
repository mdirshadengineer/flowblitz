'use client';

import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'components/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from 'components/ui/form';
import { Input } from 'components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from 'components/ui/textarea';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LoadingSpinner } from 'src/shared/loader/spinner';
import { formSchema, type formSchemaType } from 'src/form/schema/form';
import { CreateForm } from 'actions/form';
import { useRouter } from 'next/navigation';
import { FilePlus } from 'lucide-react';

function CreateFormBtn() {
  const router = useRouter();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const { register, handleSubmit } = form;
  const onSubmit = async (data: formSchemaType) => {
    try {
      console.log(data);
      const formId = await CreateForm(data);
      toast('Form created successfully', {
        description: 'You can now start collecting responses',
        className: 'bg-green-500 text-white'
      });
      console.log('formId', formId);
      router.push(`/builder/${formId}`);
    } catch (error) {
      console.log(error);
      toast('Error', {
        description: 'Something went wrong, please try again later',
        className: 'bg-red-500 text-white',
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo')
        }
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="group border border-primary/20 h-[190px] bg-background items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <FilePlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Create new form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          {/* <Form {...form}> */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <DialogFooter>
            <Button
              disabled={form.formState.isSubmitting}
              className="w-full mt-4"
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              {!form.formState.isSubmitting && <span>Save</span>}
              {form.formState.isSubmitting && <LoadingSpinner />}
            </Button>
          </DialogFooter>
          {/* </Form> */}
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormBtn;
