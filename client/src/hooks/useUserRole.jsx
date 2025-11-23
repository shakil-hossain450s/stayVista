import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const email = user?.email;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['userRole', email],
    enabled: !!email && !!authLoading,
    queryFn: async () => {
      const { data } = await axiosSecure(`/api/user/${email}/role`);
      return data.data;
    }
  })

  const role = data?.role || 'guest';
  return {
    role,
    isAdmin: role === 'admin',
    loading: isLoading || authLoading,
    error,
    refetch
  };
};

export default useUserRole;