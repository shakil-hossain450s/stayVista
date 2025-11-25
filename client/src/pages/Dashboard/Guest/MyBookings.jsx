import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import BookingDataRow from '../../../components/TableRow/BookingDataRow';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookings = [], isPending, isError } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/api/bookings/${user?.email}`);
      return data.data;
    }
  });

  if (isPending) return <LoadingSpinner />
  if (isError) return <p className='text-red-500'>Something went wrong...</p>

  return (
    <>
      <Helmet>
        <title>My Bookings</title>
      </Helmet>

      {
        bookings && bookings.length > 0 ? (
          <div className='container mx-auto'>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Title
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Info
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Price
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        From
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        To
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
                    {/* Table Row Data */}
                    {
                      bookings.map(booking => (
                        <BookingDataRow key={booking._id} booking={booking} />
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className='min-h-screen flex flex-col gap-3 justify-center items-center'>
            <p className='text-gray-600 text-xl font-semibold'>No listing room found</p>
            <Link to='/'>
              <button className='bg-rose-500 tex-white px-6 py-2 rounded font-bold text-white'>Book Now</button>
            </Link>
          </div>
        )
      }
    </>
  )
}

export default MyBookings