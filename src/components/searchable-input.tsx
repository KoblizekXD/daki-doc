'use client';

import { useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SearchableInputProps {
  placeholder: string;
  onChange?: (value: string) => void;
  values: string[];
  className?: string;
}

export function ClassSearchableList({ placeholder, onChange, className, values }: SearchableInputProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [dataValues, setValues] = useState<string[]>(values);
  const path = usePathname();

  return (
    <div className={"flex flex-col items-center gap-y-2"}>
      <Input placeholder={placeholder} onChange={(text) => {
        setSearchValue(text.currentTarget.value);
        setValues(values.filter((value) => value.toLowerCase().includes(text.currentTarget.value)));
      }} />
      <ScrollArea className="h-[40rem] border border-muted w-[48rem] p-2 rounded">
        <div className="gap-y-2 flex flex-col">
          {dataValues.map((value, i) => (
            <Link href={`${path}/${value.replaceAll('.', '/')}`} key={i} className={"flex flex-col gap-y-2"}>
              <span className="flex items-center gap-x-2">
                {value}
                <ExternalLink size={16} stroke="hsl(var(--muted-foreground))" />
              </span>
              <Separator />
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}