import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FileProps {
  file: File;
}
export default function File({ file }: FileProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Metadata</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="font-medium text-gray-500">Name</div>
            <div className="mt-1 text-gray-900 break-words">{file.name}</div>
          </div>
          <div>
            <div className="font-medium text-gray-500">Size</div>
            <div className="mt-1 text-gray-900">
              {formatFileSize(file.size)}
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-500">Type</div>
            <div className="mt-1 text-gray-900 break-words">
              {file.type || 'Unknown'}
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-500">Last Modified</div>
            <div className="mt-1 text-gray-900">
              {formatDate(new Date(file.lastModified))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
