import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/m.png";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import auth from "../../firebase.init";
import Swal from "sweetalert2";
import { Avatar, Menu, MenuItem, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Navbar = () => {
  const { user, logOut, open, setOpen, toggleTheme, theme } = useAuth();
  const { axiosPublic } = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

  const isDropdownOpen = Boolean(anchorEl);
  const isMobileDropdownOpen = Boolean(mobileAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  const openDrawer = () => setOpen(true);

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/profilePublic?email=${user.email}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [user?.email, axiosPublic]);

  const handleLogOut = () => {
    logOut(auth).then(() => {
      navigate("/login");
      Swal.fire({
        icon: "success",
        title: "Log Out Successful!",
        text: "You Are Successfully Logged Out",
        confirmButtonText: "Close",
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
    } else {
      return "bg-[#031B33] text-white";
    }
  })();

  return (
    <div className={`w-full ${navStyle} sticky top-0 z-50`}>
      <div className="navbar w-11/12 z-50 mx-auto flex justify-between py-8">
        <div className="navbar-start">
          <Link to={"/"} className="flex items-center gap-2 justify-center">
            <img className="w-14" src={logo} alt="Logo" />
            <span className="font-semibold text-white hidden text-5xl md:inline-block">
              MediCamp
            </span>
          </Link>
        </div>

        <div className="navbar-end gap-1 md:gap-2">
          <div className="hidden md:flex">
            <ul className="menu menu-horizontal md:gap-6 lg:gap-8 px-3 lg:text-xl font-semibold">
              <input onClick={toggleTheme} type="checkbox" className="toggle toggle-info" defaultChecked />
              <NavLink className="nav" to={"/"}>
                Home
              </NavLink>
              <NavLink className="nav" to={"/availableCamp"}>
                Available Camps
              </NavLink>
            </ul>
          </div>

          {user ? (
            <div>
              {users?.map((prof) => (
                <Avatar
                  key={prof?.id}
                  onClick={handleClick}
                  src={prof?.photo}
                  alt="User"
                  sx={{ width: 56, height: 56, cursor: "pointer" }}
                />
              ))}

              <Menu
                anchorEl={anchorEl}
                open={isDropdownOpen}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: "#031B33",
                    color: "#fff",
                    border: "2px solid #007EFF",
                    borderRadius: "10px",
                  },
                }}
              >
                <MenuItem>
                {
                  users.map((prof) =>   <Avatar
                  className="bg-black"
                  src={prof?.photo}
                  alt="User"
                  
                  sx={{ marginRight: 2 }}
                />)
                }
                  {
                    users.map(prof => <>{prof.name}</>) 
                  }
                </MenuItem>
                <MenuItem onClick={openDrawer}>
                  <Link
                    to="/dashboard"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Dashboard
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login" >
           <button className="btn btn-ghost bg-[#007EFF] md:text-lg text-md px-8 text-white">Join Us</button>
            </Link>
          )}

<IconButton
  edge="end"
  aria-label="menu"
  aria-controls="mobile-menu"
  aria-haspopup="true"
  onClick={handleMobileMenuOpen}
  className="lg:hidden"
  sx={{ display: { md: 'none' }, color: 'white' }} // Ensures Material UI respects the display rule
>
            <MenuIcon />
          </IconButton>

          <Menu
            id="mobile-menu"
            anchorEl={mobileAnchorEl}
            open={isMobileDropdownOpen}
            onClose={handleMobileMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#031B33",
                color: "#fff",
                border: "2px solid #007EFF",
                borderRadius: "10px",
              },
            }}
          >
            <MenuItem onClick={handleMobileMenuClose}>
            <input onClick={toggleTheme} type="checkbox" className="toggle toggle-info" defaultChecked />
              <NavLink className="nav" to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
                Home
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
              <NavLink className="nav" to={"/availableCamp"} style={{ color: "inherit", textDecoration: "none" }}>
                Available Camps
              </NavLink>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
