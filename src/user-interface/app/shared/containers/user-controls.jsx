import { UserAvatar } from '../components/user-avatar';
import { UserControlsItem } from '../components/user-controls-items';
import { useUserStore } from '../../../../hooks/contexts/useUserStore';

export const UserControls = () => {
  const user = useUserStore(state => state.user);
  const controls = useUserStore(state => state.controls);

  return (
    <section className='flex h-[7dvh] max-w-60 justify-between items-center px-[10px] user-controls-bg'>
      <section className='flex gap-2'>
        <UserAvatar avatar={user.avatar} status={user.status} description='' />
        <div className='flex flex-col justify-center'>
          <span className='max-w-20 text-sm font-semibold truncate'>{user.name}</span>
          <span className='text-xs text-gray-300 leading-3'>{user.status}</span>
        </div>
      </section>
      <section className='flex gap-[2px]'>
        <UserControlsItem
          name={controls?.microphone ? 'Turn Off Microphone' : 'Turn On Microphone'}
          type='microphone'
        />
        <UserControlsItem name={controls?.sound ? 'Deafen' : 'Undeafen'} type='sound' />
        <UserControlsItem name='User Settings' />
      </section>
    </section>
  );
};
