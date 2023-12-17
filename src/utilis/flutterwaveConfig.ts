export const configFlutterwave =(amount: number,name: string, email: string,phone: string)=>{
    const config = {
        public_key: "FLWPUBK_TEST-790eedb99b9c45bf0eb4a5a81e5cdd14-X",
        tx_ref: Math.random().toString(),
        amount: amount,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        // redirect_url: "http://localhost:3000/checkout/response?success=true",
        customer: {
          email: email,
          phone_number: phone,
          name: name,
        },
        customizations: {
          title: "Shopping items",
          description: "Payment for items in cart",
          logo: "https://sportbase.netlify.app/images/sneakerbase-logo.svg",
        },
      };
      return config
}

