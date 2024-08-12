import { Avatar } from '@mui/material';

export const MessageBubble = ({ userName, avatar, creationDate, content }) => {
  const messageDate = new Date(creationDate);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(messageDate);

  return (
    <article className='flex mx-2 gap-3 items-center'>
      <Avatar src={avatar || '/images/no-profile-pic.jpg'} alt='user-avatar' />
      <div className='flex flex-col'>
        <div className='flex gap-2 items-baseline'>
          <span>{userName}</span>
          <span className='text-xs text-gray-400'>{formattedDate}</span>
        </div>
        <span className='text-gray-200 pr-4'>{content}</span>
      </div>
    </article>
  );
};
