import { FilterOptions } from "@/components/filters/FilterNav";
import { ProductCardVariants } from "@/components/cards/ProductCard";

// here you can change heroImages, filterOptions and productCard variants for specific shop

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://dm168xfkl91xe.cloudfront.net';

interface HeroImage {
  bgImg: string;
}

interface Hero {
  images: HeroImage[];
}

interface Category {
  hero: Hero;
  filterOptions?: FilterOptions;
  productCardVariants?: ProductCardVariants;
}

interface Data {
  [key: string]: Category;
}

const layoutSettings: Data = {
  // bags
  bags: {
    hero: {
      images: [
        {
          bgImg: `${BASE_URL}/heroImages/clothing1.png`,
        },
        {
          bgImg: `${BASE_URL}/heroImages/clothing2.png`,
        },
        {
          bgImg: `${BASE_URL}/heroImages/clothing3.png`,
        },
      ],
    },

    productCardVariants: "style-1",
  },

  //   bakery
  bakery: {
    hero: {
      images: [
        {
          bgImg: `${BASE_URL}/heroImages/bakery1.png`,
        },
        {
          bgImg: `${BASE_URL}/heroImages/bakery2.png`,
        },
      ],
    },
  },

  //   books
  books: {
    hero: {
      images: [
        {
          bgImg: `${BASE_URL}/heroImages/book1.png`,
        },
      ],
    },
    productCardVariants: "book-card",
  },

  //   clothing
  clothing: {
    hero: {
      images: [
        {
          bgImg: `${BASE_URL}/heroImages/clothing1.png`,
        },
        {
          bgImg: `${BASE_URL}/heroImages/clothing2.png`,
        },
        {
          bgImg: `${BASE_URL}/heroImages/clothing3.png`,
        },
      ],
    },
    filterOptions: {
      useColor: true,
      usePrice: true,
    },
  },

  //   furniture
  furniture: {
    hero: {
      images: [
        {
          bgImg: `${BASE_URL}/heroImages/furniture1.png`,
        },
      ],
    },
  },

  //   gadgets
  gadgets: {
    hero: {
      images: [
        {
          bgImg: `${BASE_URL}/heroImages/gadget1.png`,
        },
        {
          bgImg: `${BASE_URL}/heroImages/gadget2.png`,
        },
        {
          bgImg: `${BASE_URL}/heroImages/gadget3.png`,
        },
      ],
    },

    filterOptions: {
      useColor: true,
      usePrice: true,
    },

    productCardVariants: "style-1",
  },

  //   grocery
  grocery: {
    hero: {
      images: [
        {
          bgImg: `${BASE_URL}/heroImages/grocery.png`,
        },
      ],
    },
    productCardVariants: "style-2",
  },

  //   makeup
  makeup: {
    hero: {
      images: [
        {
          bgImg: `${BASE_URL}/heroImages/makeup1.png`,
        },
        {
          bgImg: `${BASE_URL}/heroImages/makeup2.png`,
        },
      ],
    },
    productCardVariants: "style-3",
  },

  //   medicine
  medicine: {
    hero: {
      images: [
        {
          bgImg: `${BASE_URL}/heroImages/medicine.png`,
        },
      ],
    },
  },
};

export default layoutSettings;
