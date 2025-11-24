import { createBrowserRouter } from 'react-router'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import DashboardLayout from '../layouts/DashboardLayout'
import Statistics from '../pages/Dashboard/Common/Statistics'
import AddRoom from '../pages/Dashboard/Host/AddRoom'
import MyListings from '../pages/Dashboard/Host/MyListings'
import Profile from '../pages/Dashboard/Common/Profile'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import HostRoute from './HostRoute'
import MyBookings from '../pages/Dashboard/Guest/MyBookings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <RoomDetails />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>,
    children: [
      // default for all user role
      {
        index: true,
        element: <PrivateRoute>
          <Statistics />
        </PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute>
          <Profile />
        </PrivateRoute>
      },
      // routes for guest
      {
        path: 'my-bookings',
        element: <PrivateRoute>
          <MyBookings />
        </PrivateRoute>
      },
      // routes for host
      {
        path: 'add-room',
        element: <PrivateRoute>
          <HostRoute>
            <AddRoom />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: 'my-listings',
        element: <PrivateRoute>
          <HostRoute>
            <MyListings />
          </HostRoute>
        </PrivateRoute>
      },
      // // routes for admin
      {
        path: 'manage-users',
        element: <PrivateRoute>
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        </PrivateRoute>
      }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
