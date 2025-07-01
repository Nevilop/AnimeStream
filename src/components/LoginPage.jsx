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

 

  return (
    <div className="sing-log-wrap">
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="form-area">
                <div className="form-sing">
                    

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