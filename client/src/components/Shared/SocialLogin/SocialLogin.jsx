import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signInWithGoogle, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const from = location.state?.from?.pathname || '/';

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result?.user;

      if (result.user) {
        toast.success('Logged in successfully!');
        const userData = {
          name: user?.displayName,
          email: user?.email,
          status: 'verified',
          provider: 'google',
          role: 'guest'
        }
        const { data } = await axiosSecure.post('/api/user', userData);
        console.log(data);
        navigate(from);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  }

  return (
    <button disabled={loading} onClick={handleGoogleLogin} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
      <FcGoogle size={32} />

      <p>Continue with Google</p>
    </button>
  );
};

export default SocialLogin;