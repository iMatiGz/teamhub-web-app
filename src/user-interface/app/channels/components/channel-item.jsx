import { useNavigate, useParams } from 'react-router-dom';
import { useServerStore } from '../../../../hooks/contexts/useServerStore';

export const ChannelItem = ({ channelId, name }) => {
  const navigate = useNavigate();
  const { server } = useParams();

  const setCurrentChannel = useServerStore(state => state.setCurrentChannel);

  const handleRedirect = () => {
    setCurrentChannel({ id: channelId, name: name });
    navigate(`/channels/${server}/${channelId}`);
  };

  return (
    <div
      className={`flex flex-none group gap-3 mx-2 px-2 items-center rounded-md hover:bg-[#33373b] hover:cursor-pointer h-11`}
      onClick={handleRedirect}
    >
      <div className='flex justify-between items-center w-full truncate'>
        <span className='flex gap-1 items-center text-[#999] text-base font-semibold truncate group-hover:text-[#ddd] group-active:text-[#eee]'>
          {hashtagSvg}
          {name}
        </span>
      </div>
    </div>
  );
};

const hashtagSvg = (
  <svg
    x='0'
    y='0'
    className='icon_fc4f04'
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
      d='M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z'
      clipRule='evenodd'
      className=''
    ></path>
  </svg>
);
