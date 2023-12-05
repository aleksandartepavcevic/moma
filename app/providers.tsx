"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
