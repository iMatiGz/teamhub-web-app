import { Alert, Divider, Modal, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../../../../hooks/useFetch';

const API_URL = import.meta.env.VITE_API_URL;

export const FriendsContentHeader = ({ currentFilter, changeFilter }) => {
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [openSuccessText, setOpenSuccessText] = useState(false);
  const [openErrorText, setOpenErrorText] = useState(false);
  const [writtenUsername, setWrittenUsername] = useState('');
  const [trigger, setTrigger] = useState(false);
  const { data, error, isLoading } = useFetch(
    `${API_URL}/users/friend-request?username=${writtenUsername}`,
    'GET',
    trigger
  );

  const handleSearchUser = async () => {
    if (writtenUsername.length === 0) return;
    setTrigger(true);
    setShowAddFriendModal(false);
  };

  useEffect(() => {
    setTrigger(false);
    if (error) setOpenErrorText(true);
    if (data) setOpenSuccessText(true);
  }, [data, error, isLoading]);

  return (
    <header className='flex justify-between'>
      <section className='flex gap-5 py-2 px-4 items-center'>
        <div className='flex gap-2 py-1'>
          {friendsSvg}
          <span className='text-white font-semibold'>Friends</span>
        </div>
        <Divider
          orientation='vertical'
          variant='fullWidth'
          flexItem
          sx={{ height: 25, alignSelf: 'center', bgcolor: '#555' }}
        />
        <section className='flex gap-4 items-center'>
          <button
            className={`text-[#999] font-semibold h-6 px-2 rounded-md hover:bg-gray-500/10 hover:text-[#ccc] active:text-white ${
              currentFilter === 'Online' && 'bg-white/10 text-white'
            }`}
            onClick={() => changeFilter('Online')}
          >
            Online
          </button>
          <button
            className={`text-[#999] font-semibold h-6 px-2 rounded-md hover:bg-gray-500/10 hover:text-[#ccc] active:text-white ${
              currentFilter === 'All Friends' && 'bg-white/10 text-white'
            }`}
            onClick={() => changeFilter('All Friends')}
          >
            All
          </button>
          <button className='text-[#999] font-semibold h-6 px-2 rounded-md hover:bg-gray-500/10 hover:text-[#ccc] active:text-white'>
            Pending
          </button>
          <button className='text-[#999] font-semibold h-6 px-2 rounded-md hover:bg-gray-500/10 hover:text-[#ccc] active:text-white'>
            Blocked
          </button>
          <button
            className='text-white bg-green-700 font-semibold h-6 px-2 rounded-md'
            onClick={() => setShowAddFriendModal(true)}
          >
            Add Friend
          </button>
        </section>
      </section>
      <section className='flex gap-4 mr-4 items-center'>
        {newGroupSvg}
        <Divider
          orientation='vertical'
          variant='fullWidth'
          flexItem
          sx={{ height: 25, alignSelf: 'center', bgcolor: '#555' }}
        />
        {inboxSvg}
        {helpSvg}
      </section>
      <Modal open={showAddFriendModal} onClose={() => setShowAddFriendModal(false)}>
        <section className='flex flex-col justify-center items-center h-full'>
          <input
            id='edit-data-input'
            type='text'
            placeholder='Search by username'
            onChange={e => setWrittenUsername(e.target.value)}
            className='w-64 h-10 p-3 rounded-md outline-none'
            autoComplete='false'
            required
          />
          <div className='flex mt-3 gap-4'>
            <button className='p-2 text-sm w-20' onClick={() => setShowAddFriendModal(false)}>
              Cancel
            </button>
            <button
              className='flex items-center justify-center p-2 text-sm w-24 h-8 bg-green-700 rounded-sm'
              onClick={handleSearchUser}
            >
              Search
            </button>
          </div>
        </section>
      </Modal>
      {openSuccessText && (
        <Snackbar open={openSuccessText} autoHideDuration={5000} onClose={() => setOpenSuccessText(false)}>
          <Alert severity='success' variant='filled' onClose={() => setOpenSuccessText(false)}>
            Friend request sent successfully.
          </Alert>
        </Snackbar>
      )}
      {openErrorText && (
        <Snackbar open={openErrorText} autoHideDuration={5000} onClose={() => setOpenErrorText(false)}>
          <Alert severity='error' variant='filled' onClose={() => setOpenErrorText(false)}>
            {`User ${writtenUsername} not found.`}
          </Alert>
        </Snackbar>
      )}
    </header>
  );
};

const friendsSvg = (
  <svg
    className='linkButtonIcon_c91bad label-color'
    aria-hidden='true'
    role='img'
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    viewBox='0 0 24 24'
  >
    <path fill='currentColor' d='M13 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z' className=''></path>
    <path
      fill='currentColor'
      d='M3 5v-.75C3 3.56 3.56 3 4.25 3s1.24.56 1.33 1.25C6.12 8.65 9.46 12 13 12h1a8 8 0 0 1 8 8 2 2 0 0 1-2 2 .21.21 0 0 1-.2-.15 7.65 7.65 0 0 0-1.32-2.3c-.15-.2-.42-.06-.39.17l.25 2c.02.15-.1.28-.25.28H9a2 2 0 0 1-2-2v-2.22c0-1.57-.67-3.05-1.53-4.37A15.85 15.85 0 0 1 3 5Z'
      className=''
    ></path>
  </svg>
);

const newGroupSvg = (
  <svg
    x='0'
    y='0'
    className='icon_fc4f04 text-[#b8b8b8]'
    aria-hidden='true'
    role='img'
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      d='M19 14a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z'
      fill='currentColor'
      className=''
    ></path>
    <path
      d='M20.76 12.57c.4.3 1.23.13 1.24-.37V12a10 10 0 1 0-18.44 5.36c.12.19.1.44-.04.61l-2.07 2.37A1 1 0 0 0 2.2 22h10c.5-.01.67-.84.37-1.24A3 3 0 0 1 15 16h.5a.5.5 0 0 0 .5-.5V15a3 3 0 0 1 4.76-2.43Z'
      fill='currentColor'
      className=''
    ></path>
  </svg>
);

const inboxSvg = (
  <svg
    x='0'
    y='0'
    className='icon_fc4f04 text-[#b8b8b8]'
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
      d='M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5ZM4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5h-2.65c-.5 0-.85.5-.85 1a3 3 0 1 1-6 0c0-.5-.35-1-.85-1H5.5A1.5 1.5 0 0 1 4 11.5v-6Z'
      clipRule='evenodd'
      className=''
    ></path>
  </svg>
);

const helpSvg = (
  <svg
    x='0'
    y='0'
    className='icon_fc4f04 text-[#b8b8b8]'
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
      fill='currentColor'
      fillRule='evenodd'
      d='M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm-.28-16c-.98 0-1.81.47-2.27 1.14A1 1 0 1 1 7.8 7.01 4.73 4.73 0 0 1 11.72 5c2.5 0 4.65 1.88 4.65 4.38 0 2.1-1.54 3.77-3.52 4.24l.14 1a1 1 0 0 1-1.98.27l-.28-2a1 1 0 0 1 .99-1.14c1.54 0 2.65-1.14 2.65-2.38 0-1.23-1.1-2.37-2.65-2.37ZM13 17.88a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0Z'
      clipRule='evenodd'
      className=''
    ></path>
  </svg>
);
