import { useNavigate } from 'react-router-dom';
import { UserAvatar } from '../../../shared/components/user-avatar';

export const FriendLabel = ({ id, name, avatar, status, description }) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/channels/@me/${id}`);
  };

  return (
    <button
      className='flex flex-none group gap-3 mx-2 px-2 h-11 items-center rounded-md hover:bg-[#33373b]'
      onClick={handleRedirect}
    >
      <UserAvatar avatar={avatar} status={status} description={description} />
      <span className='text-[#999] text-base font-semibold truncate group-hover:text-[#ddd] group-active:text-[#eee]'>
        {name}
      </span>
    </button>
  );
};
