"use client";

import { handleUpdateSale } from "@/app/actions";
import { SaleEdit } from "@/app/bundle/[bundleId]/sale/[saleId]/edit/page";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export type UpdateSale = {
  name: string;
  revenue: number;
};

const EditSaleForm = ({ defaultValues }: { defaultValues: SaleEdit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SaleEdit>({ defaultValues });
  const toast = useToast();
  const router = useRouter();
  const params = useParams<{ bundleId: string; saleId: string }>();

  async function onSubmit(values: SaleEdit) {
    const res = await handleUpdateSale({
      ...values,
      bundleId: Number(params?.bundleId),
      saleId: Number(params?.saleId),
    });
    if (res.status === 200) {
      toast({ title: res.message, status: "success" });
      router.push("/");
    } else toast({ title: res.message, status: "error" });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Heading size="xl" mb={4}>
          Izmeni
        </Heading>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Naziv prodaje</FormLabel>
          <Input
            id="name"
            {...register("name", {
              required: "Obavezno polje",
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.revenue}>
          <FormLabel htmlFor="revenue">Vrednost (RSD)</FormLabel>
          <Input
            id="revenue"
            type="number"
            {...register("revenue", {
              required: "Obavezno polje",
              valueAsNumber: true,
            })}
          />
          <FormErrorMessage>
            {errors.revenue && errors.revenue.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="blue"
          isLoading={isSubmitting}
          type="submit"
        >
          Izmeni
        </Button>
      </Stack>
    </form>
  );
};

export default EditSaleForm;
