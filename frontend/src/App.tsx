import { ToastContainer } from 'react-toastify'
import './App.css'
import RouterConfig from './config/RouterConfig'
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './contexts/AuthenticationContext';
import Spinner from './components/Spinner';
import { FavoriteProvider, useFavorite } from './contexts/FavoriteContext';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const { loadFavorites, clearFavorites } = useFavorite();

  return (
    <AuthProvider
      onLoginSuccess={loadFavorites}
      onLogout={clearFavorites}
    >
      {children}
    </AuthProvider>
  );
};

function App() {
  return (
    <FavoriteProvider>
      <AppProviders>
        <div>
          <RouterConfig />
          <ToastContainer autoClose={3000} />
          <Spinner />
        </div>
      </AppProviders>
    </FavoriteProvider>
  );
}

export default App;