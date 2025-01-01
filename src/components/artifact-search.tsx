"use client";

import * as React from "react";
import {
  Archive,
  Calculator,
  Calendar,
  CreditCard,
  Loader2Icon,
  Package,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { ArtifactPreviewResults, findPreview } from "@/lib/central-util";

export function ArtifactSearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [debouncedValue, setDebouncedValue] = React.useState("");
  const [results, setResults] = React.useState<
    ArtifactPreviewResults | undefined
  >(undefined);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  React.useEffect(() => {
    async function search() {
      setLoading(true);
      setResults(
        await (await fetch(`/api/maven?query=${debouncedValue}`)).json()
      );
      setLoading(false);
    }
    if (debouncedValue !== "") search();
    else setResults(undefined);
  }, [debouncedValue]);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setResults(undefined);
      setLoading(false);
    }
  }, [open]);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          onValueChange={(value) => {
            setQuery(value);
          }}
          placeholder="Find global artifacts..."
        />
        <CommandList>
          <CommandEmpty>Nothing found</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {loading ? (
              <CommandItem className="text-center">
                <Loader2Icon className="animate-spin" />
                Loading...
              </CommandItem>
            ) : !results || results?.total === 0 ? (
              <>
                <CommandItem>
                  <Package />
                  <span>Guava</span>
                  <span className="ml-auto text-muted-foreground">
                    com.google.guava:guava:33.4.0-jre
                  </span>
                </CommandItem>
                <CommandItem>
                  <Package />
                  <span>SLF4J API Module</span>
                  <span className="ml-auto text-muted-foreground">
                    org.slf4j:slf4j-api:2.1.0-alpha1
                  </span>
                </CommandItem>
              </>
            ) : (
              results?.results.map((result, index) => (
                <CommandItem className={'cursor-pointer'} key={index}>
                  <Package />
                  <span>{result.id}</span>
                  <span className="ml-auto text-muted-foreground">
                    {result.latestVersion}
                    <span> at </span> {result.repoId}
                  </span>
                </CommandItem>
              ))
            )}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Archive />
              <span>Edit Repositories</span>
              <CommandShortcut>⌘W</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
