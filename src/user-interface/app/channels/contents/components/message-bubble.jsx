import { Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { io } from 'socket.io-client';

const socket = io('/');

export const MessageBubble = ({
  messageId,
  senderId,
  currentUserId,
  userName,
  avatar,
  creationDate,
  content,
}) => {
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

  const handleDeleteMessage = () => {
    const message = {
      id: messageId,
    };
    socket.emit('messageDeleted', message);
  };

  return (
    <article className='flex mx-2 gap-3 items-center group'>
      <Avatar src={avatar || '/images/no-profile-pic.jpg'} alt='user-avatar' />
      <div className='flex flex-col'>
        <div className='flex gap-2 items-baseline'>
          <span>{userName}</span>
          <span className='text-xs text-gray-400'>{formattedDate}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-200 pr-4'>{content}</span>
          {senderId === currentUserId && (
            <button className='text-red-400 hidden group-hover:flex' onClick={handleDeleteMessage}>
              <DeleteIcon sx={{ height: 20 }} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
