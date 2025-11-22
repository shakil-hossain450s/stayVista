import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddFormForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";
import { addDays } from "date-fns";

const AddRoom = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageText, setImageText] = useState('');
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 5),
    key: 'selection',
  })

  const handleImageChange = e => {
    const file = e.target.files[0];
    console.log(file);
    if(file){
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
    const guest = form.guest.value;
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
        guest,
        bathrooms,
        bedrooms,
        description,
        host,
        image: image_url
      }

      console.log(roomData);


      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Add Room</h2>

      {/* add room form */}
      <AddRoomForm dates={dates} handleDates={handleDates} handleSubmit={handleSubmit} loading={loading} handleImageChange={handleImageChange} preview={preview} imageText={imageText} />
    </section>
  );
};

export default AddRoom;