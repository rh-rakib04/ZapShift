import React from "react";
import { set, useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regionsAll = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsAll)];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegion = (region) => {
    const regionDistrict = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistrict.map((d) => d.district);
    return districts;
  };
  const handleParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("parcel Cost", cost);
    data.cost = cost;
    Swal.fire({
      title: "Agree with the cost?",
      text: `You have to pay ${cost}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, pay it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel", res.data);
        });

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };
  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Send A Parcel</h1>
        <p className="text-sm mb-6">Enter your parcel details</p>
        <form onSubmit={handleSubmit(handleParcel)}>
          {/* Document Type */}
          <div className="flex gap-6 mb-6">
            <label className="label cursor-pointer flex gap-2 items-center">
              <input
                type="radio"
                {...register("parcelType")}
                value="document"
                className="radio radio-primary"
                defaultChecked
              />
              <span>Document</span>
            </label>
            <label className="label cursor-pointer flex gap-2 items-center">
              <input
                type="radio"
                {...register("parcelType")}
                value="non-document"
                className="radio radio-secondary"
              />
              <span>Non-Document</span>
            </label>
          </div>

          {/* Parcel Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <input
              type="text"
              {...register("parcelName")}
              placeholder="Parcel Name"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              {...register("parcelWeight")}
              placeholder="Parcel Weight (KG)"
              className="input input-bordered w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sender */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Sender Details</h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  {...register("senderName")}
                  defaultValue={user?.displayName}
                  placeholder="Sender Name"
                  className="input input-bordered"
                />
                <input
                  type="text"
                  {...register("senderAddress")}
                  placeholder="Address"
                  className="input input-bordered"
                />
                <input
                  type="email"
                  {...register("senderEmail")}
                  placeholder="Email"
                  defaultValue={user?.email}
                  className="input input-bordered"
                />
                <input
                  type="text"
                  {...register("senderPhone")}
                  placeholder="Sender Phone No"
                  className="input input-bordered"
                />
                <select
                  {...register("senderRegion")}
                  className="select select-bordered"
                >
                  <option>Select Sender Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <select
                  {...register("senderDistrict")}
                  className="select select-bordered"
                >
                  <option>Select Sender District</option>
                  {districtByRegion(senderRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <textarea
                  {...register("pickupInstruction")}
                  className="textarea textarea-bordered"
                ></textarea>
              </div>
            </div>

            {/* Receiver */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Receiver Details</h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  {...register("receiverName")}
                  placeholder="Receiver Name"
                  className="input input-bordered"
                />
                <input
                  type="text"
                  {...register("receiverAddress")}
                  placeholder="Receiver Address"
                  className="input input-bordered"
                />
                <input
                  type="email"
                  {...register("receiverEmail")}
                  placeholder="Receiver Email"
                  className="input input-bordered"
                />
                <input
                  type="text"
                  {...register("receiverPhone")}
                  placeholder="Receiver Contact No"
                  className="input input-bordered"
                />
                <select
                  {...register("receiverRegion")}
                  className="select select-bordered"
                >
                  <option>Select receiver Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <select
                  {...register("receiverDistrict")}
                  className="select select-bordered"
                >
                  <option>Select receiver District</option>
                  {districtByRegion(receiverRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Delivery Instruction"
                ></textarea>
              </div>
            </div>
          </div>

          <p className="text-xs mt-4 mb-4">* Pickup Time 4pm-7pm Approx.</p>

          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Proceed to Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
