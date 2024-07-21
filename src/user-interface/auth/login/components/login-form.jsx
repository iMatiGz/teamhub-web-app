import { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useFetch } from '../../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../../hooks/contexts/useUserStore';

const API_URL = import.meta.env.VITE_API_URL || null;

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [trigger, setTrigger] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const setUserData = useUserStore(state => state.setUserData);
  const setUserControls = useUserStore(state => state.setControls);
  const navigate = useNavigate();
  const { data, error, isLoading } = useFetch(`${API_URL}/login`, 'GET', trigger, {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${btoa(email + ':' + password)}`,
  });

  useEffect(() => {
    if (error) return setOpenAlert(true);
    if (data) {
      const userData = {
        id: data.user_id,
        name: data.username,
        avatar: data.profile_image,
        status: data['status.name'],
      };
      setUserData(userData);
      setUserControls();
      return navigate('/home');
    }
  }, [data, error, isLoading]);

  useEffect(() => {
    if (trigger) setTrigger(false);
  }, [trigger]);

  const handleSubmit = async event => {
    event.preventDefault();
    setTrigger(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-4'>
        <label htmlFor='email' className='flex text-[12px] text-gray-400 font-bold'>
          {' '}
          CORREO ELECTRONICO O NUMERO DE TELEFONO <p className='pl-1 text-red-500 text-[9px]'>*</p>{' '}
        </label>
        <input
          required
          id='email'
          type='text'
          name='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
          autoComplete='email'
          className='py-[9px] rounded-sm bg-neutral-900 bg-opacity-70 px-3 text-[15px] text-neutral-200'
        />
        <label htmlFor='password' className='flex mt-3 text-[12px] text-gray-400 font-bold'>
          {' '}
          CONTRASEÑA <p className='pl-1 text-red-500 text-[9px]'>*</p>{' '}
        </label>
        <input
          required
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
          autoComplete='email'
          className='py-2 rounded-sm bg-neutral-900 bg-opacity-70 px-3 text-md'
        />
        <p className='text-xs text-sky-500 font-medium'> ¿Olvidaste tu contraseña? </p>
        <input
          type='submit'
          value='Iniciar sesión'
          className='py-3 my-3 bg-[#5865F2] text-sm font-semibold rounded-md hover:cursor-pointer hover:bg-[#5360EC] active:bg-[#4D5BE7]'
        />
        <span className='flex text-xs font-medium text-neutral-400 -mt-1'>
          {' '}
          ¿Necesitas una cuenta? <p className='text-sky-500 pl-1'> Registrarse </p>{' '}
        </span>
      </form>

      {error && (
        <Snackbar open={openAlert} autoHideDuration={5000} onClose={() => setOpenAlert(false)}>
          <Alert severity='error' variant='filled' onClose={() => setOpenAlert(false)}>
            {error.message}{' '}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
