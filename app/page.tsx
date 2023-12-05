import BundleList from "@/components/table";
import { db } from "./db";

export default async function Home() {
  const bundles = await db.bundle.findMany();

  return <BundleList bundles={bundles} />;
}