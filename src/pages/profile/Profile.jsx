import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
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
        const savedProfile = localStorage.getItem('userProfile');
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

    const handlePreferenceChange = (e) => {
        const { name, checked } = e.target;
        
        setProfile(prevProfile => {
            const newProfile = {
                ...prevProfile,
                preferences: {
                    ...prevProfile.preferences,
                    [name]: checked
                }
            };
            
            localStorage.setItem('userProfile', JSON.stringify(newProfile));
            return newProfile;
        });
    };

    return (
        <div className="profile-container">
            <h1>Profile Settings</h1>
            <form className="profile-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
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
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profile.phone}
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

                <div className="preferences">
                    <h2>Preferences</h2>
                    <div className="form-group checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="darkMode"
                                checked={profile.preferences.darkMode}
                                onChange={handlePreferenceChange}
                            />
                            Dark Mode
                        </label>
                    </div>

                    <div className="form-group checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="notifications"
                                checked={profile.preferences.notifications}
                                onChange={handlePreferenceChange}
                            />
                            Enable Notifications
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Profile;