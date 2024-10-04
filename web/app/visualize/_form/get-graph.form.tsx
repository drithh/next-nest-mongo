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
import { GetGraphTelecomSchema, getGraphTelecomSchema } from './form-schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Dropzone } from '@/components/dropzone';
import FileMetadata from '../_components/file-metadata';
import {
  ErrorResponseDto,
  GetAvailabilityResponseDto,
  InsertWithDuplicationResponseDto,
  SuccessInsertResponseDto,
  ValidationErrorResponseDto,
} from '@/generated/schemas';
import { useTelecomsControllerGetAvailabilities } from '@/generated/default/default';
import { DatePicker } from '@/components/date-picker';

interface GetGraphTelecomProps {}

const TOAST_MESSAGES = {
  error: {
    title: 'Failed to insert raw data',
  },
  loading: {
    title: 'Inserting raw data',
    description: 'Mohon tunggu',
  },
};

interface GetGraphTelecomFormProps {
  setGraphData: React.Dispatch<
    React.SetStateAction<GetAvailabilityResponseDto[]>
  >;
}

export default function GetGraphTelecomForm({
  setGraphData,
}: GetGraphTelecomFormProps) {
  type FormSchema = GetGraphTelecomSchema;

  const form = useForm<FormSchema>({
    resolver: zodResolver(getGraphTelecomSchema),
    defaultValues: {
      enodebId: '1041003',
      cellId: '22',
      startDate: new Date('2022-07-20').toISOString(),
      endDate: new Date('2022-07-24').toISOString(),
    },
  });

  const { data, refetch, error, isFetching } =
    useTelecomsControllerGetAvailabilities(
      {
        cellId: form.getValues('cellId'),
        endDate: form.getValues('endDate') || new Date().toISOString(),
        startDate: form.getValues('startDate') || new Date().toISOString(),
        enodebId: form.getValues('enodebId'),
      },
      {
        query: {
          enabled: false,
        },
      }
    );

  if (isFetching) {
    toast.loading(TOAST_MESSAGES.loading.title, {
      description: TOAST_MESSAGES.loading.description,
    });
  }

  useEffect(() => {
    if (data) {
      setGraphData(data.data);
      toast.dismiss();
    }
  }, [data]);

  if (error) {
    toast.error(TOAST_MESSAGES.error.title, {
      description: error.message,
    });
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.handleSubmit(() => {
      toast.loading(TOAST_MESSAGES.loading.title, {
        description: TOAST_MESSAGES.loading.description,
      });
      refetch();
    })(event);
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="grid gap-4 py-4 w-full">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          ref={formRef}
          onSubmit={onFormSubmit}
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="enodebId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <>
                      <FormLabel>Enodeb ID*</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enodeb ID"
                        type="number"
                        className="w-full"
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cellId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <>
                      <FormLabel>Cell ID*</FormLabel>
                      <Input
                        {...field}
                        placeholder="Cell ID"
                        type="number"
                        className="w-full"
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <>
                      <FormLabel>Start Date*</FormLabel>
                      <DatePicker
                        selected={new Date(field.value ?? Date.now())}
                        setSelected={field.onChange}
                        disabled={(date) => {
                          const endDate = form.getValues('endDate');
                          return !endDate || date > new Date(endDate);
                        }}
                        className="w-full"
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <>
                      <FormLabel>End Date*</FormLabel>
                      <DatePicker
                        selected={new Date(field.value ?? Date.now())}
                        setSelected={field.onChange}
                        disabled={(date) => {
                          const startDate = form.getValues('startDate');
                          return !startDate || date < new Date(startDate);
                        }}
                        className="w-full"
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full h-12 font-semibold text-lg">
            Visualize
          </Button>
        </form>
      </Form>
    </div>
  );
}
