import BundleList from "@/components/table";
import { db } from "./db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const bundles = await db.bundle.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <BundleList bundles={bundles} />;
}
