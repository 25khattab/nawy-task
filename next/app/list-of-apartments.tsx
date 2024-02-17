"use client";

import { Apartment } from "@/types/apartment";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function ListOfApartements({ data }: { data: Apartment[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="flex flex-col  overflow-y-auto overflow-x-hidden min-w-max min-h-full">
      {data.map((apartement, i) => (
        <div
          key={i}
          className="flex flex-row items-center gap-2 p-3 cursor-pointer hover:bg-slate-600"
          onClick={(e) => {
            router.push(
              pathname +
                "?" +
                createQueryString("id", apartement._id.toString())
            );
          }}
        >
          <img src="/apartment.jpeg" alt={""} className="w-12 h-12" />
          <div className="flex flex-col">
            <h2>
              {apartement.location.area}, {apartement.location.city}
            </h2>
            <h4>price : {apartement.price}$</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
