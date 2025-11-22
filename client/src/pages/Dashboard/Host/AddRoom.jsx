import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddFormForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import {
  useMutation
} from '@tanstack/react-query'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const AddRoom = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageText, setImageText] = useState('Upload Image');
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const handleImageChange = e => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageText(file.name);
    }
  }

  // handle get dates from date range
  const handleDates = item => {
    // console.log(item);
    setDates(item.selection)
  }

  // console.log(dates);

  // handle post data using useMutation
  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = await axiosSecure.post('/api/room', roomData);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        toast.success('Room added successfully!');
        navigate('/dashboard/my-listings');
      }
    }
  })

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const price = form.price.value;
    const guests = form.guest.value;
    const bathrooms = form.bathrooms.value;
    const bedrooms = form.bedrooms.value;
    const description = form.description.value;
    const image = form.image.files[0];

    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email
    }

    try {
      setLoading(true);
      // get image url
      const image_url = await imageUpload(image);
      // create roomData object
      const roomData = {
        location,
        category,
        title,
        from,
        to,
        price,
        guests,
        bathrooms,
        bedrooms,
        description,
        host,
        image: image_url
      }

      console.table(roomData);

      // post data to the server
      await mutateAsync(roomData);
      setLoading(false);

    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>
      <section data-aos='fade-right'>
        {/* add room form */}
        <AddRoomForm dates={dates} handleDates={handleDates} handleSubmit={handleSubmit} loading={loading} handleImageChange={handleImageChange} preview={preview} imageText={imageText} />
      </section>
    </>
  );
};

export default AddRoom;