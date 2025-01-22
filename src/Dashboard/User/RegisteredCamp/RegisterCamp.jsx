import { FaUser } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTransgenderAlt } from "react-icons/fa";
import { MdContactEmergency } from "react-icons/md";
import ReactStars from "react-rating-stars-component";

import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Card, Typography } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Spinner } from "@material-tailwind/react";

const TABLE_HEAD = [
  "Name",
  "Fee",
  "Participants Name",
  "Payment Status",
  "Confirmation Status",
  "Cancel",
  "Feedback",
];

const itemsPerPage = 10;

const RegisterCamp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [payments, setPayments] = useState([]);
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState([]);
  const [load, setLoad] = useState(false);

  const { data: camps = [], refetch } = useQuery({
    queryKey: ["camps", user.email, search],
    queryFn: () =>
      axiosSecure
        .get(`/register?email=${user.email}&search=${search}`)
        .then((res) => res.data),
    enabled: !!user.email,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  // Handle search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    refetch();
  };

  useEffect(() => {
    if (user && user.email) {
      axiosSecure
        .get(`/paymentsByEmail?email=${user.email}`)
        .then((res) => setPayments(res.data))
        .catch((error) => console.error(error));
    }
  }, [user.email, axiosSecure]);

  const getPaymentStatus = (campId) => {
    const payment = payments.find((pay) => pay.CampId === campId);
    return payment ? "Paid" : "Pay";
  };

  const getConfirmationStatus = (campId) => {
    const payment = payments.find((pay) => pay.CampId === campId);
    return payment ? payment.status : "Pending";
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-register/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              refetch();
            } else {
              Swal.fire("Failed!", "Could not delete the camp.", "error");
            }
          })
          .catch(() =>
            Swal.fire(
              "Delete Failed",
              "You failed to delete the camp.",
              "error"
            )
          );
      }
    });
  };

  // Calculate the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = camps.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(camps.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_API = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleFeedback = async (e, id) => {
    e.preventDefault();
    setLoad(true);

    const form = e.target;
    
    const participantName = form.participantName.value;
    const description = form.description.value;

    const imageFile = form.image.files[0];

    // Check if image is selected
    if (!imageFile) {
      Swal.fire({
        title: "Error!",
        text: "Please Select your Photo.",
        icon: "error",
      });
      return setLoad(false);
    }

    // Create FormData for image upload
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const imageUploadResponse = await fetch(image_hosting_API, {
        method: "POST",
        body: formData,
      });
      const imageResult = await imageUploadResponse.json();

      if (!imageResult.success) {
        Swal.fire({
          title: "Error!",
          text: "Failed to update the camp.",
          icon: "error",
        });
        return;
      }
      console.log(rating);
      const imageUrl = imageResult.data.display_url;

      // Collect all form data
      const feedbackData = {
       
        participantName,
        description,
        rating,
        imageUrl,
      };
      // console.log(rating);
      // Post data to the database
      const response = await axiosSecure.post("/feedback", feedbackData);

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Feedback Submitted successfully!",
          icon: "success",
        });
        document.getElementById("my_modal_4").close();
        form.reset();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to Submit Feedback.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: `${error.message}`,
        icon: "error",
      });
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="text-center w-10/12 mx-auto pt-20 px-10 pb-20">
      <h1 className="text-4xl text-white ">Registered Camps</h1>
      <p className="text-lg mb-10 mt-2 text-white/70">
        View and manage all your registered camps, track participants, and
        update camp information seamlessly.
      </p>
      <div className="flex bg-[#35485B] w-1/4   mb-10 p-1 rounded-xl ">
        <input
          type="text"
          placeholder="Search Registered  camps"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered bg-[#35485B] placeholder:text-white text-white w-full focus-border-none  mb-4 md:mb-0"
        />
        <button
          onClick={handleSearch}
          className="btn btn-ghost border-none hover:bg-[#007EFF] bg-[#007EFF] text-white text-lg "
        >
          Search
        </button>
      </div>
      {/* Camp Table */}
      <div>
        <Card className="h-full  mx-auto overflow-scroll bg-[#10273D] text-white">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="bg-slate-600">
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="p-4 pt-10">
                    <Typography
                      variant="large"
                      color="white"
                      className="font-bold leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map(({ _id, name, fees, participantName }) => {
                const paymentStatus = getPaymentStatus(_id);
                const confirmationStatus = getConfirmationStatus(_id);
                return (
                  <tr
                    key={_id}
                    className="border-t border-dashed border-gray-500"
                  >
                    <td className="p-4">
                      <Typography
                        variant="large"
                        color="white"
                        className="font-normal text-white/80 lg:text-lg text-blue-600"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className="font-normal text-white/80 text-md text-blue-600"
                      >
                        {fees}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className="font-normal text-white/80 lg:text-lg"
                      >
                        {participantName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className="font-normal text-white/80 lg:text-lg"
                      >
                        {paymentStatus === "Paid" ? (
                          <button className="btn btn-ghost border border-green-400">
                            Paid
                          </button>
                        ) : (
                          <Link to={`/dashboard/registerById/${_id}`}>
                            <button className="btn btn-ghost border border-blue-400">
                              Pay
                            </button>
                          </Link>
                        )}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className="font-normal text-white/80 lg:text-lg"
                      >
                        {confirmationStatus === "Pending"
                          ? "Pending"
                          : confirmationStatus}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(_id)}
                        disabled={paymentStatus === "Paid"}
                        className={`${
                          paymentStatus === "Paid"
                            ? "bg-gray-400 p-2 rounded-md"
                            : "bg-red-600 p-2 rounded-md"
                        }`}
                      >
                        <MdDelete className="text-xl text-white" />
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        disabled={confirmationStatus !== "Confirmed"}
                        onClick={() =>
                          document.getElementById("my_modal_4").showModal()
                        }
                        className="btn btn-ghost bg-[#007EFF] text-white text-lg hover:border-[#007EFF]"
                      >
                        Feedback
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        <div className="mt-4 text-white">
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, camps.length)} of {camps.length}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-2 rounded mx-1 ${
                currentPage === index + 1
                  ? "bg-[#007EFF] text-white"
                  : "bg-[#04478a] text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div>
        {camps.map((camp) => (
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-full max-w-5xl bg-[#1E3348]">
              <div className="flex justify-center items-center">
                <div className="hero-content p-8 rounded-lg">
                  <div className="card w-full">
                    <form onSubmit={handleFeedback} className="card-body">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Camp Name */}
                        <div className="form-control col-span-2 md:col-span-2">
                          <label className="label">
                            <span className="label-text text-white/80 text-lg">
                              Participant Name
                            </span>
                          </label>
                          <div className="flex items-center px-3 bg-[#35485B] rounded-full">
                            <FaUser className="text-[#0495FF]" />
                            <input
                              type="text"
                              placeholder="Participant Name"
                              name="participantName"
                              defaultValue={camp.participantName}
                              readOnly
                              className="input focus:outline-none border-none text-white bg-[#35485B]"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-control col-span-2">
                          <label className="label">
                            <span className="label-text text-white/80 text-lg">
                              Description
                            </span>
                          </label>
                          <textarea
                            placeholder="Enter description here..."
                            name="description"
                            className="textarea focus:outline-none border-none text-white bg-[#35485B]"
                            required
                          />
                        </div>

                        {/* Image Upload Section */}
                        <div className="form-control col-span-2">
                          <label className="label">
                            <span className="label-text text-white/80 text-lg">
                              Select Your Photo
                            </span>
                          </label>
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="file-input focus:outline-none border-none text-white bg-[#35485B]"
                            required
                          />
                        </div>

                        {/* Rating Section */}
                        <div className="form-control col-span-2">
                          <label className="label">
                            <span className="label-text text-white/80 text-lg">
                              Rating
                            </span>
                          </label>
                          <div className="flex items-center px-3 bg-[#35485B] rounded-full">
                            <ReactStars
                              count={5}
                              size={24}
                              color1={"#ccc"}
                              color2={"#0495FF"}
                              onChange={(newRating) => setRating(newRating)}
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6 col-span-2 mx-auto">
                          <button className="btn btn-ghost text-white px-16 text-lg w-fit bg-[#0495FF]">
                            {load ? <Spinner color="blue" /> : "Submit"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle text-white btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        ))}
      </div>
    </div>
  );
};
export default RegisterCamp;
