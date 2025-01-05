import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CLASS_ICON =
  'https://intellij-icons.jetbrains.design/icons/AllIcons/expui/nodes/class_dark.svg';
export const PACKAGE_ICON =
  'https://intellij-icons.jetbrains.design/icons/AllIcons/expui/nodes/package_dark.svg';
export const INTERFACE_ICON =
  'https://intellij-icons.jetbrains.design/icons/AllIcons/expui/nodes/interface_dark.svg';
