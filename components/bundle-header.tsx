"use client";

import { DeleteIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { handleDeleteBundle } from "@/app/actions";
import { Bundle } from "@prisma/client";

const BundleHeader = ({ bundle }: { bundle?: Bundle }) => {
  const router = useRouter();
  const toast = useToast();
  const handleEdit = () => {
    router.push(`/bundle/edit/${bundle?.id}`);
  };
  const handleDelete = async () => {
    const res = await handleDeleteBundle(bundle?.id!);
    if (res.status === 200) {
      toast({ title: res.message, status: "success" });
      router.push("/");
    } else toast({ title: res.message, status: "error" });
  };
  return (
    <Box>
      <Flex justifyContent="space-between" wrap="wrap" gap={2}>
        <Heading size="xl">{bundle?.name}</Heading>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="options"
            icon={<SettingsIcon />}
          />
          <MenuList>
            <MenuItem icon={<EditIcon />} onClick={handleEdit}>
              Izmeni
            </MenuItem>
            <MenuItem icon={<DeleteIcon />} color="red" onClick={handleDelete}>
              Obrisi
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default BundleHeader;
