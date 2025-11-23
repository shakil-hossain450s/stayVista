import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UserDataRow from '../../../components/TableRow/UserDataRow';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isPending, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure('/api/users');
      return data.data;
    }
  })

  if (isPending) return <LoadingSpinner />
  if (isError) return <p className='text-red-500'>Something went wrong...</p>
  return (
    <>
      <Helmet>
        <title>Manage Users | Dashboard</title>
      </Helmet>
      {
        users && users.length > 0 ? (
          <div className='container mx-auto px-4 sm:px-8'>
            <div data-aos='fade-right' className='py-8'>
              <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                  <table className='min-w-full leading-normal'>
                    <thead>
                      <tr>
                        <th
                          scope='col'
                          className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                          Email
                        </th>
                        <th
                          scope='col'
                          className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                          Role
                        </th>
                        <th
                          scope='col'
                          className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                          Status
                        </th>

                        <th
                          scope='col'
                          className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* User data table row */}
                      {
                        users.map(user => (
                          <UserDataRow key={user?._id} user={user} />
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='min-h-screen flex flex-col gap-3 justify-center items-center'>
            <p className='text-gray-600 text-xl font-semibold'>No user found</p>
          </div>
        )
      }
    </>
  )
}

export default ManageUsers;