import { Alert, Avatar, Modal, Snackbar } from '@mui/material';
import { useUserStore } from '../../../../hooks/contexts/useUserStore';
import { useFetch } from '../../../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export const UserSettingsModal = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);
  const { data, error, isLoading } = useFetch(`${API_URL}/users/me/data`, 'GET', true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [buttonSelected, setButtonSelected] = useState(null);
  const [content, setContent] = useState('');
  const [openSuccessText, setOpenSuccessText] = useState(false);

  useEffect(() => {}, [data, error, isLoading]);

  const handleSubmitEdition = async () => {
    if (content.length === 0) return;

    const res = await fetch(`${API_URL}/users/me/edit`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field: buttonSelected, value: content }),
    });

    if (res.ok) setOpenSuccessText(true);
    setShowEditModal(false);
  };

  const handleLogout = () => navigate('/login');

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <section className='flex justify-center items-center h-full'>
        <button
          className='absolute top-[140px] right-[380px] text-3xl rounded-full p-2 border-2'
          onClick={() => setShowModal(false)}
        >
          {exitSvg}
        </button>
        <span className='absolute top-[185px] right-[388px] text-xs'>ESC</span>
        <div className='flex flex-col w-[45%] servers-section-bg rounded-lg'>
          <section className='bg-green-500 h-20 rounded-lg rounded-t-lg px-5 py-8'>
            <Avatar
              src={user.avatar || 'no-profile-pic.jpg'}
              sx={{
                height: 80,
                width: 80,
                borderColor: 'color-mix(in oklab, hsl(225 calc(1 * 6.3%) 12.5% / 1) 100%, black 0%)',
                borderWidth: '4px',
              }}
            />
          </section>
          {data && (
            <section className='flex flex-col channel-section-bg m-5 mt-14 p-4 gap-6 rounded-lg'>
              <div className='flex gap-1 justify-between'>
                <div className='flex flex-col'>
                  <span className='text-xs text-gray-300 font-semibold'>USERNAME</span>
                  <span>{user.name}</span>
                </div>
                <button
                  className='px-4 h-8 bg-[#626262] rounded-sm text-sm'
                  onClick={() => {
                    setButtonSelected('username');
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
              </div>
              <div className='flex gap-1 justify-between'>
                <div className='flex flex-col'>
                  <span className='text-xs text-gray-300 font-semibold'>EMAIL</span>
                  <span>{data.email}</span>
                </div>
                <button
                  className='px-4 h-8 bg-[#626262] rounded-sm text-sm'
                  onClick={() => {
                    setButtonSelected('email');
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
              </div>
              <div className='flex gap-1 justify-between'>
                <div className='flex flex-col'>
                  <span className='text-xs text-gray-300 font-semibold'>PASSWORD</span>
                  <span>***********</span>
                </div>
                <button
                  className='px-4 h-8 bg-[#626262] rounded-sm text-sm'
                  onClick={() => {
                    setButtonSelected('password');
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
              </div>
              <button className='mt-2 p-2 bg-red-500/75 rounded-sm' onClick={handleLogout}>
                Log Out
              </button>
            </section>
          )}
        </div>
        <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
          <section className='flex flex-col justify-center items-center h-full'>
            <input
              id='edit-data-input'
              type='text'
              placeholder={`New ${buttonSelected}`}
              onChange={e => setContent(e.target.value)}
              className='w-64 h-10 p-3 rounded-md outline-none'
              autoComplete='false'
              required
            />
            <div className='flex mt-3 gap-4'>
              <button className='p-2 text-sm w-20' onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button
                className='flex items-center justify-center p-2 text-sm w-24 h-8 bg-green-700 rounded-sm'
                onClick={handleSubmitEdition}
              >
                Save
              </button>
            </div>
          </section>
        </Modal>
        {openSuccessText && (
          <Snackbar open={openSuccessText} autoHideDuration={5000} onClose={() => setOpenSuccessText(false)}>
            <Alert severity='success' variant='filled' onClose={() => setOpenSuccessText(false)}>
              {buttonSelected[0].toUpperCase() + buttonSelected.substring(1)} updated successfully.
            </Alert>
          </Snackbar>
        )}
      </section>
    </Modal>
  );
};

const exitSvg = (
  <svg
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
      d='M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z'
      className=''
    ></path>
  </svg>
);
