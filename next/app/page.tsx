import { Apartement } from "@/types/apartement";
import ApartementDetails from "./apartement-details";
import ListOfApartements from "./list-of-apartements";

async function getData() {
  const res = await fetch("http://localhost:3000/api/apartements", {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data as Apartement[];
}

export default async function Page({
  searchParams,
}: {
  searchParams: { id: string | undefined };
}) {
  const data = await getData();
  return (
    <main className="flex min-h-screen max-h-screen flex-col items-center p-12 gap-y-8">
      <h1>Apartements Listing</h1>
      <div className=" max-h-full w-full flex flex-row overflow-hidden flex-grow">
       <ListOfApartements data={data}/>

        <ApartementDetails
          searchParams={{
            id: searchParams.id,
          }}
        />
      </div>
    </main>
  );
}
