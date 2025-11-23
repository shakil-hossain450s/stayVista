import PropTypes from 'prop-types';
import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useUserRole from "../hooks/useUserRole";

const HostRoute = ({ children }) => {
  const { role, loading } = useUserRole();

  if (loading) return <LoadingSpinner />
  if (role === 'host') return children;
  
  return <Navigate to='/dashboard' replace />;
};

HostRoute.propTypes = {
  children: PropTypes.element
}

export default HostRoute;