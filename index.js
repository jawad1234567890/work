const Joi= require('joi');
const cors= require('cors');
const express = require ('express');
const { get } = require('mongoose');
// import express from 'express';
const app= express();
app.use(cors());

app.use(express.json());

const products=[
    {
        "id":1,
        "image":"https://media.istockphoto.com/id/1050088430/photo/caps-mittens-gloves-and-socks-are-stacked-in-a-circle.jpg?s=612x612&w=0&k=20&c=tmecqqWpOEL68GqUJW7KRaimjeCe42sNSE6ORfS2dQg=",
        "name":"Socks n Gloves",
        "averageratings":3.5,
        "price":"$20"}
        ,
    {
        "id":2,
        "image":"https://media.istockphoto.com/id/1074250674/photo/a-man-have-cold-on-the-sofa-at-home-with-winter-coat.jpg?s=612x612&w=0&k=20&c=uziLDfQvBF2lfd7j4mRhNGwn0l4P3N_77VPg35jwXIc=",
        "name":"Cool Breeze Blazer",
        "averageratings":4.2,
        "price":"$170"
    },
    {
        "id":3,
        "image":"https://media.istockphoto.com/id/997519640/photo/a-stack-of-plaids-and-scarves-in-the-hands-of-a-woman-in-a-gray-sweater-preparation-in-cold.jpg?s=612x612&w=0&k=20&c=04t7doDV_T99s1fygsJlk9GYBgDdtrInqTIxeYu9HsI=",
        "name":"Sack Of Warm Wears",
        "averageratings":3.6,
        "price":"$130"
    },
    {
        "id":4,
        "image":"https://media.istockphoto.com/id/533098559/photo/snow-kids.jpg?s=612x612&w=0&k=20&c=pl2MpKc3LtBafre3ak3oZPugqkFcZNyZEG_MXzIBx_Q=",
        "name":"Child Jacket",
        "averageratings":4.0,
        "price":"$80"
    },
    {
        "id":5, 
        "image":"https://media.istockphoto.com/id/1174772346/photo/the-crop-photo-of-young-couple-at-the-nature-park-in-cold-season-travel-adventure-love-story.jpg?s=612x612&w=0&k=20&c=ZVgfyjwVK-rwDI2yehnUgcBk3xyr-8mGd2h4ia_zJcI=",
        "name":"Chelsea Winter Shoes" ,
        "averageratings":4.3,
        "price":"$125"
    },
    {
        "id":6,
        "image":"https://media.istockphoto.com/id/187061773/photo/womans-legs-in-sheepskin-boots.jpg?s=612x612&w=0&k=20&c=3zFX4GZ0AkTm4HpGK_Q012yGqvVgSR5z9817gJuD4-Q=",
        "name":"Women Half Legs Shoes" ,
        "averageratings":4.7,
        "price":"$220"
    }
]
app.get ('/',(req,res)=>{
res.send('hello');
});

app.get('/products',(req,res)=>{
 res.json(products);
});
app.post('/products',(req,res)=>{
const schema={name:Joi.string().min(3).required(),};
const result =Joi.validate(req.body,schema);
console.log(result);



 if(result.error)   
 { res.status(400).send(result.error.details[0].message)
 return;}
 
 const product={
  id:products.length,
  name:req.body.name,
  image:req.body.image,
  averageratings:req.body.averageratings,
  price:req.body.price,
 };
 products.push(product);
 res.send(product);
 });
app.get('/products/:id',(req,res)=>{
const product=products.find(c=>c.id=== parseInt(req.params.id));
if(!product)
    res.status(404).send('Products Contains given id is not found...')
res.send(product);

});

const port=process.env.PORT ||5000;
app.listen(port, ()=>console.log(`Listening on Port ${port}....`))