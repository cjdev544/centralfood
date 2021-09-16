import Head from "next/head";
import DefaultLoader from "../components/DefaultLoader";
import PopularePlates from "../components/PopularPlates";
import PromotionPlates from "../components/PromotionPlates";
import Seo from "../components/Seo";
import { useData } from "../hooks/useData";

export default function Home() {
  const { data } = useData();

  if (!data) return <DefaultLoader />;

  return (
    <>
      <Seo title="Inicio" />
      <main>
        {data?.promotionPlates && <PromotionPlates data={data} />}
        {data?.popularPlates && <PopularePlates data={data} />}
      </main>
    </>
  );
}
