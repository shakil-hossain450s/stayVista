import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { useState } from 'react'
import DeleteModal from '../Modal/DeleteModal';
import UpdateRoomModal from '../Modal/UpdateRoomModal';
import { imageUpload } from '../../api/utils';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const RoomDataRow = ({ room, handleDelete }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageText, setImageText] = useState('Upload Image');
  const [imageUrl, setImageUrl] = useState('');

  const queryClient = useQueryClient();

  const closeModal = () => {
    setIsOpen(false);
  }

  const [dates, setDates] = useState({
    startDate: new Date(room?.from),
    endDate: new Date(room?.to),
    key: 'selection',
  });
  // handle get dates from date range
  const handleDates = item => {
    // console.log(item);
    setDates(item.selection)
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageText(file.name);
      const image_url = await imageUpload(file);
      setImageUrl(image_url);
    }
  }

  const { mutateAsync: updateRoom } = useMutation({
    mutationFn: async (updatedRoomData) => {
      const { data } = await axiosSecure.put(`/api/rooms/room/${room?._id}`, updatedRoomData);
      return data;
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['my-listings']);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
      setLoading(false);
      setIsEditModalOpen(false);
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    console.log(imageUrl);

    try {
      setLoading(true);
      const updatedRoomData = {
        location: form.location.value,
        category: form.category.value,
        title: form.title.value,
        from: dates.startDate,
        to: dates.endDate,
        price: form.price.value,
        guests: form.guest.value,
        bathrooms: form.bathrooms.value,
        bedrooms: form.bedrooms.value,
        description: form.description.value,
        image: imageUrl || room?.image,
        host: {
          name: room?.host?.name,
          image: room?.host?.image,
          email: room?.host?.email
        }
      }

      console.table(updatedRoomData);

      await updateRoom(updatedRoomData);


      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={room?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{room?.title}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{room?.location}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${room?.price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(room?.from), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(room?.to), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => setIsOpen(!isOpen)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </button>
        {/* Delete modal */}
        <DeleteModal isOpen={isOpen} closeModal={closeModal} id={room?._id} handleDelete={handleDelete} />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => setIsEditModalOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </button>
        {/* Update Modal */}
        <UpdateRoomModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          handleSubmit={handleSubmit}
          room={room}
          dates={dates}
          handleDates={handleDates}
          loading={loading}
          handleImageChange={handleImageChange}
          preview={preview}
          imageText={imageText}
        />
      </td>
    </tr>
  )
}

RoomDataRow.propTypes = {
  room: PropTypes.object,
  // refetch: PropTypes.func,
  handleDelete: PropTypes.func
}

export default RoomDataRow