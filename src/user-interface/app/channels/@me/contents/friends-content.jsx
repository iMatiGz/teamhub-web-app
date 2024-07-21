import { FriendsContentHeader } from './components/header';

export const FriendsContent = () => {
  return (
    <section className='flex flex-col'>
      <FriendsContentHeader />
      <hr className='w-full border-[#1e2124] shadow-xl' />
    </section>
  );
};
