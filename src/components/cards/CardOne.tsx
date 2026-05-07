import { discountPercent } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtnWrapper from "../AddToCartWrapper";

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://dm168xfkl91xe.cloudfront.net';

const CardOne = ({ _id, title, price, image, oldPrice, unit_of_measure, shop_category }: AllProduct) => {
  const discount = oldPrice ? discountPercent(price, oldPrice) : null;

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
      style={{ boxShadow: undefined }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,153,0,0.15)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '')}
    >
      {/* clickable overlay */}
      <Link href={`/products/${_id}`} className="absolute inset-0 z-10" />

      {/* discount badge */}
      {discount && (
        <span className="absolute top-2.5 right-2.5 z-20 text-[11px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-md">
          -{discount}%
        </span>
      )}

      {/* image */}
      <div className="overflow-hidden bg-accent aspect-square">
        <Image
          src={image[0]?.startsWith('http') ? image[0] : `${BASE_URL}${image[0]}`}
          width={400}
          height={400}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* animated bottom border */}
      <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 transition-all duration-500" />

      <div className="p-3 md:p-4">
        <h2 className="line-clamp-1 font-semibold text-sm sm:text-base group-hover:text-primary transition-colors duration-200" title={title}>
          {title}
        </h2>
        <div className="mt-1.5 flex gap-2 items-baseline">
          <span className="text-primary font-bold">${price.toFixed(2)}</span>
          {oldPrice && <del className="text-xs text-muted-foreground">${oldPrice.toFixed(2)}</del>}
        </div>
        <div className="mt-3 relative z-20">
          <AddToCartBtnWrapper
            product={{ _id, title, description: "", image, price, oldPrice, categories: [], rating: 0, amount: 1, unit_of_measure, shop_category }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardOne;
