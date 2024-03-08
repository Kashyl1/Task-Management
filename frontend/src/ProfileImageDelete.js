import React, { useState } from 'react';
import axios from 'axios';

const ProfileImageDelete = ({ onSuccess }) => {
    const handleDeletePhoto = async () => {
        if (window.confirm('Are you sure you want to delete your profile photo?')) {
            try {
                const response = await axios.delete('/api/user/deleteProfileImage', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });
                alert('Your profile photo has been successfully deleted.');
                if (onSuccess) {
                    onSuccess();
                }
            } catch (error) {
                console.error('An error occurred while deleting your profile photo:', error);
                alert('Failed to delete profile photo.');
            }
        }
    };

    return (
        <button onClick={handleDeletePhoto} className="delete-button">
         Delete your profile photo
        </button>
    );
};

export default ProfileImageDelete;
