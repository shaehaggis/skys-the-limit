import * as React from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import axios from "axios";

const PaymentsForm = ({ amount, confirm }) => {
  const submitPayment = async (token, buyer) => {
    console.info({ token, buyer });
    const response = await axios.post("http://localhost:5000/api/payment", {
      amount: amount * 100,
      token: token.token,
    });

    console.log(response);
    if (response.status === 200) {
      confirm();
    }
  };

  return (
    <PaymentForm
      /**
       * Identifies the calling form with a verified application ID generated from
       * the Square Application Dashboard.
       */
      applicationId="sandbox-sq0idb-hnVkJqGCAR2nkcZhdhhuaQ"
      /**
       * Invoked when payment form receives the result of a tokenize generation
       * request. The result will be a valid credit card or wallet token, or an error.
       */
      cardTokenizeResponseReceived={(token, buyer) => {
        submitPayment(token, buyer);
      }}
      /**
       * This function enable the Strong Customer Authentication (SCA) flow
       *
       * We strongly recommend use this function to verify the buyer and reduce
       * the chance of fraudulent transactions.
       */
      // createVerificationDetails={() => ({
      //   amount: "1.00",
      //   /* collected from the buyer */
      //   billingContact: {
      //     addressLines: ["123 Main Street", "Apartment 1"],
      //     familyName: "Doe",
      //     givenName: "John",
      //     countryCode: "AU",
      //     city: "London",
      //   },
      //   currencyCode: "AUD",
      //   intent: "CHARGE",
      // })}
      /**
       * Identifies the location of the merchant that is taking the payment.
       * Obtained from the Square Application Dashboard - Locations tab.
       */
      locationId="LS83QHYE86NCR"
    >
      <CreditCard />
    </PaymentForm>
  );
};

export default PaymentsForm;
