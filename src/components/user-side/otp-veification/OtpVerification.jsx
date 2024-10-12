import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sendOTP, verifyOtp } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const users = useSelector((state) => state.reducer.user);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const [resendDisabled, setResendDisabled] = useState(true);
  console.log(users);
  const email = users.user.user.email;
  // const email = "sree123@gmail.com"
  console.log(email);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleResendOtp = () => {
    // setLoading(true)
    dispatch(sendOTP({ email }));
    Swal.fire({
      icon: "success",
      title: "Your OTP is send to your email",
      // text: 'Redirecting to home page...',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });

    setTimer(60);
    setResendDisabled(true);
  };

  const handleVerify = () => {
    if (otp.every((digit) => digit.length === 1)) {
      const otpCode = otp.join("");
      dispatch(verifyOtp({ otp: otpCode, email }))
        .then((response) => {
          
          if (response.error) {

            Swal.fire({
              icon: "error",
              title: "OTP Verification  Failed",
              text: "Please Check Your OTP",
            });
            
          } else {
            
            Swal.fire({
              icon: "success",
              title: "Successfully Verified",
              text: "Redirecting to role section page...",
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            }).then(() => {
              navigate("/role-selection");
            });

            
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "OTP Verification  Failed",
            text: "Please Check Your OTP",
          });
          
        });
    }
  };

  return (
    <div
      className="otp-containers"
      style={{
        backgroundColor: "#BBF2E8",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Container
        style={{
          backgroundColor: "white",
          marginTop: "40px",
          width: "450px",
          paddingBottom: "45px",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          style={{ marginTop: "200px", paddingTop: "40px" }}
        >
          OTP Verification
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {otp.map((value, index) => (
            <TextField
              key={index}
              id={`otp-input-${index}`}
              value={value}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              inputProps={{ maxLength: 1 }}
              style={{ width: "40px", margin: "0 4px" }}
              size="small"
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {timer > 0 ? (
            <Button variant="contained" color="primary" onClick={handleVerify}>
              Verify
            </Button>
          ) : (
            <Button
              onClick={handleResendOtp}
              variant="outlined"
              color="secondary"
            >
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="40"
                  width="80"
                  color="white"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperClass=""
                />
              ) : (
                "Resend OTP"
              )}
            </Button>
          )}
        </div>
        {timer > 0 && (
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "10px", color: "gray" }}
          >
            Resend OTP in {timer} seconds
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default OtpVerificationPage;
