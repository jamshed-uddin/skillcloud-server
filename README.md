# Skillcloud server

This is the server for Skillcloud. A Learning Management System(LMS) where users can enroll in classes by paying by Stripe payment. Users can also publish their own courses, update or delete them.
**Client repository:**[https://github.com/jamshed-uddin/skillcloud-client](https://github.com/jamshed-uddin/skillcloud-client)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Packages and Dependencies](#packages-and-dependencies)


## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You need to have Node.js installed. You can download it from [here](https://nodejs.org/).
- **Stripe Account**: You need a Stripe account for payment processing. Sign up [here](https://stripe.com/).
- **MongoDB**: You need a MongoDB database. You can set up a local MongoDB server or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Git**: Ensure you have Git installed for cloning the repository. You can download it from [here](https://git-scm.com/).

## Installation

1.**Clone the repository:**

  ```bash
   git clone https://github.com/jamshed-uddin/skillcloud-server.git
   cd skillcloud-server
   ```
   
  2.**Install the packages**
  
```sh
 npm install
   ```
or
```sh
 yarn install
   ```
   
  2.**Setup environment variables**
  Create a `.env` file in the root directory and add these environment variables.
```sh
 PAYMENT_SK=stripe secret key
 PORT=port
 MONGO_URI=mongodb connection string
 JWT_SECRET=jwt_secret
   ```
   
## Running the server
  
```sh
 npm run dev
   ```


## API Endpoints
**Authorization:** Private APIs requires an authorization token in request header.
``Authorization: Bearer {token}``

### User Routes

#### Data types

    
      {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        photoURL: { type: String },
      }
   
    

#### Register a new user
- **URL:** `/api/users/register`
- **Method:** `POST`
-  **Access:** `Public`
- **Description:**  
> A public api to create new user that takes a object with email and password in request body.After succesfull registration, api response with a message of success and user data.

#### Get a single user
- **URL:** `/api/users/:email`
- **Method:** `GET`
-  **Access:** `Private`
- **Description:**
> A private api to get data of individual user that takes user email in params.After succesfull query in database, api responses with a message of  success and user data.

#### Update user
- **URL:** `/api/users/:id`
- **Method:** `PATCH`
-  **Access:** `Private`
- **Description:**
> A private api to update data of individual user that takes user id in params.After succesfull update of user in database, api responses with a message of  success and updated user data.
#### Delete user
- **URL:** `/api/users/:id`
- **Method:** `DELETE`
-  **Access:** `Private`
- **Description:**
> A private api to delete user that takes user id in params.After succesfully delete user from database, api responses with a message of  successfull deletation.

#### Generate jwt token
- **URL:** `/api/user/generateJwtToken`
- **Method:** `POST`
-  **Access:** `Public`
- **Description:**
> A public api to generate token after user login. It takes user email in request body then generate token using `jwt.sign()`.After that api responses with token.

### Courses routes

#### Data types

   
      {
        title: { type: String,required: true },               
        thumbnail: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        instructor: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        language: { type: String, required: true },
        contents: [
          {
            type: mongoose.Schema.Types.Mixed,
          },
        ],
      },
    

#### Create a course
- **URL:** `/api/courses`
- **Method:** `POST`
-  **Access:** `Private`
- **Description:**  
> A private api to create new course that takes a course object in request body.After succesfull creation of the course, api response with a message of success and course data.
#### Get all courses
- **URL:** `/api/courses`
- **Method:** `GET`
-  **Access:** `Public`
- **Description:**
> A public api to get all courses.After succesfull query in database, api responses with a message of  success and all course data.

#### Get all courses of an individual user
- **URL:** `/api/courses/mycourses`
- **Method:** `GET`
-  **Access:** `Private`
- **User id:**  `Gets user id from req.user that set by auth middleware`
- **Description:**
> A private api to get all courses of an individual user. It queries data base by id of user that comes from req.user.User  in req.user set by auth middleware after succesfull token verification.After succesfull query in database, api responses with a message of  success and all course data.

#### Get a single course
- **URL:** `/api/users/:id`
- **Method:** `GET`
-  **Access:** `Public`
- **Description:**
> A private api to get data of a single course that takes course id in params.After succesfull query in database, api responses with a message of  success and course data.

#### Update course
- **URL:** `/api/courses/:id`
- **Method:** `PATCH`
-  **Access:** `Private`
- **Description:**
> A private api to update course data that takes data to update in request body.After succesfull update of course in database, api responses with a message of  success and updated course data.
#### Delete course
- **URL:** `/api/courses/:id`
- **Method:** `DELETE`
-  **Access:** `Private`
- **Description:**
> A private api to delete course that takes course id in params.After succesfully delete course from database, api responses with a message of  successfull delete.


### Enrolled courses routes

#### Data types

   
     {
       userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
         },
       course: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Course",
         required: true,
          }
       }, 
    
    

#### Create enrolled course
- **URL:** `/api/enrolledCourses`
- **Method:** `POST`
-  **Access:** `Private`
- **Description:**  
> A private api to save enrolled course to database after successfull payment for the course. It takes course and userId in request body and responses with a message of enrollment success

#### Get all courses of an individual user
- **URL:** `/api/enrolledCourses`
- **Method:** `GET`
-  **Access:** `Private`
- **User id:**  `Gets user id from req.user that set by auth middleware`
- **Description:**
> A private api to get all enrolled courses of an individual user. It queries data base by id of user that comes from req.user.User in req.user set by auth middleware after succesfull token verification.After succesfull query in database, api responses with a message of  success and all course data.

### Saved courses routes

#### Data types

   
     {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
         },
       course: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Course",
        required: true,
        }
    }
   
    
    

#### Save course
- **URL:** `/api/savedCourses`
- **Method:** `POST`
-  **Access:** `Private`
- **Description:**  
> A private api to save courses. It takes course and userId in request body and responses with a message of success

#### Get all courses of an individual user
- **URL:** `/api/savedCourses`
- **Method:** `GET`
-  **Access:** `Private`
- **User id:**  `Gets user id from req.user that set by auth middleware`
- **Description:**
> A private api to get all saved courses of an individual user. It queries data base by id of user that comes from req.user. User in req.user set by auth middleware after succesfull token verification.After succesfull query in database, api responses with a message of  success and all course data.

#### Delete saved course
- **URL:** `/api/savedCourses/:id`
- **Method:** `DELETE`
-  **Access:** `Private`
- **Description:**
> A private api to delete course that takes course id in params. It queries the database with course id and user id from req.user and deletes the course from database, api responses with a message of  successfull delete.

### Payment routes
#### Create payment intent
- **URL:** `api/payments/paymentIntent`
- **Method:** `POST`
-  **Access:** `Private`
- **Description:**
> A private api to to create payment intent that takes amount(in cent) in request body.Then creates a payment intent by `stripe.paymentIntents.create()` with option `{
      amount: priceInCent,
      currency: "usd",
      payment_method_types: ["card"],
    }`.After successfull intent create it responses with message of succesfull intent creation and `client_secret` from paymentIntent object.

#### Save a transaction
- **URL:** `api/payments`
- **Method:** `POST`
-  **Access:** `Private`
- **Description:**
> A private api to save transaction info after a successfull payment. It takes payment info and after successfull insert in database it responses with succsess message.

#### Get all transactions of an individual user
- **URL:** `api/payments`
- **Method:** `GET`
-  **Access:** `Private`
- **Description:**
> A private api to get all transaction data of an individual user. It queries data base by id of user that comes from req.user. User in req.user set by auth middleware after succesfull token verification.After succesfull query in database, api responses with a message of  success and all transaction data.


## Packages and Dependencies

       "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.19.2",
        "jsonwebtoken": "^9.0.2",
        "mongoose": "^8.4.1",
        "stripe": "^15.11.0"








