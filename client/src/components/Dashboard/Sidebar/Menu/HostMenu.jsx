import MenuItem from './MenuItem';
import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md';

const HostMenu = () => {
  return (
    <>
      {/* Add Room */}
      <MenuItem
        label='Add Room'
        address='/dashboard/add-room'
        icon={BsFillHouseAddFill}
      />

      {/* My Listing */}
      <MenuItem
        label='My Listings'
        address='/dashboard/my-listings'
        icon={MdHomeWork}
      />

      {/* My Listing */}
      <MenuItem
        label='Manage Bookings'
        address='/dashboard/manage-bookings'
        icon={MdOutlineManageHistory}
      />
    </>
  );
};

export default HostMenu;