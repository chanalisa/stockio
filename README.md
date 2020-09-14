# stockio: a mock stock app
A mock stock web app built without boilerplate code!

## Table of Contents:
1. Demo
2. Tech Stack
3. Objectives

## Demo
http://stockio.alisa.codes/

## Tech Stack
### Frontend:
- Webpack (module bundler)
- Sass (preprocessor)
- React
- Redux
- React Router
- Axios
### Backend:
- Express
- PostgreSQL
### Amazon Web Services (AWS):
- Relational Database Service (RDS)
- Elastic Compute Cloud (EC2)

## Objectives
### Design & Style Guide:

### User Stories:
1. Users can create a new account with first name, last name, email, and password.
- Each user's cash account balance has a default value of $5000.00 USD.
- A user can only register once with any given email.
2. Users authenticate via email and password to access their account.
3. Users can buy shares of stock at its current price by specifying the ticker symbol and the number of shares to invest.
- A user can only buy whole number quantities of shares.
- A user can only buy shares if they have enough cash in their account for a given purchase.
- A user can only buy shares if the ticker symbol is valid.
4. Users can view a list of all transactions they've made to date.
5. Users can view their portfolio (a list of all the stocks they own along with their current values).
- Current values should be based on the latest price and quantity owned for a given stock.
- Each stock owned should only appear once.
6. Users can see the font color of stock symbols and current prices in their portfolio change dynamically to indicating performance.
- Display red when the current price is less than the day’s open price.
- Display grey when the current price is equal to the day’s open price.
- Display green when the current price is greater than the day’s open price.
