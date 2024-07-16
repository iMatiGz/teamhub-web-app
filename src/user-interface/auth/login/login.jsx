import { LoginSection } from './components/login-section';

export const LoginPage = () => {
  return (
    <main>
      <main className='flex h-dvh'>
        <img src='/icons/bg.svg' alt='imagen' className='size-full absolute' />
        <img src='/icons/text-logo.svg' alt='text-logo' className='absolute m-12' />
        <section className='flex z-10 w-full items-center justify-center'>
          <LoginSection />
        </section>
      </main>
    </main>
  );
};
