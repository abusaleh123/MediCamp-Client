import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";


const ContactUs = () => {
const {theme } = useAuth()

    const onSubmit = async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(event.target);
  
      formData.append("access_key", "5db32ea6-1462-41b7-9b69-5e5268df05ce");
  
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
  
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());
  
      if (res.success) {
        // console.log("Success", res);
        Swal.fire("Your Message Sent Successful..");
        form.reset()
      }
    };
      return (
          <div className={` ${theme === 'dark' ? 'bg-[#FCFCFF]' : 'bg-black text-white/90'} py-20`}>
              <section id="contact" class=" p-8">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="lg:text-6xl md:text-4xl text-2xl  font-bold  mb-4">Contact Us</h2>
      <p class="text-lg text-gray-600 mb-6">Have any questions or feedback? We would love to hear from you!</p>
  
      <form onSubmit={onSubmit} method="POST" class="space-y-4">
      <div className="md:flex gap-6 ">
  
  
      <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" placeholder="Your Name" name="name" className="input focus:outline-none input-bordered" required />
          </div>
      <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="Your Email" name="email" className="input input-bordered focus:outline-none " required />
          </div>
          </div>
      
        <textarea name="message" placeholder="Your Message" class="w-full p-3  focus:outline-none  border border-gray-300 rounded-lg" rows="6" required></textarea>
        <button   type="submit" class="w-full bg-[#007EFF] py-3 text-lg font-bold  text-white rounded-lg hover:bg-blue-600">Send Message</button>
      </form>
  
    </div>
  </section>
  
          </div>
      );
  };
  
  export default ContactUs;