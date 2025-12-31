import React from "react";
import {
  FaCheck,
  FaTimes,
  FaTruck,
  FaBox,
  FaGlobe,
  FaClock,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Standard",
      price: "৳50",
      period: "per parcel",
      description: "Perfect for occasional senders",
      popular: false,
      features: [
        { text: "24-72 hours delivery", included: true },
        { text: "Real-time tracking", included: true },
        { text: "Cash on delivery", included: true },
        { text: "Nationwide coverage", included: true },
        { text: "Express delivery (4-6 hours)", included: false },
        { text: "Priority support", included: false },
        { text: "Bulk discounts", included: false },
        { text: "Dedicated account manager", included: false },
      ],
      icon: FaBox,
      color: "secondary",
    },
    {
      name: "Express",
      price: "৳150",
      period: "per parcel",
      description: "Best for urgent deliveries",
      popular: true,
      features: [
        { text: "4-6 hours delivery (Dhaka)", included: true },
        { text: "Real-time tracking", included: true },
        { text: "Cash on delivery", included: true },
        { text: "Nationwide coverage", included: true },
        { text: "Priority handling", included: true },
        { text: "Priority support", included: true },
        { text: "Bulk discounts", included: false },
        { text: "Dedicated account manager", included: false },
      ],
      icon: FaTruck,
      color: "primary",
    },
    {
      name: "Business",
      price: "Custom",
      period: "monthly",
      description: "Tailored for businesses",
      popular: false,
      features: [
        { text: "Custom delivery times", included: true },
        { text: "Real-time tracking", included: true },
        { text: "Cash on delivery", included: true },
        { text: "Nationwide coverage", included: true },
        { text: "Priority handling", included: true },
        { text: "Priority support", included: true },
        { text: "Bulk discounts", included: true },
        { text: "Dedicated account manager", included: true },
      ],
      icon: FaGlobe,
      color: "accent",
    },
  ];

  const additionalServices = [
    {
      title: "Fulfillment Solution",
      description: "Inventory management, packaging, and order processing",
      price: "Starting from ৳5,000/month",
      icon: FaBox,
    },
    {
      title: "Corporate Logistics",
      description: "Warehouse management and contract logistics",
      price: "Custom pricing",
      icon: FaGlobe,
    },
    {
      title: "Parcel Return Service",
      description: "Reverse logistics for returns and exchanges",
      price: "৳40 per return",
      icon: FaTruck,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="bg-primary text-primary-content py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Transparent Pricing
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Choose the perfect plan for your delivery needs. Simple, fair, and
            affordable pricing with no hidden fees.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`card shadow-2xl ${
                  plan.popular
                    ? "ring-4 ring-primary scale-105 md:scale-110"
                    : "bg-base-200"
                } ${plan.popular ? "bg-primary text-primary-content" : ""}`}
              >
                {plan.popular && (
                  <div className="badge badge-accent badge-lg absolute -top-3 right-4">
                    Most Popular
                  </div>
                )}
                <div className="card-body">
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`p-4 rounded-full ${
                        plan.popular
                          ? "bg-primary-content/20"
                          : `bg-${plan.color}/20`
                      }`}
                    >
                      <IconComponent
                        className={`text-4xl ${
                          plan.popular
                            ? "text-primary-content"
                            : `text-${plan.color}`
                        }`}
                      />
                    </div>
                  </div>
                  <h2 className="card-title text-3xl justify-center mb-2">
                    {plan.name}
                  </h2>
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-base opacity-70 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-center opacity-80 mb-6">
                    {plan.description}
                  </p>
                  <div className="divider"></div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <FaCheck className="text-success mt-1 flex-shrink-0" />
                        ) : (
                          <FaTimes className="text-error opacity-50 mt-1 flex-shrink-0" />
                        )}
                        <span
                          className={
                            feature.included ? "" : "opacity-50 line-through"
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`btn w-full ${
                      plan.popular
                        ? "btn-accent"
                        : `btn-${plan.color} btn-outline`
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Services */}
      <div className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Enhance your delivery experience with our specialized services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="card-body">
                    <IconComponent className="text-4xl text-primary mb-4" />
                    <h3 className="card-title text-xl mb-2">
                      {service.title}
                    </h3>
                    <p className="text-base-content/70 mb-4">
                      {service.description}
                    </p>
                    <div className="badge badge-primary badge-lg">
                      {service.price}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            We provide reliable, fast, and secure parcel delivery services
            across Bangladesh
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-200 shadow-md">
            <div className="card-body items-center text-center">
              <FaClock className="text-4xl text-primary mb-4" />
              <h3 className="card-title justify-center">Fast Delivery</h3>
              <p className="text-center text-sm text-base-content/70">
                Express delivery available in 4-6 hours
              </p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-md">
            <div className="card-body items-center text-center">
              <FaShieldAlt className="text-4xl text-primary mb-4" />
              <h3 className="card-title justify-center">Secure & Safe</h3>
              <p className="text-center text-sm text-base-content/70">
                100% guaranteed safety of your products
              </p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-md">
            <div className="card-body items-center text-center">
              <FaGlobe className="text-4xl text-primary mb-4" />
              <h3 className="card-title justify-center">Nationwide</h3>
              <p className="text-center text-sm text-base-content/70">
                Coverage in every district of Bangladesh
              </p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-md">
            <div className="card-body items-center text-center">
              <FaHeadset className="text-4xl text-primary mb-4" />
              <h3 className="card-title justify-center">24/7 Support</h3>
              <p className="text-center text-sm text-base-content/70">
                Round-the-clock customer support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-content py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of satisfied customers who trust us with their
            deliveries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-accent btn-lg">
              Send Your First Parcel
            </button>
            <button className="btn btn-outline btn-lg btn-primary-content">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
