import { Link, useLocation, useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'
import axios from 'axios';
import toast from 'react-hot-toast';
import SocialLogin from '../../components/Shared/SocialLogin/SocialLogin';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaHome } from 'react-icons/fa';
import { TbFidgetSpinner } from 'react-icons/tb';

const SignUp = () => {
  const { createUser, updateUserProfile, loading, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSumbit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      // 1. upload image to imgbb
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = data.data.display_url;

      // 2. create user
      const result = await createUser(email, password);
      console.log(result);
      if (result.user) {
        // 3. update user
        await updateUserProfile(name, imageUrl);
        toast.success('Signup successfully!');
        navigate(from);
      }

    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  }

  return (
    <div className='p-4 flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        {/* Home link */}
        <Link to='/' className='flex items-center gap-1 hover:text-rose-500 hover:underline'>
          <FaHome />
          Home
        </Link>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to StayVista</p>
        </div>
        <form
          onSubmit={handleSumbit}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
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
              {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>

        {/* google login */}
        <SocialLogin></SocialLogin>

        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
