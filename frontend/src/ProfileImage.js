import React, { useState } from 'react';
import './ProfileImage.css';
import Modal from './Modal';
import ProfileImageDelete from './ProfileImageDelete';
import ProfileImageUpload from './ProfileImageUpload';
import './ProfileImageUpload.css';
import './ProfileImageDelete.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const defaultImageUrl = 'https://mymanegementtaskbucket.s3.eu-north-1.amazonaws.com/images.png';

const ProfileImage = ({ imageUrl, firstname, lastname, onSuccess }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div className="profile-image-container">
            <img
                src={imageUrl || defaultImageUrl}
                alt="Profile"
                className="profile-image"
                onClick={openModal}
            />
            <div className="edit-overlay" onClick={openModal}>
                <FontAwesomeIcon icon={faEdit} className="edit-icon" />
            </div>
            <div className="user-info">
                {firstname} {lastname}
            </div>
            {showModal && (
                <Modal onClose={closeModal}>
                    <ProfileImageUpload onSuccess={() => { onSuccess(); closeModal(); }} />
                    <ProfileImageDelete onSuccess={() => { onSuccess(); closeModal(); }} />
                </Modal>
            )}
        </div>
    );
};

export default ProfileImage;
