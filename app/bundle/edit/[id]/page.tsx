import { getBundle } from "@/app/actions";
import BundleEditForm from "@/components/edit-bundle-form";
import React from "react";

export type EditBundle = {
  name: string;
  paid: number;
};

const BundleEditPage = async ({ params }: { params: { id: string } }) => {
  const res = await getBundle(Number(params?.id));

  return (
    <BundleEditForm
      defaultValues={{ name: res.data?.name!, paid: res?.data?.paid! }}
    />
  );
};

export default BundleEditPage;
