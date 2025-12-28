import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { FaMapMarkerAlt, FaSearch, FaLocationArrow } from "react-icons/fa";

// Fix for default Leaflet marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Coverage = () => {
  const serviceCenter = useLoaderData();
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);
  const [searchError, setSearchError] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    // Ensure markers are properly initialized
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  const handleServiceCenter = (e) => {
    e.preventDefault();
    setSearchError("");
    setSelectedDistrict(null);
    const location = e.target.location.value.trim();

    if (!location) {
      setSearchError("Please enter a location to search");
      return;
    }

    const district = serviceCenter.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      setSelectedDistrict(district);
      mapRef.current.flyTo(coord, 12, {
        duration: 1.5,
      });
      e.target.location.value = "";
    } else {
      setSearchError(`No service center found for "${location}"`);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 md:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
            Our Service Coverage
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto">
            Find our service centers across different districts and explore our
            coverage areas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="card bg-primary text-primary-content shadow-lg">
            <div className="card-body items-center text-center">
              <FaMapMarkerAlt className="text-3xl mb-2" />
              <h3 className="text-2xl font-bold">
                {serviceCenter?.length || 0}
              </h3>
              <p className="text-sm opacity-90">Service Centers</p>
            </div>
          </div>
          <div className="card bg-secondary text-secondary-content shadow-lg">
            <div className="card-body items-center text-center">
              <FaLocationArrow className="text-3xl mb-2" />
              <h3 className="text-2xl font-bold">
                {serviceCenter?.reduce(
                  (acc, center) => acc + (center.covered_area?.length || 0),
                  0
                ) || 0}
              </h3>
              <p className="text-sm opacity-90">Coverage Areas</p>
            </div>
          </div>
          <div className="card bg-accent text-accent-content shadow-lg">
            <div className="card-body items-center text-center">
              <FaMapMarkerAlt className="text-3xl mb-2" />
              <h3 className="text-2xl font-bold">24/7</h3>
              <p className="text-sm opacity-90">Available Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">
              <FaSearch className="text-primary" />
              Search Service Center
            </h2>
            <form onSubmit={handleServiceCenter}>
              <div className="form-control">
                <div className="input-group">
                  <input
                    name="location"
                    type="search"
                    placeholder="Enter district name (e.g., Dhaka, Chittagong)"
                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    <FaSearch />
                    Search
                  </button>
                </div>
                {searchError && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {searchError}
                    </span>
                  </label>
                )}
                {selectedDistrict && (
                  <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-success font-semibold">
                      ✓ Found: {selectedDistrict.district}
                    </p>
                    <p className="text-sm text-base-content/70 mt-1">
                      Service Areas:{" "}
                      {selectedDistrict.covered_area?.join(", ") || "N/A"}
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto">
        <div className="card bg-base-200 shadow-2xl overflow-hidden">
          <div className="card-body p-0">
            <div className="bg-primary text-primary-content p-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FaMapMarkerAlt />
                Interactive Coverage Map
              </h2>
              <p className="text-sm opacity-90 mt-1">
                Click on markers to view service center details
              </p>
            </div>
            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={true}
              className="h-[600px] w-full z-0"
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {serviceCenter?.map((center, index) => (
                <Marker
                  key={index}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup className="custom-popup">
                    <div className="p-2">
                      <h3 className="font-bold text-lg text-primary mb-2">
                        {center.district}
                      </h3>
                      <div className="divider my-2"></div>
                      <div>
                        <p className="font-semibold text-sm mb-1">
                          Service Areas:
                        </p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {center.covered_area?.map((area, idx) => (
                            <li key={idx} className="text-base-content/80">
                              {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Service Centers List */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">All Service Centers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceCenter?.map((center, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    const coord = [center.latitude, center.longitude];
                    setSelectedDistrict(center);
                    setSearchError("");
                    mapRef.current.flyTo(coord, 12, { duration: 1.5 });
                  }}
                >
                  <div className="card-body p-4">
                    <h3 className="card-title text-lg text-primary">
                      <FaMapMarkerAlt />
                      {center.district}
                    </h3>
                    <p className="text-sm text-base-content/70">
                      <span className="font-semibold">Areas:</span>{" "}
                      {center.covered_area?.join(", ") || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
