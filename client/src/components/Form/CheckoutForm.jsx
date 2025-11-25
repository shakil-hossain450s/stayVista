import PropTypes from 'prop-types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import './CheckoutForm.css';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

const CheckoutForm = ({ closeModal, bookingInfo }) => {
  const { user } = useAuth();
  const { price } = bookingInfo;
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const amountInCents = price * 100;
  console.log(amountInCents);

  // handle submit
  const handleSubmit = async (e) => {
    // Block native form submission.
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError('');

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('error in createPayment method:', error);
      setError(error.message);
      setLoading(false);
      return;
    } else {
      console.log('payment method:', paymentMethod);
      const { data } = await axiosSecure.post(`/api/payments/create-payment-intent`, { amount: amountInCents });

      console.log(data);

      console.log("Backend Response:", data);

      const clientSecret = data.clientSecret;

      console.log("Client Secret:", clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName,
            email: user?.email
          }
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        console.log(result.error);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast.success('Payment Successfull!');
          setError('');
        }
      }

      setLoading(false);
    }



  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }} />

        {/* error message */}
        {error && <p className='text-red-500'>{error}</p>}

        {/* buttons */}
        <div className='flex mt-2 justify-around'>
          <button
            type='submit'
            disabled={!stripe || loading}
            className='inline-flex justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'

          >
            {loading ? 'Processing...' : `Pay $${price}`}
          </button>
          <button
            onClick={closeModal}
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
          >
            No
          </button>
        </div>
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  closeModal: PropTypes.func,
  bookingInfo: PropTypes.object
}

export default CheckoutForm;