import { useNavigate } from 'react-router-dom';
import { UserAvatar } from '../../../shared/components/user-avatar';
import { io } from 'socket.io-client';
import { useState } from 'react';
import { useServerStore } from '../../../../../hooks/contexts/useServerStore';

const socket = io('/');

export const FriendLabel = ({ id, name, avatar, status, description, children, height = 'h-11' }) => {
  const [userStatus, setUserStatus] = useState(status);
  const setCurrentFriend = useServerStore(state => state.setCurrentFriend);
  const navigate = useNavigate();

  socket.on('userGotConnected', data => {
    if (data.id === id) setUserStatus(data.status);
  });

  socket.on('userGotDisconnected', data => {
    if (data.id === id) setUserStatus(data.status);
  });

  const handleRedirect = () => {
    setCurrentFriend({ id: id, name: name });
    navigate(`/channels/@me/${id}`);
  };

  return (
    <div
      className={`flex flex-none group gap-3 mx-2 px-2 items-center rounded-md hover:bg-[#33373b] hover:cursor-pointer ${height}`}
      onClick={handleRedirect}
    >
      <UserAvatar avatar={avatar} status={userStatus} description={description} />
      <div className='flex justify-between items-center w-full truncate'>
        <span className='text-[#999] text-base font-semibold truncate group-hover:text-[#ddd] group-active:text-[#eee]'>
          {name}
        </span>
        {children}
      </div>
    </div>
  );
};
