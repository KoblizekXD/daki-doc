'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Coffee } from "lucide-react";
import { usePathname, useRouter } from "next/navigation"

export default function Page({
  versions,
}: {
  versions: { latest: string, versions: string[] } | undefined
}) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <main className="p-16 items-center gap-y-6 flex flex-col text-center w-full">
      <h1 className={'text-5xl font-semibold'}>Welcome!</h1>
      <p className={'text-2xl font-semibold'}>
        This is only a placeholder page, please select your desired version on the top left!
      </p>
      <Select onValueChange={(value) => {
        router.push(`${pathName}/${value}`)
      }}>
        <SelectTrigger className="w-96">
          <SelectValue placeholder='Versions...' />
        </SelectTrigger>
        <SelectContent>
          {versions?.versions.map((version, i) => (
            <SelectItem key={i} value={version}>{version}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex-1 flex items-center justify-center">
        <Coffee size={512} stroke="hsl(var(--muted))" className='brightness-50' />
      </div>
    </main>
  )
}