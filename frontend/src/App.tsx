import { ToastContainer } from 'react-toastify'
import './App.css'
import RouterConfig from './config/RouterConfig'
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './contexts/AuthenticationContext';
import Spinner from './components/Spinner';

function App() {

  return (

    <AuthProvider>
      <div>
        <RouterConfig />
        <ToastContainer autoClose={3000} />
        <Spinner />
      </div>
    </AuthProvider>
  )
}

export default App
