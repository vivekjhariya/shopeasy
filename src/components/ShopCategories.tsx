import Image from "next/image";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const categories = [
  {
    title: "ShopEasy Gadget Store",
    highlight: "Gadget",
    accent: "from-blue-500/10 to-cyan-400/5 dark:from-blue-900/20 dark:to-cyan-900/10",
    border: "hover:border-blue-400/40",
    link: "/shops/gadgets",
    items: [
      { title: "Smart phones", img: `${BASE_URL}/shopCategories/smartphones.jpg`, link: "/shops/gadgets/mobiles" },
      { title: "Camera", img: `${BASE_URL}/shopCategories/camera.png`, link: "/shops/gadgets/cameras" },
      { title: "Laptops", img: `${BASE_URL}/shopCategories/laptop.jpg`, link: "/shops/gadgets/laptops" },
      { title: "Headphones", img: `${BASE_URL}/shopCategories/headphone.png`, link: "/shops/gadgets/headphones" },
    ],
    cols: 2,
    cta: "Explore More",
  },
  {
    title: "Fashion Trends You Like",
    highlight: "Fashion",
    accent: "from-pink-500/10 to-rose-400/5 dark:from-pink-900/20 dark:to-rose-900/10",
    border: "hover:border-pink-400/40",
    link: "/shops/clothing",
    items: [
      { title: "Hoodies", img: `${BASE_URL}/shopCategories/hoodies.jpg`, link: "/shops/clothing/hoodie" },
      { title: "Tops", img: `${BASE_URL}/shopCategories/tops.jpg`, link: "/shops/clothing/tops" },
      { title: "Floral", img: `${BASE_URL}/shopCategories/floral.png`, link: "/shops/clothing/floral" },
      { title: "Jeans", img: `${BASE_URL}/shopCategories/jeans.png`, link: "/shops/clothing/jeans" },
    ],
    cols: 3,
    cta: "See More",
  },
  {
    title: "Beauty Products",
    highlight: "Beauty",
    accent: "from-purple-500/10 to-fuchsia-400/5 dark:from-purple-900/20 dark:to-fuchsia-900/10",
    border: "hover:border-purple-400/40",
    link: "/shops/makeup",
    items: [
      { title: "Makeups", img: `${BASE_URL}/shopCategories/makeups.jpg`, link: "/shops/makeup" },
      { title: "Lipsticks", img: `${BASE_URL}/shopCategories/lipsticks.jpg`, link: "/shops/makeup/lip-stick" },
      { title: "Mascaras", img: `${BASE_URL}/shopCategories/mascaras.jpg`, link: "/shops/makeup/mascara" },
      { title: "Facewashes", img: `${BASE_URL}/shopCategories/facewashes.jpg`, link: "/shops/makeup/facial-care" },
    ],
    cols: 2,
    cta: "Explore More",
  },
  {
    title: "Fresh Groceries",
    highlight: "Fresh",
    accent: "from-green-500/10 to-emerald-400/5 dark:from-green-900/20 dark:to-emerald-900/10",
    border: "hover:border-green-400/40",
    link: "/shops/grocery",
    items: [
      { title: "Fruits & Vegetables", img: `${BASE_URL}/shopCategories/fruites&vagetables.png`, link: "/shops/grocery/fruits-and-vegetables" },
      { title: "Dairy", img: `${BASE_URL}/shopCategories/dairy.jpg`, link: "/shops/grocery/dairy" },
      { title: "Snacks", img: `${BASE_URL}/shopCategories/snacks.png`, link: "/shops/grocery/snacks" },
      { title: "Meat & Fish", img: `${BASE_URL}/shopCategories/meat&fish.jpg`, link: "/shops/grocery/meat-and-fish" },
    ],
    cols: 2,
    cta: "Shop Now",
  },
  {
    title: "Exclusive Furnitures",
    highlight: "Exclusive",
    accent: "from-amber-500/10 to-yellow-400/5 dark:from-amber-900/20 dark:to-yellow-900/10",
    border: "hover:border-amber-400/40",
    link: "/shops/furniture",
    items: [
      { title: "Furnitures", img: `${BASE_URL}/shopCategories/furnitures.png`, link: "/shops/furniture" },
      { title: "Table", img: `${BASE_URL}/shopCategories/tables.png`, link: "/shops/furniture/tables" },
      { title: "Sofa", img: `${BASE_URL}/shopCategories/sofa.png`, link: "/shops/furniture/sofa" },
      { title: "Chair", img: `${BASE_URL}/shopCategories/chair.png`, link: "/shops/furniture/chairs" },
    ],
    cols: 3,
    cta: "Get More",
  },
  {
    title: "Your Health Partner",
    highlight: "Health",
    accent: "from-teal-500/10 to-cyan-400/5 dark:from-teal-900/20 dark:to-cyan-900/10",
    border: "hover:border-teal-400/40",
    link: "/shops/medicine",
    items: [
      { title: "Medicines", img: `${BASE_URL}/shopCategories/health.jpg`, link: "/shops/medicine" },
      { title: "Beauty Care", img: `${BASE_URL}/shopCategories/beautycare.png`, link: "/shops/medicine/beauty-care" },
      { title: "Baby Care", img: `${BASE_URL}/shopCategories/babycare.png`, link: "/shops/medicine/baby-care" },
      { title: "First Aid", img: `${BASE_URL}/shopCategories/firstaid.jpg`, link: "/shops/medicine/first-aid" },
    ],
    cols: 2,
    cta: "Explore More",
  },
];

const ShopCategories = () => {
  return (
    <section className="shop-categories relative z-10 py-14">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">All Categories</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Shop by <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">Explore our wide range of products</p>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 min-[991px]:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${cat.accent} ${cat.border} p-5 flex flex-col justify-between gap-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div>
                <h2 className="font-bold text-xl">
                  <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                    {cat.highlight}
                  </span>{" "}
                  {cat.title.replace(cat.highlight, "").trim()}
                </h2>

                <div className={`grid gap-3 mt-4 ${cat.cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                  {cat.items.map((item, j) => (
                    <Link
                      href={item.link}
                      key={j}
                      className={`group/item ${cat.cols === 3 && j === 0 ? "col-span-3" : ""}`}
                    >
                      <div className={`overflow-hidden rounded-xl border border-border/60 group-hover/item:border-primary/50 transition-all duration-300 ${cat.cols === 3 && j === 0 ? "aspect-[3/1.3]" : "aspect-square"}`}>
                        <Image
                          src={item.img}
                          width={200}
                          height={200}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="capitalize text-sm mt-1.5 font-medium group-hover/item:text-primary transition-colors duration-200">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href={cat.link}
                className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-3 transition-all duration-200"
              >
                {cat.cta}
                <span className="text-base">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopCategories;
