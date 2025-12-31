import React from "react";
import {
  FaTruck,
  FaUsers,
  FaAward,
  FaGlobe,
  FaHeart,
  FaRocket,
  FaShieldAlt,
  FaClock,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";

const AboutUs = () => {
  const values = [
    {
      icon: FaRocket,
      title: "Innovation",
      description:
        "We continuously innovate to provide the best delivery solutions",
    },
    {
      icon: FaShieldAlt,
      title: "Reliability",
      description: "Your trust is our priority. We deliver on time, every time",
    },
    {
      icon: FaHeart,
      title: "Customer First",
      description: "We put our customers at the heart of everything we do",
    },
    {
      icon: FaHandshake,
      title: "Integrity",
      description:
        "Transparent, honest, and ethical in all our business practices",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: FaUsers },
    { number: "100K+", label: "Parcels Delivered", icon: FaTruck },
    { number: "64", label: "Service Centers", icon: FaGlobe },
    { number: "99%", label: "Success Rate", icon: FaAward },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Founded",
      description:
        "Started with a vision to revolutionize parcel delivery in Bangladesh",
    },
    {
      year: "2021",
      title: "Expansion",
      description: "Expanded to 20+ districts across the country",
    },
    {
      year: "2022",
      title: "Technology",
      description: "Launched real-time tracking and mobile app",
    },
    {
      year: "2023",
      title: "Growth",
      description: "Reached 50K+ customers and 100K+ deliveries",
    },
    {
      year: "2024",
      title: "Nationwide",
      description: "Achieved coverage in all 64 districts of Bangladesh",
    },
  ];

  const team = [
    {
      name: "Leadership Team",
      description:
        "Experienced professionals with decades of logistics expertise",
    },
    {
      name: "Delivery Riders",
      description:
        "Dedicated team of riders ensuring safe and timely deliveries",
    },
    {
      name: "Support Staff",
      description: "24/7 customer support team ready to assist you",
    },
    {
      name: "Tech Team",
      description: "Innovative developers building cutting-edge solutions",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="bg-primary text-primary-content py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About ZapShift
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            We are a leading parcel delivery service in Bangladesh, committed to
            providing fast, reliable, and secure delivery solutions across the
            nation.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <FaRocket className="text-5xl text-primary mb-4" />
              <h2 className="card-title text-3xl mb-4">Our Mission</h2>
              <p className="text-base-content/80 text-lg">
                To revolutionize parcel delivery in Bangladesh by providing
                fast, reliable, and affordable services that connect businesses
                and individuals across the nation. We strive to make delivery
                seamless, transparent, and accessible to everyone.
              </p>
            </div>
          </div>
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <FaChartLine className="text-5xl mb-4" />
              <h2 className="card-title text-3xl mb-4">Our Vision</h2>
              <p className="opacity-90 text-lg">
                To become the most trusted and preferred parcel delivery service
                in Bangladesh, known for innovation, reliability, and
                exceptional customer service. We envision a future where
                distance is never a barrier to connecting people and businesses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Achievements
            </h2>
            <p className="text-lg text-base-content/70">
              Numbers that speak for our commitment and excellence
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="card bg-base-100 shadow-lg text-center"
                >
                  <div className="card-body">
                    <IconComponent className="text-4xl text-primary mx-auto mb-4" />
                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-base-content/70">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="card-body items-center text-center">
                  <IconComponent className="text-5xl text-primary mb-4" />
                  <h3 className="card-title justify-center text-xl mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-base-content/70">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-base-content/70">
              Milestones that shaped our growth
            </p>
          </div>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`card shadow-lg ${
                  index % 2 === 0
                    ? "bg-base-100"
                    : "bg-primary text-primary-content"
                }`}
              >
                <div className="card-body">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div
                      className={`badge badge-lg ${
                        index % 2 === 0 ? "badge-primary" : "badge-accent"
                      }`}
                    >
                      {milestone.year}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">
                        {milestone.title}
                      </h3>
                      <p className="opacity-80">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Team
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Meet the dedicated professionals who make it all possible
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="card-body text-center">
                <FaUsers className="text-5xl text-primary mx-auto mb-4" />
                <h3 className="card-title justify-center text-xl mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-base-content/70">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-primary text-primary-content py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose ZapShift?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              We're not just a delivery service, we're your trusted logistics
              partner
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-primary-content/10 shadow-lg">
              <div className="card-body">
                <FaClock className="text-4xl mb-4" />
                <h3 className="card-title text-xl mb-2">Fast & Reliable</h3>
                <p className="opacity-90">
                  Express delivery in 4-6 hours, standard delivery in 24-72
                  hours across the nation
                </p>
              </div>
            </div>
            <div className="card bg-primary-content/10 shadow-lg">
              <div className="card-body">
                <FaShieldAlt className="text-4xl mb-4" />
                <h3 className="card-title text-xl mb-2">Secure Delivery</h3>
                <p className="opacity-90">
                  100% guaranteed safety of your products with real-time
                  tracking
                </p>
              </div>
            </div>
            <div className="card bg-primary-content/10 shadow-lg">
              <div className="card-body">
                <FaGlobe className="text-4xl mb-4" />
                <h3 className="card-title text-xl mb-2">Nationwide Coverage</h3>
                <p className="opacity-90">
                  Service centers in all 64 districts of Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="card bg-base-200 shadow-2xl">
          <div className="card-body text-center">
            <h2 className="card-title text-3xl md:text-4xl justify-center mb-4">
              Ready to Experience ZapShift?
            </h2>
            <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and experience the future of
              parcel delivery
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg text-primary-content">
                Send Your First Parcel
              </button>
              <button className="btn btn-outline btn-primary btn-lg text-primary">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
