"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaCheckCircle } from "react-icons/fa";

const plans = [
  {
    name: "Basic Plan",
    price: "$10/month",
    features: ["Access to basic courses",
         "Email support",
         "Better Courses",
        ],
  },
  {
    name: "Pro Plan",
    price: "$20/month",
    features: [
      "Access to all courses",
      "Priority support",
      "Offline access",
      "Monthly webinars",
    ],
  },
  {
    name: "Premium Plan",
    price: "$30/month",
    features: [
      "All Pro Plan features",
      "1-on-1 coaching sessions",
      "Exclusive content",
      "Lifetime access to courses",
    ],
  },
];

const UpgradePlan = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client side
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white ">
      <motion.h1
        className="text-4xl font-bold text-indigo-600 mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Upgrade Your Plan
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 p-4">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className="p-6 bg-gray-100 rounded-lg shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }} // Added opacity for animation
            animate={{ scale: 1, opacity: 1 }} // Animate to full size
            transition={{
              type: "spring", // Elastic effect
              stiffness: 100,
              damping: 15,
              delay: index * 0.1, // Staggered animation
            }}
            whileHover={{ scale: 1.1 }} // Increased scale for more impact
            transitionHover={{ duration: 0.2 }} // Faster hover transition
          >
            <h2 className="text-xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-2xl font-bold text-indigo-600 mb-4">
              {plan.price}
            </p>
            <ul className="list-disc list-inside mb-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300">
              Upgrade Now
            </button>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-8 text-gray-700 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Choose a plan that suits you and unlock your learning potential!
      </motion.p>
    </div>
  );
};

export default UpgradePlan;
