import React from "react";
import ChangePassword from "./ChangePass";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password",
  description:
    "Shopees is the user-friendly Next.js eCommerce template perfect for launching your online store. With its clean design and customizable options, Shopees makes selling online a breeze. Start building your dream store today and boost your online presence effortlessly!",
};

const ChangePassPage = () => {
  return <ChangePassword />;
};

export default ChangePassPage;
