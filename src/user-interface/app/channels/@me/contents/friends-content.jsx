import { useEffect, useState } from 'react';
import { useFetch } from '../../../../../hooks/useFetch';
import { FriendsContentHeader } from './components/header';
import { ContentFriendLabel } from './components/content-friend-label';
import { io } from 'socket.io-client';

const socket = io('/');
const API_URL = import.meta.env.VITE_API_URL;

export const FriendsContent = () => {
  const [currentFilter, setCurrentFilter] = useState('Online');
  const [friends, setFriends] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const { data, error, isLoading } = useFetch(`${API_URL}/users/me/friends`, 'GET', fetchTrigger);

  useEffect(() => {
    socket.on('userGotConnected', () => setFetchTrigger(true));
    socket.on('userGotDisconnected', () => setFetchTrigger(true));
  }, []);

  useEffect(() => {
    setFetchTrigger(false);
    if (data) {
      const list = data
        .filter(friend => {
          if (currentFilter === 'Online') return friend.status_name !== 'Invisible';
          if (currentFilter === 'All Friends') return friend;
        })
        .map(friend => {
          return (
            <ContentFriendLabel
              key={friend.user_id}
              id={friend.user_id}
              name={friend.username}
              avatar={friend.profile_image}
              status={friend.status_name}
              description={friend.status_description}
            />
          );
        });
      setFriends(list);
    }
  }, [data, error, isLoading, currentFilter]);

  return (
    <section className='flex flex-col h-[100dvh]'>
      <FriendsContentHeader currentFilter={currentFilter} changeFilter={setCurrentFilter} />
      <hr className='w-full border-[#1e2124] shadow-xl' />
      <section className='flex flex-col overflow-hidden h-full max-w-[71%] border-r border-r-white/10'>
        <input
          id='search-online-friends'
          placeholder='Search'
          readOnly
          className='w-[95%] bg-[#1e2124] my-4 mx-8 py-[5px] px-[10px] rounded-[5px] hover:cursor-pointer focus:outline-none'
        />
        <span className='mt-2 mb-4 mx-8 text-[11px] font-semibold text-white/60 tracking-wider'>
          {currentFilter.toUpperCase()} — {friends.length}
        </span>
        <section className='overflow-y-auto overflow-x-hidden scrollbar-wide'>{friends}</section>
      </section>
    </section>
  );
};
