"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { ThemeProvider, type ThemeProviderProps } from "next-themes";

export function Provider(props: ThemeProviderProps) {
  const config = defineConfig({
    globalCss: {
      html: {
        colorPalette: "orange",
      },
    },
  });

  const system = createSystem(defaultConfig, config);

  return (
    <ChakraProvider value={system}>
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
