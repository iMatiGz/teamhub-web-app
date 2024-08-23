import { Outlet, useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { ChannelItem } from './components/channel-item';
import { useServerStore } from '../../../hooks/contexts/useServerStore';
import { BlackTooltipSmall } from '../../shared/mui-styles/tooltip-styles';
import { CreateChannelModal } from './components/create-channel-modal';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL;
const socket = io('/');

export const ChannelLayout = () => {
  const { server } = useParams();
  const currentServer = useServerStore(state => state.currentServer);
  const [openCreateChannelModal, setOpenCreateChannelModal] = useState(false);
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

  useEffect(() => {
    socket.on('newChannelCreated', channelData => {
      if (channelData.server_id === currentServer.id) {
        setChannels(prevChannels => [
          ...prevChannels,
          <ChannelItem
            key={channelData.channel_id}
            channelId={channelData.channel_id}
            name={channelData.name}
          />,
        ]);
      }
    });
  }, []);

  return (
    <section className='flex'>
      <section className='h-[93dvh] w-60 channel-section-bg'>
        <header className='m-3 px-2 font-semibold tracking-wider truncate'>{currentServer.name}</header>
        <hr className='w-full border-[#1e2124] shadow-xl' />
        <section className='flex group gap-2 px-4 justify-between items-center mt-2'>
          <span className='text-[12px] font-semibold tracking-wide text-white/60 group-hover:text-white/70 group-hover:cursor-default'>
            TEXT CHANNELS
          </span>
          <BlackTooltipSmall title='Create Channel' placement='top'>
            <button className='text-2xl text-white/60' onClick={() => setOpenCreateChannelModal(true)}>
              +
            </button>
          </BlackTooltipSmall>
        </section>
        {data && channels}
      </section>
      <CreateChannelModal
        isOpen={openCreateChannelModal}
        closeModal={setOpenCreateChannelModal}
        currentServer={currentServer}
      />
      <Outlet />
    </section>
  );
};
