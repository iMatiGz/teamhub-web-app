import { useParams } from 'react-router-dom';
import { useServerStore } from '../../../../hooks/contexts/useServerStore';
import { useFetch } from '../../../../hooks/useFetch';
import { useEffect, useRef, useState } from 'react';
import { MessageBubble } from './components/message-bubble';
import { io } from 'socket.io-client';
import { useUserStore } from '../../../../hooks/contexts/useUserStore';

const API_URL = import.meta.env.VITE_API_URL;

const socket = io('/');

export const ChannelMsgContent = () => {
  const { channel } = useParams();
  const currentServer = useServerStore(state => state.currentServer);
  const currentChannel = useServerStore(state => state.currentChannel);
  const userData = useUserStore(state => state.user);
  const messagesEndRef = useRef(null);
  const [writtenMessage, setWrittenMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { data, error, isLoading } = useFetch(
    `${API_URL}/servers/channels/messages?channelId=${channel}`,
    'GET',
    true
  );
  document.title = `Teamhub | #${currentChannel.name} | ${currentServer.name}`;

  useEffect(() => {
    socket.on('channelMessageReceived', message => {
      setMessages(prevMessages => [
        ...prevMessages,
        <MessageBubble
          key={message.message_id}
          avatar={message.avatar}
          content={message.content}
          creationDate={message.creation_date}
          userName={message.username}
        />,
      ]);
    });
  }, []);

  useEffect(() => {
    if (data) {
      const messages = data.map(m => {
        return (
          <MessageBubble
            key={m.message_id}
            avatar={m.avatar}
            content={m.content}
            creationDate={m.creation_date}
            userName={m.username}
          />
        );
      });
      setMessages(messages);
    }
  }, [data, error, isLoading]);

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView();
  }, [messages]);

  const handleSendMessage = () => {
    const messageData = {
      user_id: userData.id,
      username: userData.name,
      avatar: userData.avatar,
      content: writtenMessage,
      serverId: currentServer.id,
      channelId: currentChannel.id,
    };

    socket.emit('channelMessageSent', messageData);
    setWrittenMessage('');
  };

  return (
    <section className='flex flex-col flex-1 h-[100dvh] justify-between'>
      <div className='flex flex-col'>
        <header className='flex items-center gap-2 px-2 m-3 w-full font-semibold tracking-wide'>
          {hashtagSvg}
          {currentChannel.name}
        </header>
        <hr className='w-full border-[#1e2124] shadow-xl' />
      </div>
      <section className='flex flex-col gap-4 mx-2 py-4 overflow-y-auto overflow-x-hidden scrollbar-wide'>
        {data && messages}
        <div ref={messagesEndRef} />
      </section>
      <section className='py-6 px-4 pt-0 w-full bottom-0 relative'>
        <div className='flex items-center min-h-11 px-4 rounded-lg w-full message-input-bg'>
          {uploadSvg}
          <input
            className='h-full px-4 flex-1 bg-transparent outline-none text-wrap break-words'
            type='text'
            id='message-input'
            placeholder={`Message #${currentChannel.name}`}
            value={writtenMessage}
            onChange={e => setWrittenMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
        </div>
      </section>
    </section>
  );
};

const hashtagSvg = (
  <svg
    x='0'
    y='0'
    className='icon_fc4f04 text-gray-500'
    aria-hidden='true'
    role='img'
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z'
      clipRule='evenodd'
      className=''
    ></path>
  </svg>
);

const uploadSvg = (
  <svg
    className='hover:cursor-pointer'
    aria-hidden='true'
    role='img'
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle cx='12' cy='12' r='10' fill='transparent' className=''></circle>
    <path
      fill='#ccc'
      fillRule='evenodd'
      d='M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm0-17a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7a1 1 0 0 1 1-1Z'
      clipRule='evenodd'
      className='attachButtonPlus_f298d4'
    ></path>
  </svg>
);
