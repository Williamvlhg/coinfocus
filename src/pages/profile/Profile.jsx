import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import './Profile.css';

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        preferences: {
            darkMode: false,
            notifications: true
        }
    });

    // Load profile from localStorage on component mount
    useEffect(() => {
        const savedProfile = localStorage.getItem('user');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }
    }, []);

    // Save changes to localStorage
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile(prevProfile => {
            const newProfile = {
                ...prevProfile,
                [name]: type === 'checkbox' 
                    ? checked 
                    : value
            };
            
            localStorage.setItem('userProfile', JSON.stringify(newProfile));
            return newProfile;
        });
    };

    const handleDelete = () => {
        console.log('Account deleted');
        setIsModalOpen(false);
    };


    return (
        <>
        <Header />
        <div className="content">
            <h1>Informations personnelles</h1>
            <div className="profile-content">
            <form className="profile-form">
                <div className="form-group">
                    <label htmlFor="nom">Nom:</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={profile.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                </div>

                
                <div className="form-group">
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={profile.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                    />
                </div>

                <div className="delete-account">
                    <button 
                        type="button" 
                        className="delete-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Delete Account
                    </button>
                </div>
            </form>
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                        <div className="modal-buttons">
                            <button 
                                className="modal-btn cancel"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="modal-btn delete"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default Profile;