import PropTypes from 'prop-types'
import UpdateUserRole from '../Modal/UpdateUserRole';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const UserDataRow = ({ user }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ roleData, email }) => {
      const { data } = await axiosSecure.patch(`/api/user/${email}/role`, { roleData });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        toast.success(`Successfully user updated to`);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    }
  })

  const modalHandler = async (roleData, user) => {

    try {

      await mutateAsync({ roleData, email: user?.email });
      setIsOpen(false);

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${user.status === 'verified' ? 'text-green-500' : 'text-yellow-500'
              } whitespace-no-wrap`}
          >
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserRole
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        />
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
}

export default UserDataRow;