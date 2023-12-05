"use client";

import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

const TableHeader = () => {
  const router = useRouter();
  const handleAddClick = () => {
    router.push("/bundle/new");
  };
  return (
    <Flex justifyContent="end" my={4}>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="blue"
        onClick={handleAddClick}
      >
        Dodaj turu
      </Button>
    </Flex>
  );
};

export default TableHeader;
