"use client";

import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Table,
  TableContainer,
  TableRowProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

type RowProps = TableRowProps;

const Row = ({ children, onClick }: RowProps) => {
  return (
    <Tr
      className="cursor-pointer hover:bg-gray-200 transition-colors"
      onClick={onClick}
    >
      {children}
    </Tr>
  );
};

export type Bundle = {
  id: number;
  name: string;
  paid: number;
  revenue: number;
  createdAt: Date;
};

const BundleList = ({ bundles }: { bundles: Bundle[] }) => {
  const router = useRouter();

  const handleAddClick = () => {
    router.push("/bundle/new");
  };
  const handleRowClick = (id: string) => {
    router.push(`/bundle/${id}`);
  };

  return (
    <Box>
      <Flex justifyContent="end" my={4}>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={handleAddClick}
        >
          Dodaj turu
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Ime</Th>
              <Th>Ulozeno (RSD)</Th>
              <Th>Profit (RSD)</Th>
              <Th>Datum</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bundles?.map((bundle) => {
              const profit = bundle.revenue - bundle.paid;

              return (
                <Row
                  key={`${bundle.id}-${bundle.name}`}
                  id={String(bundle.id)}
                  onClick={() => handleRowClick(String(bundle.id))}
                >
                  <Td>{bundle.name}</Td>
                  <Td>{bundle.paid}</Td>
                  <Td color={profit < 0 ? "red" : "green"}>{profit}</Td>
                  <Td>{bundle.createdAt.toLocaleDateString()}</Td>
                </Row>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BundleList;
