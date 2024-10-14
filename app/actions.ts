"use server";

import { revalidatePath } from "next/cache";
import { NewBundle } from "./bundle/new/page";
import { db } from "./db";
import { UpdateBundle } from "@/components/bundle-add-sale";
import { UpdateSale } from "@/components/edit-sale-form";

export async function handleAddNewBundle(data: NewBundle) {
  try {
    await db.bundle.create({
      data: {
        name: data.name,
        paid: data.paid,
      },
    });
    revalidatePath("/");
    return { message: "Nova tura uspesno kreirana.", status: 200 };
  } catch (err) {
    console.log(err);
    return { message: "Zovi Acketa :)", status: 500 };
  }
}

export async function handleUpdateBundle(data: NewBundle & { id: number }) {
  try {
    await db.bundle.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        paid: data.paid,
      },
    });
    revalidatePath("/");
    return { message: "Tura uspesno izmenjena.", status: 200 };
  } catch (err) {
    console.log(err);
    return { message: "Zovi Acketa :)", status: 500 };
  }
}

export async function handleAddBundleSale(data: UpdateBundle & { id: number }) {
  try {
    await db.bundle.update({
      where: {
        id: data.id,
      },
      data: {
        revenue: { increment: data.amount },
      },
    });
    await db.sale.create({
      data: {
        name: data.name,
        revenue: data.amount,
        bundle: {
          connect: { id: data.id },
        },
      },
    });
    revalidatePath(`/`);
    revalidatePath(`/bundle/${data.id}`);
    return { message: "Prodaja uspesno dodata.", status: 200 };
  } catch (err) {
    console.log(err);
    return { message: "Zovi Acketa :)", status: 500 };
  }
}

export async function handleDeleteBundle(id: number) {
  try {
    await db.sale.deleteMany({
      where: {
        bundleid: id,
      },
    });
    await db.bundle.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return { message: "Tura uspesno izbrisana.", status: 200 };
  } catch (err) {
    console.log(err);
    return { message: "Zovi Acketa :)", status: 500 };
  }
}

export async function getBundle(id: number) {
  try {
    const bundle = await db.bundle.findUnique({
      where: {
        id,
      },
    });
    return { data: bundle, status: 200 };
  } catch (err) {
    console.log(err);
    return { message: "Zovi Acketa :)", status: 500 };
  }
}

export async function getSale(id: number) {
  try {
    const sale = await db.sale.findUnique({
      where: {
        id,
      },
    });
    return { data: sale, status: 200 };
  } catch (err) {
    console.log(err);
    return { message: "Zovi Acketa :)", status: 500 };
  }
}

export async function handleUpdateSale(
  data: UpdateSale & { bundleId: number; saleId: number }
) {
  try {
    const updatedSale = await db.sale.update({
      where: {
        id: data.saleId,
      },
      data: {
        name: data.name,
        revenue: data.revenue,
      },
    });

    const bundleSales = await db.sale.findMany({
      where: {
        bundleid: updatedSale.bundleid,
      },
      select: {
        revenue: true,
      },
    });

    const newTotalRevenue = bundleSales.reduce(
      (acc, sale) => acc + sale.revenue,
      0
    );

    await db.bundle.update({
      where: {
        id: data.bundleId,
      },
      data: {
        revenue: newTotalRevenue,
      },
    });

    revalidatePath(`/`);
    revalidatePath(`/bundle/${data.bundleId}`);
    return { message: "Prodaja uspesno izmenjena.", status: 200 };
  } catch (err) {
    console.log(err);
    return { message: "Zovi Acketa :)", status: 500 };
  }
}
