import { ArtifactSearchDialog } from '@/components/artifact-search';
import { Navbar, RedirectingNavItem } from '@/components/navbar';
import { BookOpenText, Coffee } from 'lucide-react';

export default function Home() {
  return (
    <main
      className={
        'flex flex-col min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'
      }>
      <Navbar>
        <RedirectingNavItem
          className={'font-extrabold flex items-center gap-x-2'}
          href='/'>
          <BookOpenText />
          Daki Docs
        </RedirectingNavItem>
        <RedirectingNavItem className={'text-foreground/80'} href='/about'>
          About
        </RedirectingNavItem>
        <RedirectingNavItem className={'text-foreground/80'} href='/docs'>
          Documentation
        </RedirectingNavItem>
        <RedirectingNavItem className={'text-foreground/80'} href='/browse'>
          Browse
        </RedirectingNavItem>
        <div className='ml-auto'>
          <button
            className={
              'inline-flex justify-center hover:bg-muted transition-colors items-center md:w-40 lg:w-56 xl:w-64 gap-x-2 px-2 py-2 rounded-md bg-muted/50 text-sm text-muted-foreground border border-input'
            }>
            <span className={'hidden lg:inline-flex'}>Find Javadocs...</span>
            <kbd className='pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
              <span className='text-xs'>⌘</span>K
            </kbd>
          </button>
        </div>
      </Navbar>
      <div className={'flex-1 flex items-center justify-center'}>
        <div
          className={
            'flex gap-y-4 flex-col -translate-y-4 items-center justify-center h-full'
          }>
          <h1
            className={
              'text-5xl flex gap-x-2 items-center -translate-x-16 font-extrabold'
            }>
            Javadocs
            <Coffee size={48} />
          </h1>
          <h2 className={'text-3xl translate-x-16 font-extrabold'}>
            But overhauled?
          </h2>
          <h3 className='text-muted-foreground'>
            Modern and clean way to browse Javadocs from any artifact!
          </h3>
          <button
            className={
              'flex justify-center hover:bg-muted transition-colors items-center gap-x-2 px-4 py-2 rounded-md bg-muted/50 text-sm text-muted-foreground border border-input'
            }>
            <span className={'flex'}>Search for Maven Central Artifact...</span>
            <kbd className='pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
              <span className='text-xs'>⌘</span>K
            </kbd>
          </button>
        </div>
      </div>
      <ArtifactSearchDialog />
    </main>
  );
}
