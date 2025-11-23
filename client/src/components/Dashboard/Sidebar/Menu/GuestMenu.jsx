import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './/MenuItem'
import useUserRole from '../../../../hooks/useUserRole'
import HostRequestModal from '../../../Modal/HostRequestModal'
import toast from 'react-hot-toast'
import useAuth from '../../../../hooks/useAuth'
import { useState } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const GuestMenu = () => {
  const { role } = useUserRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const { data: userInfo = {} } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/api/user/${user?.email}`)
      return data.data;
    }
  })

  const { mutateAsync } = useMutation({
    mutationFn: async (updatedData) => {
      const { data } = await axiosSecure.patch(`/api/user/status`, updatedData);
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Success! Please wait for admin approval.')
      } else if (data.success === false) {
        toast.success(data.message)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    }
  })

  const handleRequestHost = async () => {
    try {
      const updatedData = {
        email: user?.email,
        status: 'requested'
      }
      await mutateAsync(updatedData)

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      closeModal();
    }
  }

  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='/dashboard/my-bookings'
      />

      {
        role === 'guest' && (
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className='w-full flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300 hover:text-gray-700 cursor-pointer'>
            <GrUserAdmin className='w-5 h-5' />

            <span className='mx-4 font-medium'>{userInfo?.status === 'requested' ? 'Requested to Host' : 'Become a Host'}</span>
          </button>
        )
      }
      {/* host request modal */}
      <HostRequestModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleRequestHost={handleRequestHost}
      />
    </>
  )
}

export default GuestMenu;