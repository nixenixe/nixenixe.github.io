"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider, type ThemeProviderProps } from "next-themes";

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider
        attribute="class"
        forcedTheme="light"
        defaultTheme="light"
        disableTransitionOnChange
        enableSystem={false}
        {...props}
      />
    </ChakraProvider>
  );
}
