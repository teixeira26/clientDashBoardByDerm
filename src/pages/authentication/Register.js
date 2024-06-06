import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import registerGif from '../../Assets/GIF/register.gif';
import DefaultNavbar from '../../components/DefaultNavbar';
import Footer from '../../components/Footer';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { createUserRole } from '../../Services/Users/createUserRole';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          toast.success("Te Registraste con exito 🎉");
          sendEmailVerification(userCredential.user);
          const user = userCredential.user;
          createUserRole(user.uid)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          // ..
        });
  
    };


    return (
        <div>
            <DefaultNavbar />
            <section className="relative flex flex-wrap lg:h-screen lg:items-center">
                <div className="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div className="max-w-lg mx-auto text-center">
                        <h1 className="text-2xl font-bold sm:text-3xl">Creá tu cuenta en DermaSync</h1>

                        <p className="mt-4 text-gray-500">
                        Regístrate hoy y desbloquea una solución inteligente de gestión de inventarios, siente el poder de la automatización y más.                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="card-body">
                        <div className='grid grid-cols-2 gap-4 justify-between'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input  type="text" placeholder="first name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input type="text" placeholder="last name" className="input input-bordered" />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="password" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="confirm password" className="input input-bordered" />

                            <div className="form-control mt-4">
                                <label className="label cursor-pointer flex items-center">
                                    <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                                    <p className="label-text">By signing up with a third party service, you agree to accept String LAB's <Link to='/terms-and-conditions' className='underline'>Terms of service</Link> and <Link to='/privacy-policy' className='underline'>Privacy policy</Link></p>
                                </label>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary text-white">Register</button>
                        </div>
                        <div className="form-control mt-6">
                            <p className='flex justify-between'>Already a member? <span onClick={() => navigate('/login')} className='text-[#F4E06D] underline'>Login Here</span></p>
                        </div>
                    </form>
                </div>

                <div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
                    <img
                        className="absolute inset-0 object-cover w-full h-full"
                        src={registerGif}
                        alt=""
                    />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Register;