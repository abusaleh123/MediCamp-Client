import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { Helmet } from "react-helmet";

const UserProfile = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useAuth();

  const [load, setLoad] = useState(false);
  const handleClick = () => {
    setLoad(true);

    setTimeout(() => {
      setLoad(false);
    }, 3000);
  };

  const fetchAdminProfile = async (email) => {
    const response = await axiosSecure.get(`/profile?email=${email}`);
    return response.data;
  };

  const {
    data: profile,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminProfile", user?.email],
    queryFn: () => fetchAdminProfile(user.email),
    enabled: !!user?.email,
  });

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_API = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleUpdate = async (e, id) => {
    e.preventDefault(); // Prevent form submission and page reload

    const formData = new FormData(e.target);

    try {
      let imageUrl = formData.get("photo"); // Existing photo URL

      // Check if a new image is selected
      if (formData.get("image") && formData.get("image").size > 0) {
        const imageFile = formData.get("image");
        const imageUploadFormData = new FormData();
        imageUploadFormData.append("image", imageFile);

        const imageUploadRes = await axios.post(
          image_hosting_API,
          imageUploadFormData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );

        imageUrl = imageUploadRes.data.data.url; // New image URL
      }

      formData.set("photo", imageUrl); // Update photo field with either new or existing URL

      const updatedData = Object.fromEntries(formData.entries());

      await axiosSecure.put(`/profile/${id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Profile Update Successful!",
        text: "Your Profile Update Successfully",
        confirmButtonText: "Close",
        customClass: {
          confirmButton: "custom-confirm-button",
          popup: "custom-popup",
          title: "custom-title",
          icon: "custom-icon",
        },
        buttonsStyling: true,
      });

      refetch();
      document.getElementById("my_modal_4").close();
    } catch (error) {
      // console.error("Error updating profile:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="text-white my-20  mx-auto  py-10 md:w-10/12">
      <Helmet>
        <title>Profile | MediCamp</title>
      </Helmet>
      <h1 className="text-4xl text-center mb-10">My Profile</h1>
      <div className="bg-[#10273D] py-10  rounded-xl">
        <div>
          {profile.map((prof) => (
            <div className="flex flex-col items-center" key={prof._id}>
              <div>
                <img
                  className="lg:w-52 border-2 p-2 border-blue-500 lg:h-52 w-28 h-28 object-cover rounded-full"
                  src={prof.photo}
                  alt=""
                />
              </div>
              <h1 className="text-2xl mt-6">{prof.name}</h1>
              <div className="md:flex justify-center md:justify-normal text-center items-center mt-4 gap-6">
                <p className="text-gray-400">Email: {prof.email}</p>
                <p className="text-gray-400">Creation: {prof.creationTime}</p>
              </div>
              <button
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
                className="btn btn-ghost bg-[#0495FF] text-lg mt-8"
              >
                Update
              </button>
            </div>
          ))}
        </div>

        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-full max-w-5xl bg-[#1E3348]">
            <div className="flex justify-center items-center">
              <div className="hero-content p-8 rounded-lg">
                {profile.map((prof) => (
                  <div key={prof._id}>
                    <form
                      onSubmit={(e) => handleUpdate(e, prof._id)}
                      className="card-body"
                    >
                      <div className=" gap-6">
                        <div className="form-control col-span-1">
                          <label className="label">
                            <span className="label-text text-white/80 text-lg">
                              Name
                            </span>
                          </label>
                          <div className="flex items-center px-3 bg-[#35485B] rounded-full">
                            <input
                              type="text"
                              placeholder="Name"
                              name="name"
                              defaultValue={prof.name}
                              className="input focus:outline-none w-full border-none text-white bg-[#35485B]"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-control col-span-1">
                          <label className="label">
                            <span className="label-text text-white/80 text-lg">
                              Email
                            </span>
                          </label>
                          <div className="flex items-center px-3 bg-[#35485B] rounded-full">
                            <input
                              type="email"
                              placeholder="Email"
                              name="email"
                              defaultValue={prof.email}
                              className="input focus:outline-none w-full border-none text-white bg-[#35485B]"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-control col-span-2">
                          <label className="label">
                            <span className="label-text text-white/80 text-lg">
                              Image
                            </span>
                          </label>
                          <div className="flex items-center px-3 bg-[#35485B] rounded-full">
                            <input
                              type="file"
                              name="image"
                              className="py-3 px-3 file-input-ghost w-full cursor-pointer rounded-full focus:text-white focus:outline-none border-none text-white bg-[#35485B]"
                            />
                            <input
                              type="hidden"
                              name="photo"
                              defaultValue={prof.photo}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={handleClick}
                        className="form-control mt-6 col-span-2 mx-auto"
                      >
                        <button className="btn btn-ghost text-white px-16 text-lg w-full bg-[#0495FF]">
                          {load ? (
                            <Spinner color="blue" />
                          ) : (
                            <span>Submit</span>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                ))}
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
      </div>
    </div>
  );
};

export default UserProfile;
