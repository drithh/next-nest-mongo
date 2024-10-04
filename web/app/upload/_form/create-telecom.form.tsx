'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CreateTelecomSchema, createTelecomSchema } from './form-schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Dropzone } from '@/components/dropzone';
import { useTelecomsControllerCreate } from '@/generated/default/default';
import FileMetadata from '../_components/file-metadata';
import {
  ErrorResponseDto,
  InsertWithDuplicationResponseDto,
  SuccessInsertResponseDto,
  ValidationErrorResponseDto,
} from '@/generated/schemas';

interface CreateTelecomProps {}

const TOAST_MESSAGES = {
  error: {
    title: 'Failed to insert raw data',
  },
  loading: {
    title: 'Inserting raw data',
    description: 'Mohon tunggu',
  },
  success: {},
};

export default function CreateTelecomForm({}: CreateTelecomProps) {
  const router = useRouter();
  type FormSchema = CreateTelecomSchema;

  const form = useForm<FormSchema>({
    resolver: zodResolver(createTelecomSchema),
  });

  const createTelecomMutation = useTelecomsControllerCreate();

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.handleSubmit(() => {
      toast.loading(TOAST_MESSAGES.loading.title, {
        description: TOAST_MESSAGES.loading.description,
      });
      const file = form.getValues('file');
      if (!file) {
        return;
      }
      createTelecomMutation.mutate(
        {
          data: {
            raw_data: file,
          },
        },
        {
          onSuccess: (data) => {
            toast.dismiss();
            function isInsertWithDuplicationResponse(
              response:
                | InsertWithDuplicationResponseDto
                | SuccessInsertResponseDto
            ): response is InsertWithDuplicationResponseDto {
              return (
                (response as InsertWithDuplicationResponseDto)
                  .totalDuplicated !== undefined
              );
            }

            const description = isInsertWithDuplicationResponse(data.data)
              ? `Total inserted: ${data.data.totalInserted}, Total duplicated: ${data.data.totalDuplicated}`
              : `Total inserted: ${data.data.totalInserted}`;

            toast.success(data.data.message, {
              description,
            });

            form.reset();
          },
          onError: (error) => {
            function isValidationError(
              error: ErrorResponseDto | ValidationErrorResponseDto | undefined
            ): error is ValidationErrorResponseDto {
              return error?.statusCode === 422;
            }
            const errorResponse = error.response?.data;

            const errorDescription = isValidationError(errorResponse) ? (
              errorResponse?.errors ? (
                <ul>
                  {errorResponse.errors.map((error) => (
                    <li key={error.property}>
                      {error.property}:{' '}
                      {Object.values(error.constraints).join(', ')}
                    </li>
                  ))}
                </ul>
              ) : (
                errorResponse.message
              )
            ) : (
              errorResponse?.message ?? error.message
            );

            toast.dismiss();
            toast.error(TOAST_MESSAGES.error.title, {
              description: errorDescription,
            });
            form.reset();
          },
        }
      );
    })(event);
  };

  function handleOnDrop(acceptedFiles: FileList | null) {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      form.setError('file', { message: 'File tidak valid' });
      return;
    }
    const file = acceptedFiles[0];

    if (!file) {
      form.setError('file', { message: 'File tidak valid' });
      return;
    }

    form.setValue('file', file);
    form.clearErrors('file');
  }
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="grid gap-4 py-4 w-full">
      <Form {...form}>
        <form className="grid gap-4" ref={formRef} onSubmit={onFormSubmit}>
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <>
                    <FormLabel>Raw CSV File</FormLabel>
                    <div className="space-y-6">
                      <Dropzone
                        {...field}
                        accept=".csv"
                        dropMessage="Tarik dan lepas file di sini atau klik untuk memilih file"
                        handleOnDrop={handleOnDrop}
                      />
                    </div>
                    {field.value && field.value.size !== 0 && (
                      <FileMetadata file={field.value} />
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-12 font-semibold text-lg">
            Upload
          </Button>
        </form>
      </Form>
    </div>
  );
}
