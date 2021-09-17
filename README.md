
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Simple Register / Login form with React.

![image](https://user-images.githubusercontent.com/90097342/133791379-0eac94b7-2731-4d8d-b99e-c705939a4725.png)

You can easily add the registration form and login form to your project using the files.

**Also note** that you should use **your database** to store and retrieve information, in this project this is done using a PHP script and it is just for testing.

(This method is used in files: **Login.js** and **SignUp.js**)


----------------------------

## Using

Just download files and run following command in terminal:

```
npm install
``` 

After installing, you can use Login/Register form in your project Wherever you want

```jsx
<Switch>
  <Route path="/login" component={Login} />
  <Route path="/signup" component={SignUp} />
  <Redirect from="/" to="/signup" />
</Switch>
```
But don't forget to import react-router-dom and that components

```jsx
  import SignUp from "./components/SignUp";
  import Login from "./components/Login";
  import { Route, Switch, Redirect } from "react-router-dom";
```


