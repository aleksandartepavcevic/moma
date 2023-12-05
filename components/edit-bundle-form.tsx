"use client";

import { handleAddNewBundle, handleUpdateBundle } from "@/app/actions";
import { EditBundle } from "@/app/bundle/edit/[id]/page";
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

const BundleEditForm = ({ defaultValues }: { defaultValues: EditBundle }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<EditBundle>({ defaultValues });
  const toast = useToast();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  async function onSubmit(values: EditBundle) {
    const res = await handleUpdateBundle({ ...values, id: Number(params?.id) });
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

export default BundleEditForm;
