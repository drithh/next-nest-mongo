'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DatePickerProps = CalendarProps & {
  selected: Date;
  setSelected: (date: Date) => void;
  onDateChange?: (value: Date) => void;
};

export function DatePicker({
  selected: date,
  setSelected: setDate,
  onDateChange,
  ...props
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            props.className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          {...props}
          captionLayout="dropdown-buttons"
          fromYear={1970}
          toYear={2025}
          defaultMonth={date}
          mode="single"
          selected={date}
          onSelect={(date) => {
            if (date) {
              setDate(date);
              if (onDateChange) {
                onDateChange(date);
              }
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
