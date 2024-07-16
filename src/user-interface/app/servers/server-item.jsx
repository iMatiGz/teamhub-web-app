import { useNavigate } from 'react-router-dom';
import { BlackTooltip } from '../../shared/mui-styles/tooltip-styles';

export const ServerItem = ({ id, name, icon, gray = false }) => {
  const navigate = useNavigate();
  const serverImg = icon ? icon : '/icons/discord-mark-white.svg';
  const bgColor = gray ? 'bg-[#2c2f33]' : 'bg-[#5865F2]';

  const handleRedirect = () => {
    navigate(`/channels/${id}`);
  };
  return (
    <BlackTooltip onClick={handleRedirect} title={name} placement='right' arrow>
      <div
        className={`flex size-12 justify-center items-center aspect-square rounded-full hover:rounded-[18px] hover:cursor-pointer ${bgColor} transition-all delay-0 duration-75`}
      >
        <img src={serverImg} alt='Servidor Icono' className='size-7' />
      </div>
    </BlackTooltip>
  );
};

export const FeatureItem = ({ name, icon }) => {
  return (
    <BlackTooltip title={name} placement='right' arrow>
      <div className='flex size-12 justify-center items-center transition ease-in duration-250 rounded-full hover:rounded-[17px] bg-[#2f3336] hover:cursor-pointer hover:bg-[#3aad70]'>
        <div className='flex items-center justify-center size-full transition ease-in duration-250 text-[#3aad70] hover:text-[#fff] '>
          {icon}
        </div>
      </div>
    </BlackTooltip>
  );
};
