import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/navbar/NavigationBar';


export default function LandingPage() { 
    const navigate = useNavigate();
    
    
    return (
        <div className="landing-page">
            <h1>elevenfiftynine</h1>
            <p>Keep track of your academics with ease.</p>
            <div className="buttons">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/register')}>Register</button>
            </div>
        </div>
    ); 
}
