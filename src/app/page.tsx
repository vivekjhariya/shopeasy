import dynamic from "next/dynamic";
import HeroSlider from "@/components/heros/HeroSlider";
import PromoSection from "@/components/PromoSection";

const BannerSlider = dynamic(() => import("@/components/BannerSlider"), {
  loading: () => <div className="h-32 bg-accent animate-pulse rounded-xl" />,
});
const ShopCategories = dynamic(() => import("@/components/ShopCategories"), {
  loading: () => <div className="h-96 bg-accent animate-pulse rounded-xl" />,
});
const BooksCategory = dynamic(() => import("@/components/BooksCategory"), {
  loading: () => <div className="h-64 bg-accent animate-pulse rounded-xl" />,
});
const BekaryCategories = dynamic(() => import("@/components/BekaryCategories"), {
  loading: () => <div className="h-64 bg-accent animate-pulse rounded-xl" />,
});
const FeaturedProducts = dynamic(() => import("@/components/FeaturedProducts"), {
  loading: () => <div className="h-96 bg-accent animate-pulse rounded-xl" />,
});

const heroImages = [
  { bgImg: "/heroImages/clothing1.png" },
  { bgImg: "/heroImages/gadget1.png" },
  { bgImg: "/heroImages/makeup2.png" },
  { bgImg: "/heroImages/furniture1.png" },
  { bgImg: "/heroImages/clothing2.png" },
  { bgImg: "/heroImages/book1.png" },
  { bgImg: "/heroImages/clothing3.png" },
  { bgImg: "/heroImages/grocery.png" },
];

const banners = [
  { img: "/bannerImages/banner1.png" },
  { img: "/bannerImages/banner2.png" },
  { img: "/bannerImages/banner3.png" },
  { img: "/bannerImages/banner4.png" },
  { img: "/bannerImages/banner5.png" },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ featured?: string }>;
}) {
  const params = await searchParams;

  return (
    <main>
      <HeroSlider heroImages={heroImages} />
      <BannerSlider bannerImages={banners} />
      <ShopCategories />
      <PromoSection />
      <BooksCategory />
      <BekaryCategories />
      <FeaturedProducts featured={params.featured} />
    </main>
  );
}

export const revalidate = 3600;
