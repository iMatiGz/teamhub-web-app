import { useNavigate } from 'react-router-dom';
import { RegisterForm } from './register-form';

export const RegisterSection = () => {
  const navigate = useNavigate();
  return (
    <section className='flex gap-16 bg-[#33363b] p-8 rounded-md'>
      <div className='flex flex-col w-[416px]'>
        <h2 className='text-2xl font-semibold text-center tracking-wide'>Crear una Cuenta</h2>
        <RegisterForm />
        <button
          className='font-medium text-sm mt-3 text-sky-500 hover:cursor-pointer'
          onClick={() => navigate('/login')}
        >
          ¿Ya tienes una cuenta?
        </button>
      </div>
    </section>
  );
};
