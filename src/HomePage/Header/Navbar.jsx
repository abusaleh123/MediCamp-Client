import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/m.png";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import auth from "../../firebase.init";
import Swal from "sweetalert2";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import axios from "axios";
// import useAdmin from "../../Hooks/useAdmin";

const Navbar = () => {
  const { user, logOut, open, setOpen } = useAuth();
  const {axiosPublic} = useAxiosPublic()
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [users, setUsers] = useState([])

  const openDrawer = () => setOpen(true);
  useEffect(() => {
    if (user?.email) { // Ensure email exists before making the request
      axiosPublic.get(`/profilePublic?email=${user.email}`)
        .then((res) => {
          setUsers(res.data);
          // console.log(res.data);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [user?.email, axiosPublic]); // Add axiosPublic to dependencies as well

 

 


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = () => {
    logOut(auth).then((res) => {
      navigate("/login");
      refetch()
      Swal.fire({
        icon: "success",
        title: "Log Out Successful!",
        text: "You Are Successfully Logged Out",

        confirmButtonText: "Close",

        showCancelButton: false,
        customClass: {
          confirmButton: "custom-confirm-button",

          popup: "custom-popup",
          title: "custom-title",
          icon: "custom-icon",
        },
        buttonsStyling: true,
      });
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navStyle = (() => {
    if (location.pathname === "/") {
      return scrollPosition === 0
        ? "sticky top-0 z-10 bg-[#10273D] md:text-white w-11/12"
        : "sticky top-0 z-50 bg-[#031B33] w-11/12 text-white mx-auto shadow-md";
    } else if (location.pathname === "/availableCamp") {
      return "bg-[#031B33] text-white";
    } else if (location.pathname === "/register") {
      return "bg-[#031B33] text-white";
    } else if (location.pathname === "/login") {
      return "bg-[#031B33] text-white";
    } else if (location.pathname.startsWith("/camp-details/")) {
      return "bg-[#031B33] text-white";
    } else {
      return "w-11/12 mx-auto";
    }
  })();

  return (
    <div className={`w-full  ${navStyle} sticky top-0 z-50 `}>
      <div className={`navbar w-11/12 z-50  mx-auto flex justify-center py-8`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost w-fit lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              style={{
                background: "linear-gradient(to top, #5350C3 0%, #8784F8 0%)",
              }}
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-white font-bold text-lg rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <NavLink className={"nav"} to={"/"}>
                Home
              </NavLink>
              <NavLink className={"nav"} to={"/availableCamp"}>
                Available Camps
              </NavLink>
            </ul>
          </div>
          <Link to={"/"} className="flex items-center gap-2  justify-center ">
            <img className="w-14" src={logo} alt="" />
            <span className=" font-semibold text-white  hidden text-5xl  md:inline-block items-center md:text-5xl">
              MediCamp
            </span>
          </Link>
        </div>

        <div className="navbar-end gap-1 md:gap-2">
          <div className=" hidden lg:flex">
            <ul className="menu menu-horizontal md:gap-6 lg:gap-8 px-3 lg:text-xl font-semibold">
              <NavLink className={"nav"} to={"/"}>
                Home
              </NavLink>
              <NavLink className={"nav"} to={"/availableCamp"}>
                Available Camps
              </NavLink>
            </ul>
          </div>
          {/* {
              user ?  <>
              <img className="w-14 rounded-full h-14 object-cover" src={user.photoURL} alt="" />
              </> : <Link to={'/register'}  className="btn bg-[#0495FF] hover:bg-[#3e8bff] btn-ghost text-white md:text-lg px-8 text-sm w-14 md:w-fit font-semibold">Join US</Link>
             } */}

          {user ? (
            <div className="relative">
            {
              users?.map(prof => <img
                onClick={toggleDropdown}
                className="w-14 rounded-full h-14 object-cover cursor-pointer"
                src={prof?.photo}
                alt="User"
              />)
            }
            
              {isDropdownOpen && (
                <div className="absolute md:w-52 mt-2 -right-10  bg-[#031B33] shadow-lg border border-[#0495FF]  rounded-lg py-6">
                {
              users?.map(prof => <img
                // onClick={toggleDropdown}
                className="w-16 rounded-full h-16 object-cover cursor-pointer"
                src={prof?.photo}
                alt="User"
              />)
            }

                  <div className="px-4 py-2 text-white font-semibold">
                    {user.displayName}
                  </div>
                <Link onClick={openDrawer} className="text-left px-4 py-2 text-white " to={`${ '/dashboard'}`}>Dashboard</Link>

                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-4 py-2 text-white "
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={"/register"}
              className="btn bg-[#0495FF] hover:bg-[#3e8bff] btn-ghost text-white md:text-lg px-8 text-sm w-14 md:w-fit font-semibold"
            >
              Join Us
            </Link>
          )}
          {/* TODO: Sign up and profile pic show with dropdown */}
        </div>
      </div>
     
    </div>
  );
};

export default Navbar;
