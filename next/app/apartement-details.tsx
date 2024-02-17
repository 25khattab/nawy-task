import { Apartement } from "@/types/apartement";

async function getData(id: string | undefined) {
  if (id === undefined) return null;
  console.log(id);
  const res = await fetch(`http://localhost:3000/api/apartements/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data as Apartement;
}

export default async function ApartementDetails({
  searchParams,
}: {
  searchParams: { id: string | undefined };
}) {
  const data = await getData(searchParams.id);
  if (data === null)
    return (
      <div className="w-full max-h-full flex flex-col justify-center items-center">
        <h1>Please select an Apartement</h1>
      </div>
    );
  return (
    <div className="max-h-full flex flex-col w-9/12 mx-auto gap-3">
      <img
        src="/apartment.jpeg"
        alt={""}
        className="w-full h-1/2 object-contain justify-center"
      />
      <div className="flex flex-col">
        <p>Apartement Area : {data.apartementArea}</p>
        <p>Bathrooms : {data.bathrooms}</p>
        <p>Bedrooms : {data.bedrooms}</p>
        <p>price : {data.price}</p>
        <p>location : {data.location.area}, {data.location.city}</p>
      </div>
    </div>
  );
}
