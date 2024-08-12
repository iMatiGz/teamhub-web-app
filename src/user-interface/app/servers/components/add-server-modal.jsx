import { Alert, Modal, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../../../hooks/contexts/useUserStore';
import { useFetch } from '../../../../hooks/useFetch';

const API_URL = import.meta.env.VITE_API_URL;

export const AddServerModal = ({ openCreateServer, setOpenCreateServer }) => {
  const user = useUserStore(state => state.user);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [serverName, setServerName] = useState(`${user.name}'s server`);
  const [trigger, setTrigger] = useState(false);
  const { data, error, isLoading } = useFetch(
    `${API_URL}/servers/new`,
    'POST',
    trigger,
    { 'Content-Type': 'application/json' },
    { serverName: serverName }
  );
  const handleCreateServer = async () => {
    setTrigger(true);
  };

  const handleCloseModal = () => {
    setShowSuccessMsg(false);
    setOpenCreateServer(false);
  };

  useEffect(() => {
    setTrigger(false);
    if (data) setShowSuccessMsg(true);
  }, [data, error, isLoading]);

  return (
    <Modal open={openCreateServer} onClose={() => setOpenCreateServer(false)}>
      <section className='flex justify-center items-center h-full'>
        <section className='flex flex-col global-color-bg w-[27%] p-4 rounded-lg'>
          <div className='flex items-center justify-center self-end p-1 hover:cursor-pointer'>
            <button
              className='flex items-center justify-center p-1'
              onClick={() => setOpenCreateServer(false)}
            >
              {exitSvg}
            </button>
          </div>
          <span className='text-2xl font-extrabold tracking-wider text-center pb-4 -mt-3'>
            Create Your Server
          </span>
          <span className='text-md text-[#ccc] text-center pb-4'>
            Your server is where you and your friends hang out. Make yours and start talking.
          </span>
          <label htmlFor='server-name' className='text-xs tracking-wider font-semibold py-2'>
            SERVER NAME
          </label>
          <input
            id='server-name'
            type='text'
            value={serverName}
            onChange={e => setServerName(e.target.value)}
            className='outline-none servers-section-bg h-10 p-2 text-gray-300 rounded-md mb-2'
          />
          <button
            className='border-gray-500 border-[1px] h-14 rounded-md hover:bg-gray-400/20 mt-4'
            onClick={handleCreateServer}
          >
            Create My Own
          </button>
        </section>
        {showSuccessMsg && (
          <Snackbar open={showSuccessMsg} autoHideDuration={5000} onClose={handleCloseModal}>
            <Alert severity='success' variant='filled' onClose={handleCloseModal}>
              Server created successfully.
            </Alert>
          </Snackbar>
        )}
      </section>
    </Modal>
  );
};

const exitSvg = (
  <svg
    className='closeIcon_f9a4c9 text-[#aaa] hover:cursor-pointer'
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
      d='M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z'
      className=''
    ></path>
  </svg>
);
