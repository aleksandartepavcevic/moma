import { getSale } from "@/app/actions";
import EditSaleForm from "@/components/edit-sale-form";
import React from "react";

export type SaleEdit = {
  name: string;
  revenue: number;
};

const SaleEdit = async ({
  params,
}: {
  params: { bundleId: string; saleId: string };
}) => {
  const res = await getSale(Number(params?.saleId));

  return (
    <EditSaleForm
      defaultValues={{ name: res?.data?.name!, revenue: res?.data?.revenue! }}
    />
  );
};

export default SaleEdit;
