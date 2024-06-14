# skillcloud-server

BidSync is an auction app built with React for the frontend and Express for the backend. Firebase is used for authentication.
**Here is the step by step guide to run the server**

**Client repository:** [https://github.com/jamshed-uddin/skillcloud-client](https://github.com/jamshed-uddin/skillcloud-client)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine (v14 or higher)
- npm or yarn package manager
- MongoDB cluster setup and stripe account

## Getting Started

Follow these steps to get the app running locally:

### 1. Clone the repository

```sh

git  clone  https://github.com/jamshed-uddin/skillcloud-server.git

```

### 2.Go to the directory

```sh

cd  skillcloud-server

```

### 2.Install the dependencies

```sh

npm  install

```

or

```sh

yarn  install

```

### 3. Environment variables

Create a `.env` file in the root directory with the following variables:

    PORT=port
    MONGO_URI=your_mongodb_cluster_uri
    JWT_SECRET=jwt_secret
    PAYMENT_SK=stripe secret key

### 4. Start the app

```sh

npm  run  dev

```
