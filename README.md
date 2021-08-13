# fp-kart - FirstPrinciples Kart

# E-commerce Application using MERN Stack

[fpKart](#) is an E-Commerce application where we have multiple category of products. In this application, we have two dashboard one for user and one for admin. In admin dashboard, admin can perform all CRUD operation on category & products also update order status. In User dashboard user can update their profile & password. 

![alt text]( https://i.ibb.co/9yLngTq/2021-08-11-8.png)
![alt text]( https://i.ibb.co/K6SLxqD/2021-08-11-11.png )
![alt text]( https://i.ibb.co/bm0gVX5/2021-08-11-12.png)
![alt text]( https://i.ibb.co/BVbVMjj/2021-08-11-13.png)
![alt text]( https://i.ibb.co/DrSyhV9/2021-08-11-10.png )
![alt text]( https://i.ibb.co/ZVvXMfT/2021-08-11-9.png)



### Stack Used
```
    React-JS
    React redux
    Redux Thunk
    Node-JS
    Express-JS
    MongoDB

```

### Integration 
```
    Razorpay for payment.
    AWS S3 Bucket for image files.

```

## Build Setup for client-side

• Go inside `Client` path in terminal and just type npm install.

• Create `.env` file in root directory of client folder and set the variable as mention in `src/config/env.sample.js` file. 

• Now, run the script `npm start`.

**Note: While setup the .env, don't use `/` at the end of REACT_APP_HOST_URL. Use as eg. http://localhost:3000**


## Build Setup for server-side

• Go inside `Server` path in terminal and just type npm install.

• Create `.env` file in root directory of server folder and set the variable as mention in `config/env.sample.js` file. 

• Now, run the script `npm run dev`.


### Prerequisite

1. Setup [Razorpay](https://razorpay.com/) dashboard in test mode and generate KEY_ID & KEY_SECRET.

2. Create an account on [AWS console](https://aws.amazon.com/) and set your region. 

    • Setup S3 service Bucket where you get BUCKET_NAME.
    • After that create user on IAM service, where you get ACCESS_KEY_ID & SECRET_ACCESS_KEY.

3. Setup [mongoDB](https://www.mongodb.com/) database where you get MONGO_URL
