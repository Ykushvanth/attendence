import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import { supabase } from '../../supabaseConfig';

const FacultySignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        facultyId: '',
        name: '',
        email: '',
        department: '',
        subjects: '',
        sections: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match!");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('faculty')
                .insert([
                    {
                        faculty_id: formData.facultyId,
                        name: formData.name,
                        email: formData.email,
                        department: formData.department,
                        subjects: formData.subjects,
                        sections: formData.sections,
                        password: formData.password
                    }
                ])
                .select();

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            console.log('Faculty data inserted:', data);
            alert('Registration successful!');
            navigate('/faculty-login');
        } catch (error) {
            console.error('Error during registration:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-wrapper">
                <div className="signup-left">
                    <div className="welcome-text">
                        <h1>Welcome to Faculty Portal</h1>
                        <p>Join us to manage your classes and students effectively</p>
                    </div>
                </div>
                <div className="signup-card">
                    <h2>Faculty Registration</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Faculty ID</label>
                                <input
                                    type="text"
                                    name="facultyId"
                                    value={formData.facultyId}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your faculty ID"
                                />
                            </div>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your department"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Subjects</label>
                            <input
                                type="text"
                                name="subjects"
                                value={formData.subjects}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Operating Systems, Data Structures"
                            />
                        </div>

                        <div className="form-group">
                            <label>Sections</label>
                            <input
                                type="text"
                                name="sections"
                                value={formData.sections}
                                onChange={handleChange}
                                required
                                placeholder="e.g., S1, S2, S15"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </div>

                        <button type="submit" className="signup-button">
                            Create Account
                        </button>
                    </form>
                    <p className="login-link">
                        Already have an account? <Link to="/faculty-login">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FacultySignup;
