"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch, FaBox, FaTruck, FaCheckCircle } from "react-icons/fa";

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState<any>(null);

  const handleTrack = () => {
    // Mock tracking data
    setTracking({
      orderId: orderId,
      status: "In Transit",
      estimatedDelivery: "May 8, 2026",
      timeline: [
        { status: "Order Placed", date: "May 3, 2026", completed: true },
        { status: "Processing", date: "May 4, 2026", completed: true },
        { status: "Shipped", date: "May 5, 2026", completed: true },
        { status: "Out for Delivery", date: "May 8, 2026", completed: false },
        { status: "Delivered", date: "", completed: false },
      ],
    });
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>

      <div className="max-w-2xl mx-auto">
        <div className="flex gap-4 mb-8">
          <Input
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleTrack} className="gap-2">
            <FaSearch /> Track
          </Button>
        </div>

        {tracking && (
          <div className="bg-secondary p-6 rounded-lg">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Order #{tracking.orderId}</h2>
              <p className="text-primary">Status: {tracking.status}</p>
              <p className="text-sm text-muted-foreground">
                Estimated Delivery: {tracking.estimatedDelivery}
              </p>
            </div>

            <div className="space-y-4">
              {tracking.timeline.map((item: any, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`mt-1 ${item.completed ? "text-primary" : "text-gray-400"}`}>
                    {item.completed ? <FaCheckCircle size={24} /> : <FaBox size={24} />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${item.completed ? "" : "text-gray-400"}`}>
                      {item.status}
                    </p>
                    {item.date && <p className="text-sm text-muted-foreground">{item.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;
