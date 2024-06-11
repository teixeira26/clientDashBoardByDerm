import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import DefaultNavbar from "../../components/DefaultNavbar";
import Footer from "../../components/Footer";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { getUserRole } from "../../Services/Users/getUserRole";

const Login = ({ setUserRole, popo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        toast.success("Te Loggeaste con exito 🎉");
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user))
        const role = await getUserRole(user.uid);
        console.log(role, setUserRole, popo)
        setUserRole(role)
      })
      .catch((error) => {
        toast.error(error.message);
        // ..
      });

  };

  return (
    <div>
      <DefaultNavbar />
      <section className="card flex-shrink-0 w-80 lg:w-4/12 shadow-2xl bg-base-100 mx-auto my-20">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              className="input input-bordered"
            />
            {/* <label className="label">
                            <Link to='/forgot-password' className='label-text-alt link link-hover text-black'>Forgot Password?</Link>
                        </label> */}
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary bg-[#E87722] text-white border-[#E87722]"
            >
              Login
            </button>
          </div>
          <div className="form-control mt-6">
                        <p className='flex justify-between'>New to Inventory? <Link to='/register' className='text-[#E87722] underline'>Register Here</Link></p>
                    </div>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
