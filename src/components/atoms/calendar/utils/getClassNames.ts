import { cn } from "@/utils";

type ClassNames = {
  [Key: string]: string;
}

export function getClassNames<T extends ClassNames>(defaultClassNames: T, props: { [Key in keyof T]?: string }): T {
  return {
    ...defaultClassNames, ...Object.entries(props).reduce((acc, [key, value]) => {
      if (!value) {
        return acc;
      }

      acc[key] = cn(defaultClassNames[key], value);

      return acc;
    }, {} as ClassNames)
  };
}