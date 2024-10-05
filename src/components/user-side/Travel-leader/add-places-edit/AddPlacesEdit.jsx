import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Typography, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import api from '../../../../axios-interceptors/AxiosInterceptors';
import { API_URL } from '../../../../apiservice/Apiservice';

const EditPlaceModal = ({ open, onClose, place, onSave,fetchplaces }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(`${API_URL}${place?.place_image}` || ''); 
  const navigate = useNavigate();
  
  const place_id = place.id;

  const validationSchema = Yup.object().shape({
    place_name: Yup.string().required('Place name is required'),
    description: Yup.string().required('Description is required'),
    accomodation: Yup.string().required('Accommodation is required'),
    transportation: Yup.string().required('Transportation is required'),
  });

  // Initial form values
  const initialValues = {
    place_name: place.place_name || '',
    description: place.description || '',
    accomodation: place.accomodation || '',
    transportation: place.Transportation || '',
    place_id: place?.id || '',
    trip_id: place?.trip || '',
  };

  // Form submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    // Append the form fields to formData
    Object.keys(values).forEach(key => {
      formData.append(key, values[key]);
    });

    // If a new image is selected, append it to formData
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const response = await api.post(`/editplaces/${place_id}/`, formData)
      if (response) {
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/viewtrip');
        }, 2000);
        onSave(values);
      }
      onClose();

      fetchplaces()

    } catch (error) {
      console.error('Error updating place:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Place</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Place Name"
                    name="place_name"
                    variant="outlined"
                    margin="normal"
                    error={touched.place_name && !!errors.place_name}
                    helperText={touched.place_name && errors.place_name}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    label="Description"
                    name="description"
                    variant="outlined"
                    margin="normal"
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    label="Accommodation"
                    name="accomodation"
                    variant="outlined"
                    margin="normal"
                    error={touched.accomodation && !!errors.accomodation}
                    helperText={touched.accomodation && errors.accomodation}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    label="Transportation"
                    name="transportation"
                    variant="outlined"
                    margin="normal"
                    error={touched.transportation && !!errors.transportation}
                    helperText={touched.transportation && errors.transportation}
                  />

                  {/* Image Upload Section */}
                  <Box mt={2}>
                    <Typography variant="h6">Current Image:</Typography>
                    {previewImage && <img src={previewImage} alt="Place Preview" style={{ maxWidth: '50%', height: 'auto' }} />}<br/>
                    <input
                      accept="image/*"
                      type="file"
                      onChange={handleImageChange}
                      style={{ marginTop: '10px' }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Place updated successfully!"
      />
    </Dialog>
  );
};

export default EditPlaceModal;
