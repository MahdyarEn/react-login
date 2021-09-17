import React, { useEffect, useState } from "react";
import userIcon from "../img/user.svg";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
import { validate } from "./validate";
import styles from "./SignUp.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    IsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    notify();
    if (!Object.keys(errors).length) {
      notify("You signed Up successfully", "success");
      // Pushing data to database usuing PHP script
      const urlApi = `https://lightem.senatorhost.com/login-react/index.php?email=${data.email}&password=${data.password}&register=true`;
      axios.get(urlApi).catch((error) => alert("Something wen't wrong while adding your information to database"));
    } else {
      notify("Please Check fileds again", "error");
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        IsAccepted: false,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h2>Sign Up</h2>
        <div>
          <div className={errors.name && touched.name ? styles.unCompleted : !errors.name && touched.name ? styles.completed : undefined}>
            <input type="text" name="name" value={data.name} placeholder="Name" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={userIcon} alt="" />
          </div>
          {errors.name && touched.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div>
          <div className={errors.email && touched.email ? styles.unCompleted : !errors.email && touched.email ? styles.completed : undefined}>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={emailIcon} alt="" />
          </div>
          {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div>
          <div className={errors.password && touched.password ? styles.unCompleted : !errors.password && touched.password ? styles.completed : undefined}>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={passwordIcon} alt="" />
          </div>
          {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
        </div>
        <div>
          <div className={errors.confirmPassword && touched.confirmPassword ? styles.unCompleted : !errors.confirmPassword && touched.confirmPassword ? styles.completed : !errors.confirmPassword && touched.confirmPassword ? styles.completed : undefined}>
            <input type="password" name="confirmPassword" value={data.confirmPassword} placeholder="Confirm Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={passwordIcon} alt="" />
          </div>
          {errors.confirmPassword && touched.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        </div>
        <div>
          <div className={styles.terms}>
            <input type="checkbox" name="IsAccepted" value={data.IsAccepted} id="accept" onChange={changeHandler} onFocus={focusHandler} />
            <label htmlFor="accept">I accept terms of privacy policy</label>
          </div>
          {errors.IsAccepted && touched.IsAccepted && <span className={styles.error}>{errors.IsAccepted}</span>}
        </div>
        <div>
          <button type="submit">Create Account</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Already have a account? <Link to="/login">Sign In</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
