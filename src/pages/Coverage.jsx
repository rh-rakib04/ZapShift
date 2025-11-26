import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
const Coverage = () => {
  const serviceCenter = useLoaderData();
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);
  const handelServiceCenter = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenter.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 12);
    }
  };
  return (
    <div className="mx-auto">
      <h1 className="text-3xl md:text-4xl text-primary text-center font-extrabold my-5">
        We are Here
      </h1>
      <div className="w-9/12 mx-auto my-5">
        <form onSubmit={handelServiceCenter}>
          {" "}
          <div className="join auto">
            <div>
              <label className="input validator join-item">
                <input
                  name="location"
                  type="search"
                  placeholder=" 🔍Search Area"
                  required
                />
              </label>
            </div>
            <button type="submit" className="btn btn-neutral join-item">
              Search
            </button>
          </div>
        </form>
      </div>
      {/* Map */}
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        className="h-[600px] w-10/12 mx-auto"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {serviceCenter.map((center, index) => (
          <Marker key={index} position={[center.latitude, center.longitude]}>
            <Popup>
              <strong> {center.district}</strong>
              <br />
              Service Area : {center.covered_area.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Coverage;
