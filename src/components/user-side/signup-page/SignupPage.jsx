import React, { useState } from "react";
import "./Signup.css";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/actions/authActions";
import { setUser } from "../../../redux/reducers/authReducers";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .required("Username is required")
      .test(
        "is-not-whitespace",
        "Username cannot be just whitespace",
        (value) => {
          return value ? value.length > 0 : false;
        },
      ),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSignupClick = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await dispatch(registerUser(values)).unwrap();

      dispatch(setUser(response));
      console.log(response, "hello response.......");

      if (response.message) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Redirecting to OTP verification...",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/otp-verification");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Registration Failed",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/signup");
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: `${error.email}`,
      }).then(() => {
        navigate("/signup");
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h4 className="text-container">SIGN UP</h4>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          password2: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignupClick}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Box
              sx={{
                marginTop: "40px",
                "& .MuiTextField-root": {
                  m: 1,
                  width: { xs: "100%", md: "280px" },
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              noValidate
              autoComplete="off"
            >
              <Field
                as={TextField}
                name="username"
                label="Enter username"
                variant="outlined"
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{
                  width: { xs: "100%", md: "280px" },
                  "& .MuiInputBase-input": {
                    height: "30px",
                    padding: "10px",
                    fontSize: "14px",
                  },
                  "& .MuiFormLabel-root": {
                    fontSize: "15px",
                  },
                }}
              />

              <Field
                as={TextField}
                name="email"
                label="Enter Email Address"
                variant="outlined"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{
                  width: { xs: "100%", md: "280px" },
                  marginTop: "10px",
                  "& .MuiInputBase-input": {
                    height: "30px",
                    padding: "10px",
                    fontSize: "14px",
                  },
                  "& .MuiFormLabel-root": {
                    fontSize: "15px",
                  },
                }}
              />

              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{
                  width: { xs: "100%", md: "280px" },
                  marginTop: "10px",
                  "& .MuiInputBase-input": {
                    height: "30px",
                    padding: "10px",
                    fontSize: "14px",
                  },
                  "& .MuiFormLabel-root": {
                    fontSize: "15px",
                  },
                }}
              />

              <Field
                as={TextField}
                name="password2"
                label="Confirm Password"
                type="password"
                variant="outlined"
                error={touched.password2 && !!errors.password2}
                helperText={touched.password2 && errors.password2}
                sx={{
                  width: { xs: "100%", md: "280px" },
                  marginTop: "10px",
                  "& .MuiInputBase-input": {
                    height: "30px",
                    padding: "10px",
                    fontSize: "14px",
                  },
                  "& .MuiFormLabel-root": {
                    fontSize: "15px",
                  },
                }}
              />

              <Button
                sx={{
                  position: "fixed",
                  marginTop: "320px",
                  width: "280px",
                  height: "40px",
                  bgcolor: "black",
                }}
                variant="contained"
                type="submit"
                disabled={isSubmitting || loading}
              >
                {loading ? (
                  <ThreeDots
                    visible={true}
                    height="40"
                    width="80"
                    color="white"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  />
                ) : (
                  "SIGN UP"
                )}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupPage;
