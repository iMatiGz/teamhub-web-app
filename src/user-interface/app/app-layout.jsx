import { Outlet } from 'react-router-dom';
import { ServersList } from './servers/servers-list';
import { UserControls } from './shared/containers/user-controls';
import { io } from 'socket.io-client';
import { useUserStore } from '../../hooks/contexts/useUserStore';
import { useEffect } from 'react';

const socket = io('/');

export const AppPage = () => {
  const user = useUserStore(state => state.user);

  useEffect(() => {
    socket.emit('userLogged', user.id);
  }, []);

  return (
    <section className='flex'>
      <ServersList />
      <div className='flex flex-col w-full'>
        <Outlet />
        <UserControls />
      </div>
    </section>
  );
};
