import Tracker from "@/components/Tracker";
import data from "../../data.json";
import { parseSourceTag } from "@/lib/source";
import type { WeighIn } from "@/lib/rolling";

type HomeProps = {
  searchParams: Promise<{ s?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { s } = await searchParams;
  const weighIns = data as WeighIn[];

  return <Tracker data={weighIns} source={parseSourceTag(s)} />;
}
