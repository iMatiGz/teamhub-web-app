import { Outlet } from 'react-router-dom';
import { ServersList } from './servers/servers-list';

export const AppPage = () => {
  return (
    <section className='flex'>
      <ServersList />
      <div className='flex flex-col'>
        <Outlet />
        <h2 className='bg-gray-500 flex-auto'>User Buttons</h2>
      </div>
    </section>
  );
};
