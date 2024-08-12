import { useNavigate } from 'react-router-dom';
import { BlackTooltipSmall } from '../../../../../shared/mui-styles/tooltip-styles';
import { FriendLabel } from '../../components/friend-label';
import { Divider } from '@mui/material';
import { useServerStore } from '../../../../../../hooks/contexts/useServerStore';

export const ContentFriendLabel = ({ id, name, avatar, status, description }) => {
  const navigate = useNavigate();
  const setCurrentFriend = useServerStore(state => state.setCurrentFriend);

  const handleMessageRedirect = e => {
    e.stopPropagation();
    setCurrentFriend({ id: id, name: name });
    navigate(`/channels/@me/${id}`);
  };
  const handleOptions = e => {
    e.stopPropagation();
  };

  return (
    <div className='flex flex-col group mx-4'>
      <Divider className='bg-white/10 w-[96%] self-center' />
      <FriendLabel
        id={id}
        name={name}
        avatar={avatar}
        description={description}
        status={status}
        height='h-[60px]'
      >
        <div className='flex gap-2'>
          <BlackTooltipSmall onClick={handleMessageRedirect} title='Message' placement='top'>
            <div className='group channel-section-bg p-2 rounded-full group-hover:bg-black/50'>
              {messageSvg}
            </div>
          </BlackTooltipSmall>
          <BlackTooltipSmall onClick={handleOptions} title='More' placement='top'>
            <div className='group channel-section-bg p-2 rounded-full group-hover:bg-black/50'>
              {optionsSvg}
            </div>
          </BlackTooltipSmall>
        </div>
      </FriendLabel>
    </div>
  );
};

const messageSvg = (
  <svg
    className='icon_e01b91 text-gray-400 group-hover:text-gray-300 active:text-gray-100'
    aria-hidden='true'
    role='img'
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      fill='currentColor'
      d='M12 22a10 10 0 1 0-8.45-4.64c.13.19.11.44-.04.61l-2.06 2.37A1 1 0 0 0 2.2 22H12Z'
      className=''
    ></path>
  </svg>
);

const optionsSvg = (
  <svg
    className='icon_e01b91 text-gray-400 group-hover:text-gray-300 active:text-gray-100'
    aria-hidden='true'
    role='img'
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M10 4a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm2 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z'
      clipRule='evenodd'
      className=''
    ></path>
  </svg>
);
