import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { FeatureItem, ServerItem } from './server-item';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import { useUserStore } from '../../../hooks/contexts/useUserStore';
import { AddServerModal } from './components/add-server-modal';

const API_URL = import.meta.env.VITE_API_URL || null;

export const ServersList = () => {
  const [serverItems, setServerItems] = useState([]);
  const user = useUserStore(state => state.user);
  const [trigger, setTrigger] = useState(true);
  const { data, error, isLoading } = useFetch(`${API_URL}/servers?userId=${user.id}`, 'GET', trigger);
  const [openCreateServer, setOpenCreateServer] = useState(false);
  const [reloadServersList, setReloadServersList] = useState(false);

  useEffect(() => {
    if (trigger) setTrigger(false);
    if (data) {
      const items = data.map(s => {
        return <ServerItem key={s.server_id} id={s.server_id} name={s.name} icon={s.icon} />;
      });
      setServerItems(items);
    }
  }, [data, error, isLoading]);

  useEffect(() => {
    if (reloadServersList === true) setTrigger(true);
  }, [reloadServersList]);

  return (
    <section className='flex flex-col gap-2 w-[70px] h-[100dvh] items-center servers-section-bg overflow-y-auto scrollbar-hide'>
      <div className='mt-3'>
        <ServerItem id='@me' name='Direct Messages' icon='/icons/discord-mark-white.svg' />
        <hr className='mt-2 border-gray-500 mx-2' />
      </div>
      <div className='flex flex-col gap-2'>{data && serverItems}</div>
      <div className='flex flex-col gap-2 mb-3'>
        <FeatureItem name='Add a Server' icon={<AddIcon />} setOpenCreateServer={setOpenCreateServer} />
        <FeatureItem name='Explore Discoverable Servers' icon={<ExploreIcon />} />
      </div>
      <AddServerModal
        openCreateServer={openCreateServer}
        setOpenCreateServer={setOpenCreateServer}
        reloadServersList={setReloadServersList}
      />
    </section>
  );
};
