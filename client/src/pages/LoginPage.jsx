import { useAuthStore } from "../store/useAuthStore";
import React,{useState} from "react"
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import {MessageCircleIcon, LockIcon, MailIcon, LoaderIcon} from 'lucide-react'
import {Link} from 'react-router'

function LoginPage(){

    const [formData, setFormData] = useState({
            email: "",
            password: ""
        })
    const { login, isLoggingIn } = useAuthStore()

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData)
    }

    return(
        <div className="w-full flex items-center justify-center p-4 bg-slate-900">
            <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
                <BorderAnimatedContainer>
                    <div className="w-full flex flex-col md:flex-row">
                        {/*FORM COLUMN - LEFT SIDE */}
                        <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
                            <div className="w-full max-w-md">
                                {/* Heading Text */}
                                <div className="text-center mb-8">
                                    <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                                    <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back</h2>
                                    <p className="text-slate-400">Login to Access Your Account</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/*Email Input*/}
                                    <div>
                                        <label className="auth-input-label">Email</label>
                                        <div className="relative">
                                            <MailIcon className="auth-input-icon" />
                                            <input 
                                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                            type="email" 
                                            value={formData.email} 
                                            className="input" 
                                            placeholder="johndoe@gmail.com"/>
                                        </div>
                                    </div>
                                    {/*Password Input*/}
                                    <div>
                                        <label className="auth-input-label">Password</label>
                                        <div className="relative">
                                            <LockIcon className="auth-input-icon" />
                                            <input 
                                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                            type="password" 
                                            value={formData.password} 
                                            className="input" 
                                            placeholder="Enter Your Password"/>
                                        </div>
                                    </div>
                                    {/**/}
                                    <button className="auth-btn" type="submit" disabled={isLoggingIn}>
                                        {isLoggingIn ? (
                                            <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                                            ) : (
                                                "Sign In"
                                            )}
                                    </button>
                                </form> 
                                <div className="mt-6 text-center">
                                    <Link to="/signup" className="auth-link">
                                        Dont Have An Account? sign up
                                    </Link>
                                </div>
                            </div>
                            {/* FORM */}
                            
                        </div>

                        {/*FORM ILLUSTRATION RIGHT SIDE*/}
                        <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
                            <div>
                                <img src="/login.png" alt="People using mobile screens" className="w-full h-auto object-contain" />
                                <div className="mt-6 text-center">
                                    <h3 className="text-xl font-medium text-cyan-400">Connect Anytime Anywhere</h3>
                                    <div className="mt-4 flex justify-center gap-4">
                                        <div className="auth-badge">Secure</div>
                                        <div className="auth-badge">Fast</div>
                                        <div className="auth-badge">Reliable</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BorderAnimatedContainer>
            </div>
        </div>
    );
}

export default LoginPage