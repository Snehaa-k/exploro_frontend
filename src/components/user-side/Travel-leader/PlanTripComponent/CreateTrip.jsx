import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Grid,
  MenuItem,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./CreateTrip.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createTrip } from "../../../../redux/actions/authActions";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { addDays, format } from "date-fns";
import Swal from "sweetalert2";

// Custom text field component
const CustomTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      {...field}
      {...props}
      label={label}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error ? meta.error : ""}
      variant="outlined"
      margin="normal"
      fullWidth
    />
  );
};

const CreateTrip = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tripTypes = [
    { value: "Historical Sites", label: "Historical Sites" },
    { value: "Natural Wonders", label: "Natural Wonders" },
    { value: "Famous Cities", label: "Famous Cities" },
    { value: "Hilly areas", label: "Hilly areas" },
    { value: "Landmarks", label: "Landmarks" },
  ];

  const [image, setImage] = useState(null);
  const minimumStartDate = addDays(new Date(), 5);

  const validationSchema = Yup.object({
    location: Yup.string().required("Please add location"),
    trip_type: Yup.string().required("Please select type of trip"),
    start_date: Yup.date()
      .required("Please add start date")
      .min(minimumStartDate, `Start date must be at least 5 days from today`),
    end_date: Yup.date().required("Please add end date"),
    duration: Yup.number()
      .required("Please add duration")
      .min(1, "Duration must be at least 1 day"),
    description: Yup.string().required("Please add description"),
    accomodation: Yup.string().required("Please add accommodation"),
    transportation: Yup.string().required("Please add transportation"),
    amount: Yup.number()
      .required("Please add amount")
      .min(1, "Amount must be at least ₹1"),
    participant_limit: Yup.number()
      .required("Please add participant limit")
      .min(1, "At least one participant required"),
    Trip_image: Yup.mixed().required("Please upload an image"),
  });

  const handleImageUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFieldValue("Trip_image", file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formDatasend = new FormData();

    Object.keys(values).forEach((key) => {
      formDatasend.append(key, values[key]);
    });

    try {
      const response = await dispatch(createTrip(formDatasend)).unwrap();

      if (response && response.message) {
        Swal.fire({
          icon: "success",
          title: "Trip created successfully",
          text: "Redirecting to trips page",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/viewtrip");
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Unexpected response",
          text: "The trip was created, but the response was not as expected.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Trip creation failed",
        text:
          error.error ||
          error.message ||
          "An unexpected error occurred while creating the trip. Please try again.",
      });
    }

    setSubmitting(false);
  };

  const calculateEndDate = (startDate, duration) => {
    if (startDate && duration) {
      const start = new Date(startDate);
      const end = addDays(start, duration);
      return format(end, "yyyy-MM-dd");
    }
    return "";
  };

  return (
    <Formik
      initialValues={{
        location: "",
        trip_type: "",
        start_date: "",
        end_date: "",
        duration: 0,
        description: "",
        accomodation: "",
        transportation: "",
        amount: 0,
        participant_limit: 0,
        Trip_image: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
      {({ setFieldValue, values, isSubmitting }) => {
        useEffect(() => {
          if (values.start_date && values.duration) {
            setFieldValue(
              "end_date",
              calculateEndDate(values.start_date, values.duration),
            );
          }
        }, [values.start_date, values.duration, setFieldValue]);

        return (
          <Form className="trip-container">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: 150,
                    backgroundImage: `url(${image || "https://via.placeholder.com/400x200"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                    }}
                  >
                    <UploadIcon />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleImageUpload(event, setFieldValue)
                      }
                      hidden
                    />
                  </Button>
                </Box>
                <ErrorMessage
                  name="Trip_image"
                  component="div"
                  className="error-message"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <CustomTextField
                  name="location"
                  label="Location"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Field
                  as={TextField}
                  fullWidth
                  select
                  name="trip_type"
                  label="Type of Trip"
                  variant="outlined"
                  margin="normal"
                  helperText={
                    <ErrorMessage
                      name="trip_type"
                      component="div"
                      className="error-message"
                    />
                  }
                >
                  {tripTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <CustomTextField
                  name="start_date"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <CustomTextField
                  name="end_date"
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <CustomTextField name="duration" label="Duration" />
              </Grid>

              <Grid item xs={12}>
                <CustomTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={6} sm={6} md={4}>
                <CustomTextField name="accomodation" label="Accommodation" />
              </Grid>

              <Grid item xs={6} sm={4} md={4}>
                <CustomTextField name="transportation" label="Transportation" />
              </Grid>

              <Grid item xs={6} sm={4} md={2}>
                <CustomTextField
                  name="amount"
                  label="Add Amount"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6} sm={4} md={2}>
                <CustomTextField
                  name="participant_limit"
                  label="Participant Limit"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  sx={{
                    width: "100%",
                    height: "40px",
                    bgcolor: "black",
                    mt: 3,
                  }}
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  CREATE
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateTrip;
