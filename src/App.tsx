import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from 'react-hot-toast';
import GlobalLoading from './components/ui/loading/GlobalLoading';

function App() {
  return (
    <>
      <GlobalLoading />
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
