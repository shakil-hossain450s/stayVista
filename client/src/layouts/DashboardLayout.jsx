import { Outlet } from 'react-router';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';

const DashboardLayout = () => {
  return (
    <section className='realtive min-h-screen md:flex'>
      {/* sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* dynamic content */}
      <div className='flex-1 md:ml-64'>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;