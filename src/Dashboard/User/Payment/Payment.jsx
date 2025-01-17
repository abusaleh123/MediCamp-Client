import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useLoaderData } from "react-router-dom";



// TODO: Add Publishable Key 
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
const Payment = () => {
    const data = useLoaderData()
   
    return (
        <div>
            <h1 className="text-7xl text-white py-16">Payment Now</h1>
            <div>
            <Elements stripe={stripePromise}>
            <CheckOutForm data={data}></CheckOutForm>
            </Elements>
            </div>
        </div>
    );
};

export default Payment;