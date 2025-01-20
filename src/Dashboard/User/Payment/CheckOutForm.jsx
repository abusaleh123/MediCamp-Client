import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const CheckOutForm = ({data}) => {
    const {user} = useAuth()
    const stripe = useStripe();
    const [err, setErr] = useState("")
    const elements = useElements();
    const {axiosSecure} = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState([]);
    const navigate = useNavigate()
  const {fees} = data;
  const Fee = parseInt(fees);
console.log(data._id);
useEffect(() => {
 if(Fee > 0){
    axiosSecure.post('/create-payment-intent', {fees : Fee})
    .then(res => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret)
    })
 }
},[axiosSecure, fees])

// console.log(stripe);
  
    const handleSubmit = async( e) => {
        e.preventDefault()
        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement)
        if(card === null ) {
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card
        })
        if(error) {
            console.log("Payment Error", error);
            setErr(error.message)
        }else{
            console.log("Payment Method", paymentMethod);
            setErr("")
        }
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'Anonymous',
                    name: user?.displayName || 'Anonymous'
                }
            }
        })
        if(confirmError){
            console.log('Confirm Error', );
        }else{
            console.log('Payment-Intent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('Transaction Id', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                    const payment = {
                        email: user?.email,
                        Fees : Fee,
                        name: data.name,
                        transactionId: paymentIntent.id,
                        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                        CampId: data._id,
                        status: 'pending'

                    }
                    const res = await axiosSecure.post('/payments', payment);
                    if(res.data){
                        navigate('/dashboard/registered')
 Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Thank You For Payment , Best Of Luck",
         
        confirmButtonText: 'Close',
     
        showCancelButton: false,
        customClass: {
          confirmButton: 'custom-confirm-button',
        
          popup: 'custom-popup', 
          title: 'custom-title', 
          icon: 'custom-icon' ,
          
        },
        buttonsStyling: true
      });
                    }
                    



            }
        }

    }

    return (
      <div className=" mx-auto p-6 bg-[#10273D] shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className=" gap-4">
        <div className="w-2/4 mx-auto mb-10 text-white">
          <CardElement
            className="border-none bg-[#35485B] text-white p-4 rounded"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#FFFFFF',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        <div className="w-fit mx-auto flex flex-col justify-between">
          <button 
            className="btn btn-primary w-full text-white bg-[#007EFF] hover:bg-[#007EFF] border border-blue-500 py-2 px-4 rounded"
            type="submit" 
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          {err && <p className="text-red-500 mt-2">{err}</p>}
          {transactionId && <p className="text-green-500 mt-2">Your Transaction ID: {transactionId}</p>}
        </div>
      </form>
    </div>
    
    );
};

export default CheckOutForm;
