import { Outlet, useLocation } from 'react-router-dom';
import { FeatureButton } from './components/feature-buttons';
import { FriendsList } from './components/friends-list';
import { FriendsContent } from './contents/friends-content';

const TITLE = 'Teamhub | Friends';

export const MeChannel = () => {
  document.title = TITLE;
  const location = useLocation();

  return (
    <section className='flex'>
      <section className='flex flex-col h-[93dvh] w-60 channel-section-bg '>
        <div className='m-[10px]'>
          <input
            id='start-conversation'
            placeholder='Find or start a conversation'
            readOnly
            className='w-full bg-[#1e2124] text-sm p-1 px-[6px] hover:cursor-pointer focus:outline-none'
          />
        </div>
        <section className='flex flex-col overflow-y-hidden overflow-x-hidden hover:overflow-y-auto scrollbar-thin'>
          <hr className='w-full border-[#1e2124] shadow-xl' />
          <section className='flex flex-col mt-2 m-[10px]'>
            <FeatureButton name='Friends' />
            <FeatureButton name='Nitro' />
            <FeatureButton name='Shop' />
          </section>
          <span className='my-2 mx-5 text-[11px] tracking-widest font-semibold text-[#999]'>
            DIRECT MESSAGES
          </span>
          <FriendsList />
        </section>
      </section>
      {location?.pathname === '/channels/@me' && (
        <div className='w-full'>
          <FriendsContent />
        </div>
      )}
      <Outlet />
    </section>
  );
};
