import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (  <div className="sing-log-wrap">
        <div className="d-flex align-items-center justify-content-center min-vh-100" >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="form-area">
                            <div className="form-sing">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li
                                        role="presentation"
                                        className={activeTab === 'login' ? 'active' : ''}
                                    >
                                        <a
                                            href="#login"
                                            aria-controls="login"
                                            role="tab"
                                            onClick={e => { e.preventDefault(); setActiveTab('login'); }}
                                        >
                                            Sign In
                                        </a>
                                    </li>
                                    <li
                                        role="presentation"
                                        className={activeTab === 'profile' ? 'active' : ''}
                                    >
                                        <a
                                            href="#profile"
                                            aria-controls="profile"
                                            role="tab"
                                            onClick={e => { e.preventDefault(); setActiveTab('profile'); }}
                                        >
                                            Sign Up
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div
                                        role="tabpanel"
                                        className={`tab-pane form-are${activeTab === 'login' ? ' active' : ''}`}
                                        id="login"
                                        style={{ display: activeTab === 'login' ? 'block' : 'none' }}
                                    >
                                        <form>
                                            <div className="form-bor">
                                                <div className="form-input-group">
                                                    <label>Username</label>
                                                    <input type="text" name="username" />
                                                </div>
                                                <div className="form-input-group">
                                                    <label>Password</label>
                                                    <input type="password" name="password" />
                                                </div>
                                                <div className="form-input-checkbox">
                                                    <input type="checkbox" id="test1" />
                                                    <label htmlFor="test1">Keep me Signed in</label>
                                                </div>
                                                <div className="form-input-group">
                                                    <button type="submit">Sign in</button>
                                                </div>
                                            </div>
                                            <a className="forgot-pass" href="">Forgot Password?</a>
                                        </form>
                                    </div>
                                    <div
                                        role="tabpanel"
                                        className={`tab-pane${activeTab === 'profile' ? ' active' : ''}`}
                                        id="profile"
                                        style={{ display: activeTab === 'profile' ? 'block' : 'none' }}
                                    >
                                        <form>
                                            <div className="form-bor">
                                                <div className="form-input-group">
                                                    <label>Username</label>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <input type="text" name="fst-username" placeholder="First Name" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input type="text" name="lst-username" placeholder="Last Name" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-input-group">
                                                    <label>Email</label>
                                                    <input type="text" name="email" placeholder="Email" />
                                                </div>
                                                <div className="form-input-group">
                                                    <label>Password</label>
                                                    <input type="password" name="password" placeholder="Password" />
                                                    <input type="password" name="confirm-password" placeholder="Confirm Password" />
                                                </div>
                                                <div className="form-input-group">
                                                    <button type="submit">Sign Up</button>
                                                </div>
                                            </div>
                                            <a
  className="forgot-pass"
  href="#login"
  onClick={e => { e.preventDefault(); setActiveTab('login'); }}
>
  Already have an account? <strong>Sign in</strong>
</a>
                                        </form>
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