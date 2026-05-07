import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaQuestionCircle, FaShippingFast, FaUndo, FaShieldAlt } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Help Center - Shopees",
  description: "Get help with your orders, shipping, returns and more",
};

const faqs = [
  {
    category: "Orders",
    icon: FaQuestionCircle,
    questions: [
      {
        q: "How do I track my order?",
        a: "You can track your order by visiting the Track Order page and entering your order ID.",
      },
      {
        q: "Can I cancel my order?",
        a: "Yes, you can cancel your order within 24 hours of placing it from your profile orders section.",
      },
    ],
  },
  {
    category: "Shipping",
    icon: FaShippingFast,
    questions: [
      {
        q: "What are the shipping charges?",
        a: "Shipping is free for orders above $50. For orders below $50, a flat shipping fee of $5 applies.",
      },
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 3-5 business days. Express delivery is available for 1-2 days.",
      },
    ],
  },
  {
    category: "Returns",
    icon: FaUndo,
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy for most items. Products must be unused and in original packaging.",
      },
      {
        q: "How do I return an item?",
        a: "Go to your orders, select the item you want to return, and follow the return process.",
      },
    ],
  },
  {
    category: "Payment & Security",
    icon: FaShieldAlt,
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, debit cards, PayPal, and digital wallets.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, we use industry-standard encryption to protect your payment information.",
      },
    ],
  },
];

const HelpCenterPage = () => {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Help Center</h1>
        <p className="text-center text-muted-foreground mb-10">
          Find answers to frequently asked questions
        </p>

        <div className="space-y-8">
          {faqs.map((category, idx) => (
            <div key={idx} className="bg-secondary p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <category.icon className="text-primary" size={24} />
                <h2 className="text-2xl font-semibold">{category.category}</h2>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, qIdx) => (
                  <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-primary/10 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
          <p className="text-muted-foreground mb-4">
            Contact our customer support team
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
