import { useEffect } from 'react';
import { useServerStore } from '../../../hooks/contexts/useServerStore';
import { LoginSection } from './components/login-section';
import { useUserStore } from '../../../hooks/contexts/useUserStore';
import Cookies from 'js-cookie';

const TITLE = 'Teamhub | Login';

export const LoginPage = () => {
  document.title = TITLE;
  const deleteUserData = useUserStore(state => state.deleteUserData);
  const setCurrentServer = useServerStore(state => state.setCurrentServer);
  const setCurrentChannel = useServerStore(state => state.setCurrentChannel);
  const setCurrentFriend = useServerStore(state => state.setCurrentFriend);

  useEffect(() => {
    deleteUserData();
    setCurrentServer({});
    setCurrentChannel({});
    setCurrentFriend({});
  }, []);

  Cookies.remove('userToken');

  return (
    <main>
      <main className='flex h-dvh'>
        <img src='/icons/bg.svg' alt='imagen' className='size-full absolute' />
        <img src='/icons/text-logo.svg' alt='text-logo' className='absolute m-12' />
        <section className='flex z-10 w-full items-center justify-center'>
          <LoginSection />
        </section>
      </main>
    </main>
  );
};
