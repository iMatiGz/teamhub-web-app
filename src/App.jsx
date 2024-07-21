import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './user-interface/shared/routing/app-router';
import { io } from 'socket.io-client';

const socket = io('/');

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
