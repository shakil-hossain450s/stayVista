import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import RoomDataRow from '../../../components/TableRow/RoomDataRow'
import { Link } from 'react-router'

const MyListings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: rooms = [] } = useQuery({
    queryKey: ['my-listings', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/api/rooms/my-listings/${user?.email}`);
      return data.data;
    }
  })

  // console.log(rooms);

  return (
    <>
      <Helmet>
        <title>My Listings</title>
      </Helmet>

      {
        rooms && rooms.length > 0 ? (
          <div data-aos='zoom-in-up' className='container mx-auto px-4 sm:px-8'>
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
                        Location
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
                        Delete
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Room row data */}
                    {
                      rooms.map(room => (
                        <RoomDataRow key={room._id} room={room} />
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
            <Link to='/dashboard/add-room'>
              <button className='bg-rose-500 tex-white px-6 py-2 rounded font-bold text-white'>Add Room</button>
            </Link>
          </div>
        )
      }
    </>
  )
}

export default MyListings