import axios from 'axios'
import { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router'

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // requset interceptors

    // response interceptors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      res => {
        return res;
      },
      async error => {
        console.log('error tracked in the interceptor', error.response)
        if (error.response.status === 401 || error.response.status === 403) {
          await logOut()
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    }
  }, [logOut, navigate])

  return axiosSecure;
}

export default useAxiosSecure
