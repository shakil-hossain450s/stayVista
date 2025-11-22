import { Link, useLocation, useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast';
import SocialLogin from '../../components/Shared/SocialLogin/SocialLogin';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaHome } from 'react-icons/fa';
import { TbFidgetSpinner } from 'react-icons/tb';
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, resetPassword, loading, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // get location pathname
  const from = location.state?.from?.pathname || '/';

  // login function
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    try {
      const result = await signIn(email, password);
      if (result.user) {
        toast.success('Logged in Successfully.');
        navigate(from);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  }

  // handle reset password
  const handleResetPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "🔐 Reset Your Password",
      text: "Enter your email address to receive a password reset link.",
      input: "email",
      inputPlaceholder: "example@gmail.com",
      confirmButtonText: "Send Reset Link",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      background: "#f7faff",
      color: "#333",
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      padding: "20px",
      width: "420px",
      customClass: {
        popup: "rounded-xl shadow-xl",
        confirmButton: "rounded-full px-6 py-3 text-sm",
        cancelButton: "rounded-full px-6 py-3 text-sm",
        input: "rounded border border-gray-300 p-3 mt-3",
      },
    });

    if (email) {
      // 👉 call your backend or firebase reset function
      console.log("Reset password requested for email:", email);

      await resetPassword(email);
      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: `A password reset link has been sent to ${email}`,
        confirmButtonColor: "#4f46e5",
        background: "#f7faff",
        customClass: {
          popup: "rounded-3xl shadow-xl",
        },
      });
    }
  };

  return (
    <div className='p-4 flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        {/* Home link */}
        <Link to='/' className='flex items-center gap-1 hover:text-rose-500 hover:underline'>
          <FaHome />
          Home
        </Link>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <div className='relative flex items-center'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  autoComplete='current-password'
                  id='password'
                  required
                  placeholder='*******'
                  className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                />
                <span onClick={() => setShowPassword(!showPassword)} className='absolute right-2 cursor-pointer text-gray-700 hover:text-neutral-900'>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Login'}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button onClick={handleResetPassword} className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
            Forgot password?
          </button>
        </div>

        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>

        {/* google login */}
        <SocialLogin></SocialLogin>

        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
