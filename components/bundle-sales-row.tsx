"use client";

import { TableRowProps, Tr } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

type RowProps = TableRowProps & {
  bundleId: string;
  saleId: string;
};

const BundleSalesRow = ({ children, bundleId, saleId }: RowProps) => {
  const router = useRouter();

  const handleRowClick = (bundleId: string, saleId: string) => {
    router.push(`/bundle/${bundleId}/sale/${saleId}/edit`);
  };
  return (
    <Tr
      className="cursor-pointer hover:bg-gray-200 transition-colors"
      onClick={() => handleRowClick(bundleId!, saleId!)}
    >
      {children}
    </Tr>
  );
};

export default BundleSalesRow;
