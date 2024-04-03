import { db } from "@/app/db";
import BundleAddSale from "@/components/bundle-add-sale";
import BundleHeader from "@/components/bundle-header";
import BundleSales from "@/components/bundle-sales";
import {
  Box,
  Flex,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { bundle as Bundle, sale as Sale } from "@prisma/client";
import React from "react";

const BundlePage = async ({ params }: { params: { id: string } }) => {
  const bundle = await db.bundle.findUnique({
    where: { id: Number(params.id) },
    include: {
      sales: {
        orderBy: {
          createdat: "desc",
        },
      },
    },
  });

  console.log(bundle);

  const profit = Number(bundle?.revenue) - Number(bundle?.paid);
  return (
    <Box>
      <BundleHeader bundle={bundle as Bundle} />
      <Flex my={6}>
        <Stat>
          <StatLabel>Ulozeno</StatLabel>
          <StatNumber>{bundle?.paid} RSD</StatNumber>
          <StatHelpText>{bundle?.createdat.toLocaleDateString()}</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Stanje</StatLabel>
          <StatNumber color={profit < 0 ? "red" : "green"}>
            {profit} RSD
          </StatNumber>
        </Stat>
      </Flex>
      <BundleAddSale bundle={bundle as Bundle} />
      <BundleSales sales={bundle?.sales as Sale[]} />
    </Box>
  );
};

export default BundlePage;
