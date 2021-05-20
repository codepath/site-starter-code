# Bank of Codepath Lab

For this activity, you'll be building out the UI for a new financial application that codepath has been prototyping. It's a simple banking app that helps users keep track of their finances and payments using an Express API and a React UI.

Your job is to wire up the React UI to interact with the already built Express API. Data in the Express API is persisted using a JSON file that will store all user activity.

First things first, navigate into both the api directory and the ui directory and run `npm install` to get the appropriate dependencies. Then make sure the express server is running with `npm start` in the api directory.

## Things to Know

This will require SITE interns to have knowledge of:

+ Making HTTP requests from React applications using `axios`
+ Handling asynchronous functions using `async/await`
+ Leveraging the `useEffect` hook to make API requests when components mount
+ Storing data pulled from a remote API locally with the `useState` hook
+ Creating `onClick` handlers for buttons
+ Managing the internal state of a form input with use state and an `onChange` handler.
+ Creating `onSubmit` handlers for forms
+ Using React Router to navigate between pages
+ Creating dynamic routes with React Router
+ Crafting HTTP requests that use route parameter from the `useParams` hook

## Goals

The API has already been provided to you and is fully functional as is. You'll want to explore the backend to see what routes are available and how the `Bank` model stores and accesses data. You are welcome to make any additional changes to the API that you see fit.

To finish this application prototype, SITE interns are being asked to complete code in the following files:

### App.js

The component will store a majority of the state for this application and handle any API calls that should happen on start up. It will also define the routing structure for this application.

For routing make sure to accomplish the following:
+ Import the `BrowserRouter`, `Routes`, and `Route` component from `react-router-dom`.
+ Nest the `Navbar` component inside the `BrowserRouter`
+ Add an index route for the home page
+ Add a dynamic route for displaying a single transaction using the `transactionId` path parameter. Display that page with the `TransactionDetail` component.

Then, create default state and handlers with React's `useState` hook for the following items:
+ `isFetching` - a boolean representing whether or not the app is currently requesting data from the API
+ `error` - any errors associated with fetching data from the API
+ `filterInputValue` - the value stored in the `FilterInput`'s value property
+ `transactions` - the list of bank transaction items fetched from the API
+ `transfers` - the list of bank transfer items fetched from the API

Also create two handler functions:
+ `handleOnInputChange` - handle when the `filterInputValue` changes
+ `addTransaction` - add an additional transaction to the `transactions` array

Next, add a `useEffect` hook that runs an `async` function as soon as the `App` component mounts to the screen. 
+ When the effect kicks off, it should set `isFetching` to true
+ That function should fetch all transactions and transfers from the API. You can either create an endpoint that returns all transactions and transfers at once, or simply send two HTTP requests to the `/transactions` and `/transfers` endpoints.
+ If an error occurs while fetching data, it should be added to state. 
+ If data is returned from fetching data, it should be set in state accordingly.
+ When the function has finished executing, it should set `isFetching` to false
+ Make sure to call the function at the end of the `useEffect` hook.

You'll need to pass all of the state values in `App.js` to the `Home` component along with the `addTransaction` handler. You'll also need to pass the `filterInputValue` and `handleOnInputChange` to the `Navbar` component.

### Navbar

The `Navbar` component renders the `FilterInput` component and should pass it the `filterInputValue` and `handleOnInputChange` props.

### Home

While the app is fetching data, indicate that the app is loading. Otherwise, render the `AddTransaction` and `BankActivity` components. Make sure to pass each component the props they need!

+ Create a `filteredTransactions` value that evaluates to the following:
  + Check if the `filterInputValue` has anything typed in it.
    + If nothing has been typed in, then `filteredTransactions` should just be the transactions array.
    + Otherwise, filter the transactions based on whether or not the lowercased `description` property of a transaction contains the lowercased `filterInputValue`.
  + Pass the `filteredTransactions` to the `BankActivity` component.
+ If there is an error from fetching data, display a message in the UI.

### AddTransaction

This component is responsible for adding a new transaction to the Bank. We'll be turning each input into a _controlled input_ and adding an `onClick` handler to the submit button to make that happen.

Accomplish the following:
+ Employ the `useState` hook to create state for `isProcessing` and `error`. 
+ On top of that create form state for the `description`, `category`, and `amount` inputs. 
+ Create an `onChange` handler that is responsible for updating form state
+ Pass the state variables and handler as props to the correct inputs. 
+ Then create an async `handleOnSubmit` function that is passed to the `onClick` prop of the submit button. That handler that should send a `POST` request to the `/bank/transactions/` endpoint to create a new transaction in the API. Take the transaction and call the `addTransaction` handler with the new transaction. 
+ As soon as the transaction has been submitted, set `isProcessing` to true. Once the call has finished executing, set it to false.
+ Handle any errors as well.
+ When the form submits successfully, clear all the input values.

### Bank Activity

This component renders two tables for all transactions and all transfers sent from the API. The transfers table is already complete.

For the transactions table, turn each transaction row into a `Link` from `react-router-dom`. Each row should link to a separate page for an individual transaction rendered by the `TransactionDetail` component.

### TransactionDetail

Accomplish the following:
+ Extract the `transactionId` from the route with the `useParams` hook imported from `react-router-dom`.
+ Create state values and setters for `transaction`, `isLoading`, and `error`.
+ Add a `useEffect` hook to the component. It should:
  + Define an async function called `fetchTransactionById`. 
    + That function should start by setting `isLoading` to true. 
    + Then it should use `axios` to make a `GET` request to the API to fetch a single transaction by its id.
    + If there is an error, set that error in state.
    + If data is returned, update the `transaction` state value.
    + Set `isLoading` to false at the end of the function no matter what.
    + Make sure to call that function in the `useEffect` hook.
  + Add the `transactionId` to the `useEffect` hook's dependency array.

## Stretch Goals

+ Display the current total balance of the user's bank account on the Home Page.
+ Implement an `AddTransfer` component that allows users to add a transfer to their bank account.
+ Create a `TransferDetail` component that displays info about an individual transfer.
+ Ensure that the `FilterInput` filters both transactions and transfers.
+ Add an API endpoint that allows users to indicate that they've paid off certain transactions if that transaction took money out of the account. Create a button on the `TransactionDetail` component that lets users record this information.
