import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useUserRole from "../../../hooks/useUserRole";
import AdminStatistics from "../Admin/AdminStatistics";

const Statistics = () => {
  const { role, loading } = useUserRole();
  if (loading) return <LoadingSpinner />
  console.log(role);

  return (
    <div>
      {role === 'admin' && <AdminStatistics />}
    </div>
  );
};

export default Statistics;