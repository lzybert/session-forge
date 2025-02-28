'use client';

import { ChakraProvider, isValidSystem, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode.jsx';
import sessionForgeSystem from '@repo/themes';
import { ThemeProvider } from 'next-themes';

export function Provider(props) {
  if (isValidSystem(sessionForgeSystem)) {
    //console.log(sessionForgeSystem);
  }
  return (
    <ChakraProvider value={sessionForgeSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ColorModeProvider {...props} />
      </ThemeProvider>
    </ChakraProvider>
  );
}
