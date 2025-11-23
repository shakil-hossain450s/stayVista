import PropTypes from 'prop-types'
import UpdateUserRole from '../Modal/UpdateUserRole';
import { useState } from 'react';
const UserDataRow = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalHandler = (roleData) => {
    console.log('user role updated', roleData);
    setIsOpen(false);
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