"use client";

import { TableRowProps, Tr } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

type RowProps = TableRowProps;

const TableRow = ({ children, id }: RowProps) => {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/bundle/${id}`);
  };
  return (
    <Tr
      className="cursor-pointer hover:bg-gray-200 transition-colors"
      onClick={() => handleRowClick(id!)}
    >
      {children}
    </Tr>
  );
};

export default TableRow;
