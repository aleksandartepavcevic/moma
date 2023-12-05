"use client";

import { handleAddNewBundle } from "@/app/actions";
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
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export type NewBundle = {
  name: string;
  paid: number;
};

const BundleNewPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<NewBundle>();
  const toast = useToast();
  const router = useRouter();

  async function onSubmit(values: NewBundle) {
    const res = await handleAddNewBundle(values);
    if (res.status === 200) {
      toast({ title: res.message, status: "success" });
      router.push("/");
    } else toast({ title: res.message, status: "error" });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Heading size="xl" mb={4}>
          Nova tura
        </Heading>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Ime ture</FormLabel>
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
        <FormControl isInvalid={!!errors.paid}>
          <FormLabel htmlFor="paid">Ulozeno (RSD)</FormLabel>
          <Input
            id="paid"
            type="number"
            {...register("paid", {
              required: "Obavezno polje",
              valueAsNumber: true,
            })}
          />
          <FormErrorMessage>
            {errors.paid && errors.paid.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="blue"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default BundleNewPage;
