import React from "react";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TableHeader from "./table-header";
import TableRow from "./table-row";

export type Bundle = {
  id: number;
  name: string;
  paid: number;
  revenue: number;
  createdAt: Date;
};

const BundleList = ({ bundles }: { bundles: Bundle[] }) => {
  return (
    <Box>
      <TableHeader />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Ime</Th>
              <Th>Ulozeno (RSD)</Th>
              <Th>Stanje (RSD)</Th>
              <Th>Datum</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bundles?.map((bundle) => {
              const profit = bundle.revenue - bundle.paid;

              return (
                <TableRow
                  key={`${bundle.id}-${bundle.name}`}
                  id={String(bundle.id)}
                >
                  <Td>{bundle.name}</Td>
                  <Td>{bundle.paid}</Td>
                  <Td color={profit < 0 ? "red" : "green"}>{profit}</Td>
                  <Td>{bundle.createdAt.toLocaleDateString()}</Td>
                </TableRow>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BundleList;
