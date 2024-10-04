import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="max-w-screen-2xl mx-auto w-full flex px-8 justify-between ">
      <Button
        variant={'link'}
        asChild
        className="w-64 font-medium text-xl h-16"
      >
        <Link href="/upload">Start uploading</Link>
      </Button>
      <Button
        variant={'link'}
        asChild
        className="w-64 font-medium text-xl h-16"
      >
        <Link href="/visualize">Visualize data</Link>
      </Button>
    </nav>
  );
}
