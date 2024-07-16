import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './user-interface/shared/routing/app-router';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
