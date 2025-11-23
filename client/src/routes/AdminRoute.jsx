import PropTypes from 'prop-types';
import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useUserRole from "../hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const { role, loading, isAdmin } = useUserRole();

  if (loading) return <LoadingSpinner />
  if (role === 'admin' && isAdmin) return children;
  
  return <Navigate to='/dashboard' replace />;
};

AdminRoute.propTypes = {
  children: PropTypes.element
}

export default AdminRoute;