import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

const EditPostModal = ({ isOpen, handleClose, post, onPostUpdate }) => {
    const [description, setDescription] = useState(post.description);
    const [postImage, setPostImage] = useState(null);
    const [postImagePreview, setPostImagePreview] = useState(post.post_image); 

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPostImage(file);
            setPostImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        const updatedPost = new FormData(); 
        updatedPost.append('description', description);

        if (postImage) {
            updatedPost.append('post_image', postImage); 
        }

        onPostUpdate(updatedPost); 
        
    };

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box sx={{ ...modalStyle, width: 400 }}>
                <Typography variant="h6" component="h2">
                    Edit Post
                </Typography>
                <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ my: 2 }}
                />

                {/* File input for image */}
                <label htmlFor="post-image-upload">
                    <Input
                        accept="image/*"
                        id="post-image-upload"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <Button variant="contained" component="span">
                        Change Image
                    </Button>
                </label>

                {postImagePreview && (
                    <Box mt={2}>
                        <Typography>Preview Image:</Typography>
                        <img
                            src={postImagePreview}
                            alt="Post Preview"
                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                        />
                    </Box>
                )}

                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

export default EditPostModal;
