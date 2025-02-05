# MediCamp [Medical Camp Management System (MCMS)]

A streamlined Medical Camp Management System (MCMS) for efficient camp scheduling, patient registration, treatment tracking, and resource management.




![Alt text](https://github.com/abusaleh123/MediCamp-Client/blob/5b8c10e2681e94c76d8ee60b50c762aa3528fe8d/Screenshot%202025-01-30%20080752.png)



## Key Features :

- User-Friendly Navigation : 
A responsive navbar with options like Home, Available Camps, and Join Us. Logged-in users see a profile picture with a dropdown for Dashboard and Logout.
-  Camp Management :
Organizers can add, update, and delete camp details via a dashboard. Camps are displayed with essential details like name, fees, date, and location.
- Participant Registration :
A dedicated "Join Camp" feature lets participants register for camps via a modal form. Information is stored in the database, updating the participant count dynamically.

- Feedback and Ratings :
After completing a camp and payment confirmation, participants can provide feedback and ratings. Displayed on the home page to enhance system clarity.

- Search and Sort Camps :
Users can search camps by keywords, dates, or other criteria and sort by participant count, fees, or alphabetical order.

- Participant and Organizer Dashboards :
Separate dashboards for participants and organizers with routes for profile management, registered camps, analytics, and payment history.

- Secure Payment and Confirmation :
Stripe integration for camp payments. Payment and confirmation statuses are updated dynamically with feedback notifications for each transaction.

- JWT-Based Authentication :
JSON Web Token (JWT) ensures secure access to sensitive routes and data. Authentication includes social login for easy access.

- Analytics and Visualization :
Participants can view lifetime camp analytics, such as registered camps and fees, displayed using Recharts or similar visualization libraries.

- Responsive Design and Accessibility :
The entire website is responsive across mobile, tablet, and desktop, including dashboards and modals. Sweet alerts and toasts improve user experience during CRUD operations and authentication.



  # Main Technology:

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg" height="40" alt="tailwindcss logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" height="40" alt="firebase logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="40" alt="mongodb logo"  />

</div>

#


## Dependencies


 - [@emotion/react](https://www.npmjs.com/package/@emotion/react) - ^11.14.0
- [@emotion/styled](https://www.npmjs.com/package/@emotion/styled) - ^11.14.0
- [@material-tailwind/react](https://www.npmjs.com/package/@material-tailwind/react) - ^2.1.10
- [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) - ^6.4.0
- [@mui/material](https://www.npmjs.com/package/@mui/material) - ^6.4.0
- [@stripe/react-stripe-js](https://www.npmjs.com/package/@stripe/react-stripe-js) - ^3.1.1
- [@stripe/stripe-js](https://www.npmjs.com/package/@stripe/stripe-js) - ^5.5.0
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query) - ^5.64.1
- [aos](https://www.npmjs.com/package/aos) - ^3.0.0-beta.6
- [axios](https://www.npmjs.com/package/axios) - ^1.7.9
- [firebase](https://www.npmjs.com/package/firebase) - ^11.1.0
- [framer-motion](https://www.npmjs.com/package/framer-motion) - ^11.17.0
- [localforage](https://www.npmjs.com/package/localforage) - ^1.10.0
- [lottie-react](https://www.npmjs.com/package/lottie-react) - ^2.4.0
- [match-sorter](https://www.npmjs.com/package/match-sorter) - ^8.0.0
- [moment](https://www.npmjs.com/package/moment) - ^2.30.1
- [motion](https://www.npmjs.com/package/motion) - ^11.17.0
- [react](https://www.npmjs.com/package/react) - ^18.3.1
- [react-dom](https://www.npmjs.com/package/react-dom) - ^18.3.1
- [react-helmet](https://www.npmjs.com/package/react-helmet) - ^6.1.0
- [react-hook-form](https://www.npmjs.com/package/react-hook-form) - ^7.54.2
- [react-icons](https://www.npmjs.com/package/react-icons) - ^5.4.0
- [react-rating](https://www.npmjs.com/package/react-rating) - ^2.0.5
- [react-rating-stars-component](https://www.npmjs.com/package/react-rating-stars-component) - ^2.2.0
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - ^7.1.1
- [react-toastify](https://www.npmjs.com/package/react-toastify) - ^11.0.2
- [recharts](https://www.npmjs.com/package/recharts) - ^2.15.0
- [sort-by](https://www.npmjs.com/package/sort-by) - ^1.2.0
- [sweetalert2](https://www.npmjs.com/package/sweetalert2) - ^11.15.10


  ## DevDependencies

 - [@eslint/js](https://www.npmjs.com/package/@eslint/js) - ^9.17.0
- [@types/react](https://www.npmjs.com/package/@types/react) - ^18.3.18
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) - ^18.3.5
- [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) - ^4.3.4
- [autoprefixer](https://www.npmjs.com/package/autoprefixer) - ^10.4.20
- [daisyui](https://www.npmjs.com/package/daisyui) - ^4.12.23
- [eslint](https://www.npmjs.com/package/eslint) - ^9.17.0
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) - ^7.37.2
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) - ^5.0.0
- [eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh) - ^0.4.16
- [globals](https://www.npmjs.com/package/globals) - ^15.14.0
- [postcss](https://www.npmjs.com/package/postcss) - ^8.4.49
- [tailwindcss](https://www.npmjs.com/package/tailwindcss) - ^3.4.17
- [vite](https://www.npmjs.com/package/vite) - ^6.0.5


#
  ## Live Link : 

- https://medicamp-a1652.web.app
- https://medicamp-a1652.firebaseapp.com

## Organizer Email & Password : 
- Email : abusaleh88889@gmail.com
- Password : `123456As#`


##
MediCamp is a dynamic platform offering easy navigation with features like camp management, participant registration, and secure payment integration via Stripe. Organizers can manage camp details, while participants can register and provide feedback through a modal form. The site allows users to search, sort, and view camps by various criteria. Separate dashboards for participants and organizers offer insights into profile management, analytics, and payment history. JWT-based authentication ensures secure access, while social logins simplify the process. The platform is responsive, accessible, and enhanced with sweet alerts and toasts to improve user experience.
