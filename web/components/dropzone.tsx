import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import React, { ChangeEvent, useRef } from 'react';

interface DropzoneProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
  > {
  classNameWrapper?: string;
  className?: string;
  dropMessage: string;
  handleOnDrop: (acceptedFiles: FileList | null) => void;
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  (
    { className, classNameWrapper, dropMessage, handleOnDrop, ...props },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleOnDrop(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;

      // Extract the accepted file types from props.accept
      const acceptedTypes = props.accept
        ? props.accept.split(',').map((type) => type.trim())
        : [];

      // Filter the files based on accepted types
      const filteredFiles =
        acceptedTypes.length > 0
          ? Array.from(files).filter((file) =>
              acceptedTypes.some((type) => {
                // Handle wildcard types (e.g., image/*)
                if (type.endsWith('/*')) {
                  const baseType = type.slice(0, -1); // Remove the "/*"
                  return file.type.startsWith(baseType);
                }
                return file.type === type;
              })
            )
          : Array.from(files);

      // Convert filteredFiles array back to FileList
      const dataTransfer = new DataTransfer();
      filteredFiles.forEach((file) => dataTransfer.items.add(file));
      const newFileList = dataTransfer.files;

      if (inputRef.current) {
        inputRef.current.files = newFileList;
        handleOnDrop(newFileList);
      }
    };

    // Function to simulate a click on the file input element
    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };
    return (
      <Card
        ref={ref}
        className={cn(
          `border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50`,
          classNameWrapper
        )}
      >
        <CardContent
          className="flex flex-col items-center justify-center space-y-2 px-2 py-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="rounded-full border border-dashed p-2">
            <Upload
              className="size-7 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <div className="flex items-center justify-center text-muted-foreground">
            <span className="text-center font-medium">{dropMessage}</span>
            <Input
              {...props}
              value={undefined}
              ref={inputRef}
              type="file"
              className={cn('hidden', className)}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleOnDrop(e.target.files)
              }
            />
          </div>
        </CardContent>
      </Card>
    );
  }
);

export { Dropzone };
