import { Outlet, useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { ChannelItem } from './components/channel-item';
import { useServerStore } from '../../../hooks/contexts/useServerStore';

const API_URL = import.meta.env.VITE_API_URL;

export const ChannelLayout = () => {
  const { server } = useParams();

  const currentServer = useServerStore(state => state.currentServer);
  const [channels, setChannels] = useState([]);
  const { data, error, isLoading } = useFetch(`${API_URL}/servers/channels?serverId=${server}`, 'GET', true);

  useEffect(() => {
    if (data) {
      const channels = data.map(c => {
        return <ChannelItem key={c.channel_id} channelId={c.channel_id} name={c.name} />;
      });
      setChannels(channels);
    }
  }, [data, error, isLoading]);

  return (
    <section className='flex'>
      <section className='h-[93dvh] w-60 channel-section-bg'>
        <header className='m-3 px-2 font-semibold tracking-wider truncate'>{currentServer.name}</header>
        <hr className='w-full border-[#1e2124] shadow-xl' />
        {/* <div>Text Channels</div> */}
        {data && channels}
      </section>
      <Outlet />
    </section>
  );
};
