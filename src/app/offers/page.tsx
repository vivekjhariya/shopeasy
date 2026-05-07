import { Metadata } from "next";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const offers = [
  {
    imgUrl: `${BASE_URL}/offersImages/offer1.png`,
  },
  {
    imgUrl: `${BASE_URL}/offersImages/offer2.png`,
  },
  {
    imgUrl: `${BASE_URL}/offersImages/offer3.png`,
  },
  {
    imgUrl: `${BASE_URL}/offersImages/offer4.png`,
  },
  {
    imgUrl: `${BASE_URL}/offersImages/offer5.png`,
  },
  {
    imgUrl: `${BASE_URL}/offersImages/offer6.png`,
  },
];

export const metadata: Metadata = {
  title: "Offers",
  description:
    "Shopees is the user-friendly Next.js eCommerce template perfect for launching your online store. With its clean design and customizable options, Shopees makes selling online a breeze. Start building your dream store today and boost your online presence effortlessly!",
};

const OffersPage = () => {
  return (
    <section className="offer-page pt-10 pb-16">
      <h1 className="text-center text-4xl font-semibold mb-6">
        Special Offers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-[990px] px-default gap-4 lg:gap-5 mx-auto">
        {offers.map((offer) => (
          <div key={offer.imgUrl} className="bg-secondary">
            <Image
              src={offer.imgUrl}
              width={600}
              height={400}
              alt={offer.imgUrl}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OffersPage;
