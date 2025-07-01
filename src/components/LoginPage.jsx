import React, { useState } from 'react';
import './LoginPage.css';
import { auth } from '../Firebase'; 
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      alert('Login Successful!');
      navigate('/'); // redirect to homepage
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      return alert("Passwords do not match");
    }
    try {
      await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);
      alert('Signup Successful!');
      setActiveTab('login');
    } catch (err) {
      alert(err.message);
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="sing-log-wrap">
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="form-area">
                <div className="form-sing">
                    <button className="home-button" onClick={goToHome} title="Go to Home">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Home</span>
      </button>

                  <ul className="nav nav-tabs" role="tablist">
                    <li className={activeTab === 'login' ? 'active' : ''}>
                      <a href="#login" onClick={e => { e.preventDefault(); setActiveTab('login'); }}>
                        Sign In
                      </a>
                    </li>
                    <li className={activeTab === 'signup' ? 'active' : ''}>
                      <a href="#signup" onClick={e => { e.preventDefault(); setActiveTab('signup'); }}>
                        Sign Up
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    {/** Login Form */}
                    <div className={`tab-pane form-are${activeTab === 'login' ? ' active' : ''}`} style={{ display: activeTab === 'login' ? 'block' : 'none' }}>
                      <form onSubmit={handleLogin}>
                        <div className="form-bor">
                          <div className="form-input-group">
                            <label>Email</label>
                            <input type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                          </div>
                          <div className="form-input-group">
                            <label>Password</label>
                            <input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                          </div>
                          <div className="form-input-group">
                            <button type="submit">Sign In</button>
                          </div>
                        </div>
                      </form>
                    </div>

                    {/** Signup Form */}
                    <div className={`tab-pane${activeTab === 'signup' ? ' active' : ''}`} style={{ display: activeTab === 'signup' ? 'block' : 'none' }}>
                      <form onSubmit={handleSignup}>
                        <div className="form-bor">
                          <div className="form-input-group">
                            <label>Email</label>
                            <input type="email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
                          </div>
                          <div className="form-input-group">
                            <label>Password</label>
                            <input type="password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
                          </div>
                          <div className="form-input-group">
                            <label>Confirm Password</label>
                            <input type="password" value={signupData.confirmPassword} onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} />
                          </div>
                          <div className="form-input-group">
                            <button type="submit">Sign Up</button>
                          </div>
                        </div>
                      </form>
                      <a href="#login" onClick={e => { e.preventDefault(); setActiveTab('login'); }} className="forgot-pass">
                        Already have an account? <strong>Sign in</strong>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;