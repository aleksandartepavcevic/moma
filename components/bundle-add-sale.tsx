"use client";

import { handleAddBundleSale } from "@/app/actions";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Bundle } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";

export type UpdateBundle = {
  name: string;
  amount: number;
};

const BundleAddSale = ({ bundle }: { bundle: Bundle }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateBundle>();
  const toast = useToast();

  async function onSubmit(values: UpdateBundle) {
    const res = await handleAddBundleSale({
      name: values.name,
      amount: Number(values.amount),
      id: bundle.id,
    });
    if (res.status === 200) {
      toast({ title: res.message, status: "success" });
      reset();
    } else toast({ title: res.message, status: "error" });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Heading size="md" mb={2}>
          Dodaj prodaju
        </Heading>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Naziv</FormLabel>
          <Input
            id="name"
            type="text"
            {...register("name", {
              required: "Obavezno polje",
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.amount}>
          <FormLabel htmlFor="amount">Iznos</FormLabel>
          <Input
            id="amount"
            type="number"
            {...register("amount", {
              required: "Obavezno polje",
              valueAsNumber: true,
            })}
          />
          <FormErrorMessage>
            {errors.amount && errors.amount.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="blue"
          isLoading={isSubmitting}
          type="submit"
        >
          Dodaj
        </Button>
      </Stack>
    </form>
  );
};

export default BundleAddSale;
