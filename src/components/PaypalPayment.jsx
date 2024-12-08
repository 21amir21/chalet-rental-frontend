import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalPayment = () => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={styles}
        createOrder={onCreateOrder}
        onApprove={onApprove}
        onError={onError}
        fundingSource="paypal"
      />
    </PayPalScriptProvider>
  );
};

export default PaypalPayment;
