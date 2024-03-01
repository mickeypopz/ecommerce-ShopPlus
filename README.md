# Shop Plus+
 
It is a CRUD Based E-commerce website 
The website which customer can buy product through online-website
The website contain two Roles: user and Admin

# Feature set

## User Account Management:
Allow visitors to signup and login using their e.mail and password for simplicity.

## Edit user Information: 
Alow usr to update name,email address and password
Product Browsing: This section allows users to explore and browse hough various product

## categories. 
Users should be she to ker and search for products based on specific criteria.This feature can also be used by a vistor (without logging in).

## Wishlist: 
This section allows users to add and remove products for future interaction Users should be able to add the wishlisted products to the cart. Only logged in users should be able to use this feature.

## Cart: 
This section allows uses to add and remove products fo placing a new order.

## User Reviews and Ratings: 
This feature should Allow users to submit reviews and assign ratings to products they purchased.
Display aggregated ratings and user review to help in purchasing decisions.

## Secure Purchase Handling: 
This section should provide a payment processing system that guarantees secure and seamless transactions.#Getting Started
To get started with ShopPlus+, follow these steps:

Clone the Repository: Open a terminal and run the following command to clone the repository to your local machine:
```
git clone https://github.com/mickeypopz/ecommerce-ShopPlus.git
```
Navigate to the Frontend Folder: Change your working directory to the frontend folder:
```
cd client
```
Install Frontend Dependencies: Install the required frontend dependencies using npm:
```
npm install
```
Start the Frontend Server: Start the development server for the frontend:
```
npm start
```
This will launch the application in your default web browser at 
```
http://localhost:3000.
```
Explore the Application: You can now explore the ShopPlus+ application, browse titles, search for content, and test out its features.

Navigate to the Backend Folder: If you're interested in exploring the backend code, you can change your working directory to the backend folder:
```
cd ../server
```
Install Backend Dependencies: Install the required backend dependencies using npm:
```
npm install
```
Start the Backend Server: Start the backend server:
```
npm start
```
The backend server will be up and running, ready to serve data to the frontend.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in Client root directory

`REACT_APP_API_URL=Backend url`

`REACT_APP_USER_ID=Emailjs `

`REACT_APP_SERVICE_ID=Email js`

`REACT_APP_TEMPLATE_ID=email js`

To run this project, you will need to add the following environment variables to your .env file in server root directory

`DATABASE= url`

`PORT=8000`

`WEB= frontend web url`

`BRAINTREE_MERCHANT_ID=`

`BRAINTREE_PUBLIC_KEY=`

`BRAINTREE_PRIVATE_KEY= `

`HOST=smtp.gmail.com`

`USER=abc@gmail.com`

`PASS= `

`SERVICE=Gmail`

# Additional Information

## For payment transactions use :
5555 5555 5555 4444

12/30

## To Access Admin
username: admin@gmail.com

password: admin123

## reference
https://www.emailjs.com/docs/tutorial/creating-email-template/

https://developer.paypal.com/braintree/docs/guides/disputes/overview

https://stackoverflow.com/questions/39448394/how-to-send-an-email-in-nodejs

https://www.npmjs.com/package/react-moment

https://www.npmjs.com/package/react-toastify
