import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { FeatureItem, ServerItem } from './server-item';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';

const API_URL = import.meta.env.VITE_API_URL || null;

export const ServersList = () => {
  const [serverItems, setServerItems] = useState([]);
  const { data, error, isLoading } = useFetch(`${API_URL}/servers?userId=${10}`, 'GET', true);

  useEffect(() => {
    if (data) {
      const items = data.map(s => {
        return <ServerItem key={s.server_id} id={s.server_id} name={s.name} icon={s.icon} />;
      });
      setServerItems(items);
    }
  }, [data, error, isLoading]);

  return (
    <section className='flex flex-col gap-2 w-[70px] h-[100dvh] items-center bg-[#1e2124] overflow-y-auto scrollbar-hide'>
      <div className='mt-3'>
        <ServerItem id='@me' name='Direct Messages' icon='/icons/discord-mark-white.svg' />
        <hr className='mt-2 border-gray-500 mx-2' />
      </div>
      <div className='flex flex-col gap-2'>{data && serverItems}</div>
      <div className='flex flex-col gap-2 mb-3'>
        <FeatureItem name='Add a Server' icon={<AddIcon />} />
        <FeatureItem name='Explore Discoverable Servers' icon={<ExploreIcon />} />
      </div>
    </section>
  );
};
