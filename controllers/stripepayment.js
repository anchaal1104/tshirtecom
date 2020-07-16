const stripe =require("stripe")("sk_test_51H43Z5GPY0PIC3UGml6uF6wjF2m2gyU8xomloMHnxqQ4eMVyMSk5pv9Vule9fuhgTmD90HeXXYk0mjqQjemhlZhN00PMCfEHpu")
const uuid=require("uuid/v4");
const { result } = require("lodash");
const { TokenExpiredError } = require("jsonwebtoken");
exports.makepayment = (req, res) => {
    const {products,token}=req.body
   console.log("Products",products)
   let amount=0;
   products.map(p=>{
       amount=amount+ p.price
   })
  
   const idempotencyKey=uuid()
   return stripe.customers.create({
       email:token.email,
       source:token.id,

   }).then(customer=>{
    stripe.charges.create({
        amount:amount*0.07685,
        currency:'inr',
        customer:customer.id ,
        receipt_email:TokenExpiredError.email,
        description:"test account",
        shipping:{
            name:token.card.name,
            address:{
                line1:token.card.address_line1,
                line2:token.card.address_line2,
                city:token.card.address_city,
                country:token.card.address_country,
                postal_code:token.card.address_zip
            }
        }
    },{idempotencyKey})
     .then(result=>res.status(200).json(result))  
     .catch(err=>console.log(err))
})


  };
  