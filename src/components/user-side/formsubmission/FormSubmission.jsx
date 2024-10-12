import * as React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import CountryData from "../../../assets/Countries";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FromSubmit } from "../../../redux/actions/authActions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { setUser } from "../../../redux/reducers/authReducers";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FormSubmission() {
  const [selectedCountries, setSelectedCountries] = React.useState([]);
  const [errors, setErrors] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  // const [email,setEmail] = useState('')
  const [cvFile, setCvFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.reducer.user);
  console.log(users);
  if (!users) {
    return <div>Loading...</div>;
  }
  const email = users.user.user.email;
  // const email = "devy123@gmail.com"
  // console.log(email,"form submission")

  const countryOptions = CountryData.countries;

  const handleCountryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCountries(typeof value === "string" ? value.split(",") : value);
  };

  const validate = () => {
    const newErrors = {};
    if (!firstname.trim()) newErrors.firstname = "firstname is required";
    if (!lastname.trim()) newErrors.lastname = "firstname is required";

    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid Email Address";
    if (selectedCountries.length === 0) {
      newErrors.selectedCountries = "At least one country must be selected";
    }
    if (mobile.length <= 9)
      newErrors.mobile = "Mobile Number must be  10 digits";
    if (!cvFile) {
      newErrors.cvFile = "CV is required";
    }

    if (!idFile) {
      newErrors.idFile = "ID Proof is required";
    }

    // Bank details validation
    if (!accountHolder.trim())
      newErrors.accountHolder = "Account holder name is required";
    if (!accountNumber.trim())
      newErrors.accountNumber = "Account number is required";
    if (!bankName.trim()) newErrors.bankName = "Bank name is required";
    if (!ifscCode.trim()) newErrors.ifscCode = "IFSC code is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        FromSubmit({
          firstname,
          lastname,
          email,
          idFile,
          cvFile,
          mobile,
          selectedCountries,
          accountHolder,
          accountNumber,
          bankName,
          ifscCode,
        }),
      )
        .then((response) => {
          // dispatch(setUser(response))

          if (response) {
            Swal.fire({
              icon: "success",
              title: "Form Submitted Successfully!",
              text: "Thank you for submitting your application. We will review your details and notify you via email once your form has been processed. Please allow us some time for this process.",
              footer:
                "<strong>Note:</strong> You will receive an email regarding the acceptance or rejection of your form.",
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
            }).then(() => {
              navigate("/login");
            });
          } else {
            console.error(
              "Error verifying OTP:",
              response.error || "Unknown error",
            );
            Swal.fire({
              icon: "error",
              title: "form submission Failed",
              text: "form submission  failed. Please try again.",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#038C8C" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Exploro
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box className="form-container" sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ paddingTop: "40px" }}>
          Provide Valid Details
        </Typography>
      </Box>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
        noValidate
        autoComplete="off"
        onSubmit={handlesubmit}
      >
        <Box
          sx={{ display: "flex", gap: 2, mb: 3, width: "100%", maxWidth: 600 }}
        >
          <TextField
            required
            id="first-name"
            label="First Name"
            value={firstname}
            fullWidth
            onChange={(e) => setFirstname(e.target.value)}
            error={Boolean(errors.firstname)}
            helperText={errors.firstname}
          />
          <TextField
            required
            id="last-name"
            label="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            fullWidth
            error={Boolean(errors.lastname)}
            helperText={errors.lastname}
          />
        </Box>

        <Box
          sx={{ display: "flex", gap: 2, mb: 3, width: "100%", maxWidth: 600 }}
        >
          <TextField
            required
            id="email"
            label="Email Address"
            type="email"
            value={email}
            fullWidth
            error={Boolean(errors.email)}
            disabled={true}
          />
          <TextField
            required
            id="mobile"
            label="Mobile"
            fullWidth
            error={Boolean(errors.mobile)}
            helperText={errors.mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
        </Box>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="multi-select-label" style={{ marginLeft: "480px" }}>
            Select visited countries
          </InputLabel>
          <Select
            label="Select visited countries"
            labelId="multi-select-label"
            multiple
            value={selectedCountries}
            onChange={handleCountryChange}
            renderValue={(selected) => selected.join(", ")}
            inputProps={{ "aria-label": "Select countries" }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 400 } } }}
            style={{ width: "500px", marginLeft: "480px", color: "black" }}
          >
            {countryOptions.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors.selectedCountries && (
          <Typography color="error" variant="caption">
            {errors.selectedCountries}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 600,
          }}
        >
          {/* Bank Account Details Fields */}
          <TextField
            required
            id="account-holder"
            label="Account Holder Name"
            fullWidth
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            error={Boolean(errors.accountHolder)}
            helperText={errors.accountHolder}
          />
          <TextField
            required
            id="account-number"
            label="Account Number"
            fullWidth
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            error={Boolean(errors.accountNumber)}
            helperText={errors.accountNumber}
          />
          <TextField
            required
            id="bank-name"
            label="Bank Name"
            fullWidth
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            error={Boolean(errors.bankName)}
            helperText={errors.bankName}
          />
          <TextField
            required
            id="ifsc-code"
            label="IFSC Code"
            fullWidth
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            error={Boolean(errors.ifscCode)}
            helperText={errors.ifscCode}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 600,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
            <Box
              sx={{ display: "flex", gap: 2, alignItems: "center", flex: 1 }}
            >
              <Typography>Upload Your CV*</Typography>
              <Button
                component="label"
                variant="contained"
                onChange={(e) => handleFileChange(e, setCvFile)}
                startIcon={<CloudUploadIcon />}
                error={Boolean(errors.cvFile)}
                helperText={errors.cvFile}
              >
                Upload
                <VisuallyHiddenInput type="file" />
              </Button>
              {cvFile && <Typography variant="body2">{cvFile.name}</Typography>}
            </Box>
            {errors.cvFile && (
              <Typography color="error" variant="caption">
                {errors.cvFile}
              </Typography>
            )}
            <Box
              sx={{ display: "flex", gap: 2, alignItems: "center", flex: 1 }}
            >
              <Typography>Upload Your ID Proof*</Typography>
              <Button
                component="label"
                variant="contained"
                onChange={(e) => handleFileChange(e, setIdFile)}
                startIcon={<CloudUploadIcon />}
                error={Boolean(errors.idFile)}
                helperText={errors.idFile}
              >
                Upload
                <VisuallyHiddenInput type="file" />
              </Button>
              {idFile && <Typography variant="body2">{idFile.name}</Typography>}
            </Box>
            {errors.idFile && (
              <Typography color="error" variant="caption">
                {errors.idFile}
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 600,
            px: 2,
            mt: 2,
          }}
        >
          <Button sx={{ bgcolor: "black" }} variant="contained">
            BACK
          </Button>
          <Button sx={{ bgcolor: "black" }} variant="contained" type="submit">
            SUBMIT
          </Button>
        </Box>
      </Box>
    </div>
  );
}
