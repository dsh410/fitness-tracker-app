import Tracker from "@/components/Tracker";
import data from "../../data.json";
import type { WeighIn } from "@/lib/rolling";

export default function Home() {
  return <Tracker data={data as WeighIn[]} />;
}
