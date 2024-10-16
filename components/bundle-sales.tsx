import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { sale as Sale } from "@prisma/client";
import BundleSalesRow from "./bundle-sales-row";

const BundleSales = ({ sales }: { sales: Sale[] }) => {
  return (
    <Box mt={12}>
      <Heading size="md" mb={4}>
        Istorija prodaja
      </Heading>
      <TableContainer maxHeight="300px" overflowY="auto">
        <Table variant="simple">
          <Thead position="sticky" top={0} backgroundColor="white">
            <Tr>
              <Th>Naziv</Th>
              <Th>Vrednost (RSD)</Th>
              <Th>Datum</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sales?.map((sale) => {
              return (
                <BundleSalesRow
                  bundleId={String(sale.bundleid)}
                  saleId={String(sale.id)}
                  key={sale.id}
                >
                  <Td>{sale.name}</Td>
                  <Td>{sale.revenue}</Td>
                  <Td>{sale.createdat.toLocaleDateString()}</Td>
                </BundleSalesRow>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BundleSales;
