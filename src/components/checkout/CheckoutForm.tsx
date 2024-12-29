import React from 'react';
import { useStore } from '../../lib/store';
import { stripe } from '../../lib/stripe';
import { supabase } from '../../lib/supabase';

export function CheckoutForm() {
  const { cart, clearCart } = useStore();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please sign in to checkout');

      const { data: { client_secret }, error: paymentError } = await supabase
        .functions.invoke('create-payment-intent', {
          body: { cart },
        });

      if (paymentError) throw paymentError;

      const stripeInstance = await stripe;
      if (!stripeInstance) throw new Error('Stripe failed to initialize');

      const { error: stripeError } = await stripeInstance.confirmPayment({
        elements: {
          payment_method: {
            card: {
              token: client_secret,
            },
          },
        },
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
        },
      });

      if (stripeError) throw stripeError;

      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        {/* Stripe Elements will be injected here */}
        <div id="card-element" className="p-4 border rounded" />
        {error && (
          <p className="mt-2 text-red-500 text-sm">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </form>
  );
}