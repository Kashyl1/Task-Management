import React, { useState, useRef } from 'react';
import axios from 'axios';

const ProfileImageUpload = ({ onSuccess }) => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef();


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const triggerFileSelect = () => fileInputRef.current.click();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please choose a file.');
            return;
        }
         if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
         }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`/api/user/uploadProfileImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            });
            alert('Your profile photo has been successfully uploaded.');
            console.log('Jak nie da linka do zdjęcia to chociaz muzyczki se posłucham nie :)) https://www.youtube.com/watch?v=SWOaswIzjLs ', response.data.profileImageUrl);
            onSuccess();
        } catch (error) {
            console.error('An error occurred while uploading your profile photo:', error);
            alert('Failed to upload profile photo.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your profile photo?')) {
            try {
                await axios.delete('/api/user/deleteProfileImage', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });
                alert('Profile photo deleted successfully.');
                onSuccess();
            } catch (error) {
                console.error('Failed to delete profile photo:', error);
                alert('There was an error deleting the profile photo.');
            }
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="upload-form">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="upload-input"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                    <button type="button" onClick={triggerFileSelect} className="upload-button">
                        Choose an image
                    </button>
                        <button type="submit" className="upload-button">
                        Upload your profile photo
                    </button>
            </form>
        </>
    );
};

export default ProfileImageUpload;
