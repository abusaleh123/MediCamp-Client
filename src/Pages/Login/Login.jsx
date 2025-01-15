import register from "../../assets/Json/register.json";
import bg from "../../assets/Images/registerbg.jpg";
import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/Images/google.png";
import Lottie from "lottie-react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { SignInWithEmailPass, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    SignInWithEmailPass(email, password)
      .then((result) => {
        // console.log(result);
        setUser(result);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You Are Successfully Loged In",

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
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: "You are failed to login",

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
  return (
    <div className="py-10 ">
      {/* <Helmet>
                <meta charSet="utf-8" />
                <title>Blog Sphere || Register</title>
             
            </Helmet> */}
      <div className="  lg:flex-row flex-col-reverse flex pr-4 w-10/12 mx-auto rounded-xl md:w-10/12  justify-center items-center backdrop-blur-2xl shadow-2xl">
        <div className="lg:w-7/12">
          <div className="pt-10 lg:pb-28 pb-10">
            <div className="">
              <div className="  md:w-10/12 lg:w-11/12 mx-auto   flex flex-col justify-center rounded-xl  backdrop-blur-md  bg-transparent ">
                <div className="hero-content flex-col  ">
                  <div className="card bg-blend-hard-light rounded-xl w-full max-w-sm shrink-0  shadow-2xl">
                    <form
                      onSubmit={handleLogin}
                      className="card-body  backdrop-blur-sm bg-white/20 flex justify-center  rounded-xl"
                    >
                      <div>
                        <h1 className="text-4xl font-bold  text-[#0495FF]">
                          Login Now
                        </h1>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text ">Email</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          className="input focus:outline-none  bg-white/20 input-bordered"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text  text-md">Password</span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          placeholder="password"
                          className="input focus:outline-none  bg-white/20 input-bordered"
                          required
                        />
                      </div>
                      <div className="form-control mt-6">
                        <button className="btn bg-[#0495FF] btn-ghost hover:bg-[#0495FF] hover:border-none  hover:border-white text-white font-bold text-lg">
                          Login
                        </button>
                      </div>
                      <p className="mt-2">
                        Already Have An Account?please{" "}
                        <span
                          style={{
                            background:
                              "linear-gradient(to top, #5350C3 10%, #8784F8 79%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                          className="font-bold "
                        >
                          <Link className="text-lg" to={"/login"}>
                            Register
                          </Link>
                        </span>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="divider w-1/4  mx-auto">OR</div>
              <button className="border border-gray-400 py-1 rounded-full flex items-center justify-center backdrop-blur-3xl bg-white/20 gap-4 xl:w-7/12 md:w-8/12 w-fit lg:w-9/12 2xl:w-6/12  mx-auto px-4">
                <img className="w-10" src={google} alt="" />
                <h1 className="md:text-lg md:w-96 xl:w-96  2xl:w-fit">
                  Register With Google
                </h1>
              </button>
            </div>
          </div>
        </div>
        <div>
          <Lottie animationData={register} loop={true}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Login;
