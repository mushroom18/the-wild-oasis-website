import CabinCard from "../_component/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

export default async function CabinList({ filter }) {
  //this function is to ensure that the data is not cached
  //and is fetched fresh on every request
  //noStore();

  const cabins = await getCabins();
  if (!cabins.length) return null;

  let displayedCabins;
  if (filter === "all") {
    displayedCabins = cabins;
  }
  if (filter === "small") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity < 8
    );
  }
  if (filter === "large") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
