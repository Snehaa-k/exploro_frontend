import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Snackbar} from '@mui/material';
// import { updatePlace } from '../../../../redux/actions/authActions';
import api from '../../../../axios-interceptors/AxiosInterceptors';

const EditPlaceModal = ({ open, onClose, place, onSave }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
 
  const navigate = useNavigate();
  console.log(place.id);
  
  const place_id = place.id
  

  // Validation schema using Yup
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
    try {
      const response = await api.post(`/editplaces/${place_id}/`, values);
      if (response) {
        
        setSnackbarOpen(true);
        
        setTimeout(() => {
          navigate('/viewtrip');
        }, 2000);
        onSave(values);
        onClose();
       
      }
    
    } catch (error) {
      console.error('Error updating place:', error);
    } finally {
      setSubmitting(false);
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
     
    </Dialog>
  );
};

export default EditPlaceModal;