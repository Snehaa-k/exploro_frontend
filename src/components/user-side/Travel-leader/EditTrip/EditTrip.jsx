import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateTrip } from "../../../../redux/actions/authActions";
import Swal from "sweetalert2";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  location: Yup.string().required("Location is required"),
  accommodation: Yup.string().required("Accommodation is required"),
  transportation: Yup.string().required("Transportation is required"),
  participant_limit: Yup.number()
    .required("Participants limit is required")
    .positive()
    .integer(),
  amount: Yup.number().required("Amount is required").positive().integer(),
  start_date: Yup.date()
    .required("Start Date is required")
    .min(new Date(), "Start Date must be today or later"),
  duration: Yup.string().required("Duration is required"),
});

const EditTripModal = ({ open, onClose, trip, onSave }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tripImagePreview, setTripImagePreview] = useState(
    trip.Trip_image || "",
  ); // Add image preview state
  const [tripImage, setTripImage] = useState(null); // To store the file

  // Handle image change and preview
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTripImage(file);
      setTripImagePreview(URL.createObjectURL(file)); // Set preview for the selected image
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData(); // Use FormData for file upload

      // Append all form data
      formData.append("id", trip.id);
      formData.append("location", values.location);
      formData.append("accommodation", values.accommodation);
      formData.append("transportation", values.transportation);
      formData.append("participant_limit", values.participant_limit);
      formData.append("amount", values.amount);
      formData.append("start_date", values.start_date);
      formData.append("duration", values.duration);

      // Append image if a new one is selected
      if (tripImage) {
        formData.append("Trip_image", tripImage);
      }

      const response = await dispatch(
        updateTrip({ updatedTrip: formData }),
      ).unwrap();
      if (response) {
        onSave(values);
        onClose(values);
        Swal.fire({
          icon: "success",
          title: "Successfully Edited..",
          text: "Redirecting to home page...",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/viewtrip");
        });
      }
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Trip</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            id: trip.id || "",
            location: trip.location || "",
            accommodation: trip.accomodation || "",
            transportation: trip.transportation || "",
            participant_limit: trip.participant_limit || "",
            start_date: trip.start_date || "",
            duration: trip.duration || "",
            amount: trip.amount || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="location"
                    label="Location"
                    variant="outlined"
                    margin="normal"
                    disabled
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <Field
                    as={TextField}
                    fullWidth
                    name="accommodation"
                    label="Accommodation"
                    variant="outlined"
                    margin="normal"
                  />
                  <ErrorMessage
                    name="accommodation"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <Field
                    as={TextField}
                    fullWidth
                    name="transportation"
                    label="Transportation"
                    variant="outlined"
                    margin="normal"
                  />
                  <ErrorMessage
                    name="transportation"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <Field
                    as={TextField}
                    fullWidth
                    name="participant_limit"
                    label="Participants Limit"
                    variant="outlined"
                    margin="normal"
                    type="number"
                  />
                  <ErrorMessage
                    name="participant_limit"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <Field
                    as={TextField}
                    fullWidth
                    name="amount"
                    label="Amount"
                    variant="outlined"
                    margin="normal"
                    type="number"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <Field
                    as={TextField}
                    fullWidth
                    name="start_date"
                    label="Start Date"
                    variant="outlined"
                    margin="normal"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                  <ErrorMessage
                    name="start_date"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <Field
                    as={TextField}
                    fullWidth
                    name="duration"
                    label="Duration"
                    variant="outlined"
                    margin="normal"
                  />
                  <ErrorMessage
                    name="duration"
                    component="div"
                    style={{ color: "red" }}
                  />

                  {/* Image Upload */}
                  <Box mt={2}>
                    <Typography>Trip Image</Typography>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{ display: "block", margin: "10px 0" }}
                    />
                    {tripImagePreview && (
                      <img
                        src={tripImagePreview}
                        alt="Trip Preview"
                        style={{
                          width: "100%",
                          maxHeight: "200px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
              <DialogActions>
                <Button type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditTripModal;
