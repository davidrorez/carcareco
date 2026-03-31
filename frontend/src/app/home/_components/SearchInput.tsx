'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim() === "") {
      params.delete("searchText");
    } else {
      params.set("searchText", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="md:p-0 grid grid-cols-1">
      <input
        type="search"
        name="searchText"
        placeholder={placeholder}
        defaultValue={searchParams.get("searchText") ?? ""}
        onChange={handleChange}
        className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 pl-9 text-sm/6"
      />

      <MagnifyingGlassIcon
        aria-hidden="true"
        className="pointer-events-none col-start-1 ml-2 row-start-1 size-5 self-center text-gray-400"
      />
    </div>
  );
}