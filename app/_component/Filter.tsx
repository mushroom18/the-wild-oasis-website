"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        currentFilter={currentFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        currentFilter={currentFilter}
      >
        1&mdash;3 Guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        currentFilter={currentFilter}
      >
        4&mdash;7 Guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        currentFilter={currentFilter}
      >
        8&mdash;12 Guests
      </Button>
    </div>
  );
}

function Button({ filter, currentFilter, handleFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === currentFilter ? "bg-primary-700" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
