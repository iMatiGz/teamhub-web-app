import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../auth/login/login';
import { ProtectedRoute } from './protected-routes';
import { AppPage } from '../../app/app-layout';
import { MeChannel } from '../../app/channels/@me/channel-layout.';
import { ChannelLayout } from '../../app/channels/channel-layout';
import { DirectMsgContent } from '../../app/channels/contents/direct-msg-content';

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<ProtectedRoute element={<Navigate to='/channels/' />} />} />
      <Route path='/channels/' element={<ProtectedRoute element={<AppPage />} />}>
        <Route index element={<ProtectedRoute element={<Navigate to='/channels/@me' />} />} />
        <Route path='/channels/@me' element={<ProtectedRoute element={<MeChannel />} />}>
          <Route path='/channels/@me/:userId' element={<ProtectedRoute element={<DirectMsgContent />} />} />
        </Route>
        <Route path='/channels/:server' element={<ProtectedRoute element={<ChannelLayout />} />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<Navigate to='/channels/@me' />} />
    </Routes>
  );
};
