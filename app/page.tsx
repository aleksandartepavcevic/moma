import BundleList from "@/components/table";
import { db } from "./db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const bundles = await db.bundle.findMany({
    orderBy: {
      createdat: "desc",
    },
  });

  return (
    <h1
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      Sa mnom si nasao da se zajebavas
    </h1>
  );

  // return <BundleList bundles={bundles} />;
}
