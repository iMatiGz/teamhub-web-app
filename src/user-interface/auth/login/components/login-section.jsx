import { LoginForm } from './login-form';

export const LoginSection = () => {
  return (
    <section className='flex gap-16 bg-[#33363b] p-8 rounded-md'>
      <div className='flex flex-col w-[416px]'>
        <h2 className='text-[20px] font-semibold text-center'>¡Te damos la bienvenida de nuevo!</h2>
        <p className='text-center pt-1 text-neutral-400 text-sm'>¡Nos alegra verte de nuevo!</p>
        <LoginForm />
      </div>
      <div className='flex flex-col max-w-60 items-center gap-2'>
        <img src='/images/login_QR.png' alt='QR' className='size-40' />
        <p className='font-semibold text-xl text-center'> código QR </p>
        <p className='font-light text-sm text-center text-neutral-300'>
          {' '}
          Escanea el código con la{' '}
          <b className='font-bold text-neutral-400'>aplicación para dispositivos móviles</b> de Discord para
          iniciar sesión de inmediato.{' '}
        </p>
        <p className='font-medium text-xs mt-3 text-sky-500'> Inicia sesión con una clave de acceso </p>
      </div>
    </section>
  );
};
