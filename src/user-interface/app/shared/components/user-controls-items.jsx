import { useUserStore } from '../../../../hooks/contexts/useUserStore';
import { BlackTooltipSmall } from '../../../shared/mui-styles/tooltip-styles';

const SOUNDS = {
  mute: new Audio('/sounds/discord_mute.mp3'),
  unmute: new Audio('/sounds/discord_unmute.mp3'),
  deafen: new Audio('/sounds/discord_deafen.mp3'),
  undeafen: new Audio('/sounds/discord_undeafen.mp3'),
};

export const UserControlsItem = ({ name, type }) => {
  const control = useUserStore(state => state.controls);
  const updateControl = useUserStore(state => state.updateControls);

  const handleControl = () => {
    if (type === 'microphone') {
      if (!control.microphone && !control.sound) updateControl({ microphone: true, sound: true });
      else updateControl({ microphone: !control.microphone });
      control.microphone ? SOUNDS['mute'].play() : SOUNDS['unmute'].play();
    }

    if (type === 'sound') {
      if ((control.microphone && control.sound) || (!control.microphone && !control.sound))
        updateControl({ microphone: !control.microphone, sound: !control.sound });
      else updateControl({ sound: !control.sound });
      control.sound ? SOUNDS['deafen'].play() : SOUNDS['undeafen'].play();
    }
  };

  return (
    <BlackTooltipSmall title={name} placement='top'>
      <button className='p-[5px] rounded-md hover:bg-gray-600/65' onClick={handleControl}>
        <img src={`/icons/user-controls/${name.replaceAll(' ', '-')}.png`} className='size-5' />
      </button>
    </BlackTooltipSmall>
  );
};
