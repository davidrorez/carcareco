import SearchInput from "./SearchInput";

export default async function SimpleSearchBar({ placeholder }: { searchParams: Promise<Record<string, string>>,placeholder:string }) {

  return (
    <div className=" sm:px-0 space-y-12 gap-x-2">
      <div className="  grid grid-cols-1 sm:grid-flow-col gap-x-6 gap-y-2 sm:gap-y-8  ">
        <div>
          <SearchInput placeholder={placeholder} ></SearchInput>
        </div>
      </div>
    </div>
  )

}