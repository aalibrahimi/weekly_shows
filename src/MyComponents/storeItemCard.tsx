"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useCheckoutStore } from "@/stores/store";
import Image from "next/image";
import React from "react";

interface ItemCard {
  itemName: string;
  itemPrice: number;
  itemImage: string;
  to?: string;
}

function StoreItemCard({
  itemName,
  itemPrice,
  itemImage,
  to,
}: ItemCard) {
  const { setItemprice } = useCheckoutStore();
  return (
    <div className="bg-teal-500 w-75 h-75 p-2 rounded-sm">
      <div
        className="w-full h-40 rounded-sm hover:shadow-[0px_5px_5px_-2px] hover:shadow-black hover:-translate-y-0.5 transition-all duration-200
      hover:brightness-110"
      >
        <Image
          src={itemImage}
          alt={itemName.toLowerCase()}
          width={500}
          height={500}
          className="w-full h-auto object-contain rounded-sm"
        />
      </div>
      <p className="text-2xl font-semibold">{itemName}</p>
      <p className="text-xl font-serif">${itemPrice}</p>
      <Link href={to ? `${to}` : `/checkout?price=${itemPrice}`}>
        <Button
          onClick={() => setItemprice(itemPrice)}
          className="bg-gradient-to-br from-red-400 to-red-500 hover:from-red-400 hover:via-red-500 hover:to-red-600 text-black hover:text-white transition-all duration-300
      hover:inset-shadow-[0px_0px_5px_-1px] inset-shadow-[0px_0px_5px_-1px] hover:inset-shadow-white hover:cursor-pointer"
          size={"lg"}
        >
          Buy Now
        </Button>
      </Link>
    </div>
  );
}

export default StoreItemCard;
