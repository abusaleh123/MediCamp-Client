import logo from "../../assets/Images/m.png";
import { NavLink } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import Swal from "sweetalert2";

const Footer = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your subscription has been successfully submitted.",
        });
        event.target.reset(); // Reset the form
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Network error! Please check your internet connection.",
      });
    }
  };

  return (
    <div className="bg-[#031B33] py-10">
      <div className="w-10/12 mx-auto">
        <div className="md:flex  justify-center md:justify-between w-full mx-auto text-center gap-40 items-center">
          <div className="flex gap-1 mb-4 md:mb-0 justify-center   md:justify-start items-center">
            <img className="w-20" src={logo} alt="MediCamp Logo" />
            <h1 className="text-4xl text-white">MediCamp</h1>
          </div>
          <div>
            <h1 className="text-4xl md:text-start  text-white">
              Medical Camp Management System .......
            </h1>
          </div>
        </div>
        <p className="border-t my-6 border-gray-600"></p>

        <div className="md:flex justify-center  text-center md:text-start md:justify-between gap-10">
          <div className="text-white">
            <h1 className="text-3xl">About Us</h1>
            <p className="md:text-lg text-sm mb-6 w-5/6 text-white/40">
              An intuitive platform to manage medical camps, registrations, and
              participant details for efficient operations.
            </p>
            <p className="text-xl mb-4">All Over the World</p>
            <p className="text-xl">Thank you all for visiting Us</p>
          </div>
         



          <div>
            <h1 className="text-3xl text-white">Subscribe Newsletter</h1>
            <div className="mt-5 flex text-start gap-5">
              <p className="p-2 h-12 w-12 rounded-full bg-[#1E3348]">
                <IoIosNotificationsOutline className="text-yellow-200 text-3xl" />
              </p>
              <p className="text-sm md:text-lg text-white/40">
                Signup for our newsletter for the latest updates from our medical team anytime.
              </p>
            </div>
            <form className="mt-6" onSubmit={handleSubmit}>
              <input type="hidden" name="access_key" value="494eaf9c-6273-4db9-a7f2-fd119fa9ef18" />

              <div className="flex gap-0 border items-center px-4 rounded-r-full border-gray-700">
                <input
                  type="email"
                  name="email"
                  placeholder="Write your email here ..."
                  className="input border py-8 bg-transparent text-white/80 focus:outline-none w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#0495FF] flex justify-center items-center rounded-full p-2 w-12 h-12"
                >
                  <FaArrowRightLong className="text-white text-xl" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <p className="border-t my-8 border-gray-600"></p>


        <div className="md:flex justify-around text-center  items-center text-white">
     
  <aside className="flex items-center gap-2">
  
    <p>Copyright © {new Date().getFullYear()} - All right reserved by  MediCamp</p>
  </aside>
 

  <nav className="flex justify-center mt-6 md:mt-0 md:justify-end gap-4">
    <a href="https://x.com/MdAbuSalehNoor1" target="_blank">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
      </svg>
    </a>
    <a>
    <svg xmlns="http://www.w3.org/2000/svg"  width="24"
        height="24"
        viewBox="0 0 16 16"
        className="fill-current" fill="currentColor" class="bi bi-linkedin" >
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>
    </a>
    <a href="https://www.facebook.com/mdabusalehnoor9" target="_blank">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
      </svg>
    </a>
  </nav>




        </div>
      </div>
    </div>
  );
};

export default Footer;

