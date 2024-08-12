import { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useFetch } from '../../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || null;

export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [trigger, setTrigger] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccessMsg, setOpenSuccessMsg] = useState(false);
  const navigate = useNavigate();
  const { data, error, isLoading } = useFetch(
    `${API_URL}/register`,
    'POST',
    trigger,
    { 'Content-Type': 'application/json' },
    { username: username, email: email, password: password }
  );

  useEffect(() => {
    if (error) return setOpenAlert(true);
    if (data) setOpenSuccessMsg(true);
  }, [data, error, isLoading]);

  useEffect(() => {
    if (trigger) setTrigger(false);
  }, [trigger]);

  const handleSubmit = async event => {
    event.preventDefault();
    setTrigger(true);
  };

  const handleRedirectLogin = () => {
    setOpenSuccessMsg(false);
    navigate('/login');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-4'>
        <label htmlFor='email' className='flex text-[12px] text-gray-400 font-bold'>
          CORREO ELECTRONICO <p className='pl-1 text-red-500 text-[9px]'>*</p>
        </label>
        <input
          required
          id='email'
          type='text'
          name='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
          className='py-[9px] rounded-sm bg-neutral-900 bg-opacity-70 px-3 text-[15px] text-neutral-200'
        />
        <label htmlFor='password' className='flex mt-3 text-[12px] text-gray-400 font-bold'>
          NOMBRE DE USUARIO <p className='pl-1 text-red-500 text-[9px]'>*</p>
        </label>
        <input
          required
          id='username'
          type='text'
          name='username'
          value={username}
          onChange={event => setUsername(event.target.value)}
          className='py-2 rounded-sm bg-neutral-900 bg-opacity-70 px-3 text-md'
        />
        <label htmlFor='password' className='flex mt-3 text-[12px] text-gray-400 font-bold'>
          CONTRASEÑA <p className='pl-1 text-red-500 text-[9px]'>*</p>
        </label>
        <input
          required
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
          className='py-2 rounded-sm bg-neutral-900 bg-opacity-70 px-3 text-md'
        />
        <input
          type='submit'
          value='Continuar'
          className='mt-5 py-3 my-3 bg-[#5865F2] text-base font-semibold rounded-md hover:cursor-pointer hover:bg-[#5360EC] active:bg-[#4D5BE7]'
        />
      </form>
      {error && (
        <Snackbar open={openAlert} autoHideDuration={5000} onClose={() => setOpenAlert(false)}>
          <Alert severity='error' variant='filled' onClose={() => setOpenAlert(false)}>
            {error.message}
          </Alert>
        </Snackbar>
      )}
      {openSuccessMsg && (
        <Snackbar open={openSuccessMsg} autoHideDuration={5000} onClose={handleRedirectLogin}>
          <Alert severity='success' variant='filled' onClose={handleRedirectLogin}>
            Usuario creado exitosamente.
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
