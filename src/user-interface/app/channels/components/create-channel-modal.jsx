import { Modal } from '@mui/material';
import { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('/');

export const CreateChannelModal = ({ isOpen, closeModal, currentServer }) => {
  const [channelName, setChannelName] = useState('');

  const handleChannelName = e => {
    const value = e.target.value;
    const lastCharacterValue = value[value.length - 1];

    if (channelName[channelName.length - 1] === '-' && lastCharacterValue === ' ') return;
    if (lastCharacterValue === ' ') {
      const fixedValue = value.replace(' ', '-');
      setChannelName(fixedValue);
      return;
    }

    const replacedValue = value.replace(/\s+/g, '-');
    setChannelName(replacedValue);
  };

  const handleCloseModal = () => {
    setChannelName('');
    closeModal(false);
  };

  const handleCreateChannel = () => {
    const channelData = {
      channelName: channelName,
      serverId: currentServer.id,
    };
    socket.emit('channelCreated', channelData);
    handleCloseModal();
  };

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <section className='absolute w-[500px] h-[270px] global-color-bg left-[50%] top-[50%] -ml-[250px] -mt-[150px] rounded-2xl'>
        <section className='flex flex-col gap-2 h-full'>
          <div className='flex flex-col mt-1 p-4'>
            <div className='flex justify-between items-center'>
              <span className='text-xl font-medium tracking-wide'>Create Channel</span>
              <button className='text-white/50' onClick={handleCloseModal}>
                {exitSvg}
              </button>
            </div>
            <span className='text-white/60 text-sm'>in Text Channels</span>
          </div>
          <section className='flex flex-col h-full justify-between'>
            <section className='flex flex-col gap-2 p-4'>
              <span className='text-xs font-semibold tracking-wider text-white/90'>CHANNEL NAME</span>
              <div className='flex gap-1 brown-input-bg p-2 text-white/80 items-center rounded-md'>
                {hashtagSvg}
                <input
                  id='new-channel-input'
                  type='text'
                  placeholder='new-channel'
                  value={channelName}
                  onChange={handleChannelName}
                  className='w-full bg-transparent outline-none'
                />
              </div>
            </section>
            <section className='flex w-full gap-2 justify-end channel-section-bg p-4 rounded-b-2xl'>
              <button
                className='py-2 px-6 text-sm font-semibold tracking-wider text-white/70 hover:underline hover:underline-offset-2'
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className='flex items-center justify-center py-2 px-4 text-sm h-9 indigo-color rounded-md font-semibold text-white/90 tracking-wide'
                onClick={handleCreateChannel}
              >
                Create Channel
              </button>
            </section>
          </section>
        </section>
      </section>
    </Modal>
  );
};

const exitSvg = (
  <svg
    aria-hidden='true'
    role='img'
    xmlns='http://www.w3.org/2000/svg'
    width='25'
    height='25'
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      fill='currentColor'
      d='M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z'
      className=''
    ></path>
  </svg>
);

const hashtagSvg = (
  <svg
    x='0'
    y='0'
    className='icon_fc4f04'
    aria-hidden='true'
    role='img'
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='18'
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
