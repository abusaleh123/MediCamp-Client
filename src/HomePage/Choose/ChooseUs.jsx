import bg from "../../assets/Images/gray2.jpg";
import question from '../../assets/Images/question.jpg'

const ChooseUs = () => {
  return (
    <div className=" bg-[#031B33]">
      <div className="w-11/12  mx-auto py-20 ">
        <div data-aos="fade-down"
        data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
        className="mx-auto text-center mb-10">
          <h1 className="lg:text-7xl text-white text-4xl md:text-5xl
">Have Any Question</h1>
          <p className="text-sm text-white/40 md:text-lg mt-2">Find below our frequently asked questions. If you have other questions please contact us.</p>
        </div>

        <div className="gap-10 xl:flex  ">
          <div data-aos="fade-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="xl:w-8/12 border p-4 mb-8 md:mb-0 rounded-xl">
            <img className="rounded-xl w-full h-full object-cover" src={question} alt="" />
          </div>
          <div data-aos="fade-up"
               data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="xl:w-9/12">
            <div className="collapse collapse-plus border">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-white text-lg lg:text-lg font-medium">
              What is the main purpose of the Medical Camp Management System?
              </div>
              <div className="collapse-content">
                <p className="text-white/70">The primary purpose of MCMS is to streamline the organization, coordination, and management of medical camps. It facilitates efficient communication between organizers and participants, allowing users to register for camps, manage profiles, and track participation and payment history.</p>
              </div>
            </div>
            <div className="collapse collapse-plus border">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-white  text-lg lg:text-lg font-medium">
              How can healthcare professionals participate in the system?
              </div>
              <div className="collapse-content">
                <p className="text-white/70">Healthcare professionals can be added by organizers when creating or updating camp details. Their names, specialties, and contact information are displayed in camp details, helping participants to understand who will be providing medical services at each camp.</p>
              </div>
            </div>
            <div className="collapse collapse-plus border">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-white  text-lg lg:text-lg font-medium">
              What information is required from participants during camp registration?
              </div>
              <div className="collapse-content">
                <p className="text-white/70">Participants need to provide their name, email, age, phone number, gender, and an emergency contact. This information, along with the camp's details, helps organizers manage the camp efficiently and ensures that healthcare professionals are informed about the participants.</p>
              </div>
            </div>

            <div className="collapse collapse-plus border">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-white  text-lg lg:text-lg font-medium">
              How does the system help in managing diseases during camps?
              </div>
              <div className="collapse-content">
                <p className="text-white/70">The system allows organizers to categorize camps based on specific medical specialties or disease focus areas (e.g., cardiology, pediatrics). This helps participants find camps that address their specific health concerns and ensures that they receive targeted medical care.</p>
              </div>
            </div>

            <div className="collapse collapse-plus border">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-white  text-lg lg:text-lg font-medium">
              Can participants provide feedback on the camps?
              </div>
              <div className="collapse-content">
                <p className="text-white/70">Yes, participants can provide feedback and ratings on the camps after their participation. This feedback is collected and displayed on the home page, helping to improve future camps and provide insights into the quality of healthcare services</p>
              </div>
            </div>


            <div className="collapse collapse-plus border">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-white  text-lg lg:text-lg font-medium">
             How are payment and registration statuses managed?
              </div>
              <div className="collapse-content">
                <p className="text-white/70">Payment and registration statuses are tracked through the system. Participants can see their payment status (paid/unpaid) and registration confirmation status (pending/confirmed) in their dashboard. Organizers can update these statuses after verifying payments or managing cancellations.</p>
              </div>
            </div>


            <div className="collapse collapse-plus border">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-white  text-lg lg:text-lg font-medium">
              How can participants search for specific medical camps?
              </div>
              <div className="collapse-content">
                <p className="text-white/70">Participants can use the search bar on the Available Camps page to look for specific camps by entering keywords, dates, or healthcare professional names. This feature helps users quickly find camps relevant to their health needs.</p>
              </div>
            </div>
            <div className="collapse collapse-plus border">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-white text-lg lg:text-lg font-medium">
              How does the system support healthcare professionals in managing patient data
              </div>
              <div className="collapse-content">
                <p className="text-white/70">Healthcare professionals can access participant details for each camp, including personal information and medical histories (if provided), through the organizer's dashboard. This allows them to prepare in advance and offer personalized care during the camps.</p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
