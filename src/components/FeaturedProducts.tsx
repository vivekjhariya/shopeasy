"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FeaturedNav from "./FeaturedNav";
import ProductCard from "./cards/ProductCard";
import Skeleton from "./loader/Skeleton";

type FeaturedParams = { featured?: string };

type AllProduct = {
  _id: string; title: string; description: string; price: number;
  oldPrice?: number; categories: string[]; image: string[];
  rating: number; amount: number; shop_category: string; unit_of_measure: string;
};

const FeaturedProducts = ({ featured }: FeaturedParams) => {
  const [products, setProducts] = useState<AllProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const activeShop = featured || "gadgets";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/featured?category=${activeShop}`);
        const data = await res.json();
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeShop]);

  return (
    <section className="featured-products py-14 w-full bg-gradient-to-b from-background to-secondary/30">
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">Top Picks</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Best Sellers in{" "}
              <Link href={`/shops/${activeShop}`} className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent hover:underline decoration-orange-400">
                {activeShop}
              </Link>
            </h1>
          </div>
          <Link
            href={`/shops/${activeShop}`}
            className="btn-primary-gradient whitespace-nowrap self-start md:self-auto"
          >
            View All →
          </Link>
        </div>

        <FeaturedNav />

        {loading ? (
          <div className="grid gap-4 grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
            {[...Array(10)].map((_, i) => <Skeleton key={i} />)}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} variants="style-2" />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-5xl mb-4">🛍️</p>
            <p className="text-lg font-medium">No products found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
