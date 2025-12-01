import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import img from "../assets/agent-pending.png";
import Swal from "sweetalert2";

const BeRider = () => {
  const { register, handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsAll = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsAll)];

  const riderRegion = useWatch({ control, name: "riderRegion" });

  const districtByRegion = (region) => {
    const regionDistrict = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistrict.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    console.log("Rider Form Data:", data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application has been submitted. We will contact you soon!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-2">Be a Rider</h1>
        <p className="text-sm mb-8 w-full md:w-3/4">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="flex-1">
            {/* Form Title */}
            <h2 className="text-xl  font-bold mb-4">Tell us about yourself</h2>

            <form
              onSubmit={handleSubmit(handleRiderApplication)}
              className="space-y-6"
            >
              {/* Name + Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  {...register("riderName")}
                  defaultValue={user?.displayName}
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                  required
                />

                <input
                  type="number"
                  {...register("riderAge")}
                  placeholder="Your age"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Email + District */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  {...register("riderEmail")}
                  defaultValue={user?.email}
                  placeholder="Your Email"
                  className="input input-bordered w-full"
                  required
                />

                <select
                  {...register("riderRegion")}
                  className="select select-bordered w-full"
                  required
                >
                  <option>Select your District</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* District dynamic dropdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  {...register("riderDistrict")}
                  className="select select-bordered w-full"
                  required
                >
                  <option>Select District</option>
                  {districtByRegion(riderRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  {...register("riderContact")}
                  placeholder="Contact"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Driving License */}
              <input
                type="text"
                {...register("riderDrivingLicense")}
                placeholder="Driving License No"
                className="input input-bordered w-full"
                required
              />
              {/* Do you have  bike */}
              <select
                {...register("riderHasBike")}
                className="select select-bordered w-full"
                required
              >
                <option>Do you have a bike?</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              {/* Bike Model */}
              <input
                type="text"
                {...register("riderBikeModel")}
                placeholder="Bike Model and Year"
                className="input input-bordered w-full"
              />
              {/* Bike Registration Number */}
              <input
                type="text"
                {...register("riderBikeNumber")}
                placeholder="Bike Registration Number"
                className="input input-bordered w-full"
              />

              {/* NID */}
              <input
                type="text"
                {...register("riderNID")}
                placeholder="NID No"
                className="input input-bordered w-full"
                required
              />

              {/* Warehouse */}
              <select
                {...register("riderWarehouse")}
                className="select select-bordered w-full"
                required
              >
                <option>Which warehouse you want to work?</option>
                <option>Warehouse A</option>
                <option>Warehouse B</option>
                <option>Warehouse C</option>
              </select>

              {/* Submit button */}
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </form>
          </div>
          <div className="flex-1">
            {/* Image */}
            <img src={img} alt="Be a Rider" className="w-full mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeRider;
