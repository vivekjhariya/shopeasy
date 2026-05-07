"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const shops = [
  { title: "gadgets", icon: `${BASE_URL}/icons/gadgets.png` },
  { title: "grocery", icon: `${BASE_URL}/icons/grocery.png` },
  { title: "bakery", icon: `${BASE_URL}/icons/bakery.png` },
  { title: "clothing", icon: `${BASE_URL}/icons/clothing.png` },
  { title: "makeup", icon: `${BASE_URL}/icons/makeup.png` },
  { title: "bags", icon: `${BASE_URL}/icons/bag.png` },
  { title: "furniture", icon: `${BASE_URL}/icons/furniture.png` },
  { title: "books", icon: `${BASE_URL}/icons/books.png` },
  { title: "medicine", icon: `${BASE_URL}/icons/medicine.png` },
  { title: "snacks", icon: `${BASE_URL}/icons/grocery.png` },
  { title: "beauty", icon: `${BASE_URL}/icons/makeup.png` }
];

const FeaturedNav = () => {
  const searchParams = useSearchParams();
  const activeShop = searchParams.get("featured") || "gadgets";

  return (
    <div className="flex gap-4 items-center flex-wrap">
      <AnimatePresence>
        {shops.map((shop) => (
          <Link
            href={`?featured=${shop.title.toLowerCase()}`}
            type="button"
            scroll={false}
            key={shop.title}
            className={`${
              shop.title === activeShop ? "text-primary" : ""
            } flex items-center px-2 py-1 hover:text-primary transition-colors duration-150 capitalize relative`}
          >
            <Image src={shop.icon} height={40} width={40} alt={shop.title} />
            <span>{shop.title}</span>

            {shop.title === activeShop && (
              <motion.div
                layout
                layoutId="underline"
                className="absolute left-0 bottom-0 w-full h-0.5 bg-primary rounded-lg"
              />
            )}
          </Link>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FeaturedNav;
