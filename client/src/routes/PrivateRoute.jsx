import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingSpinner />
  }
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace='true' />
  }
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
}

export default PrivateRoute
