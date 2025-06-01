import LayoutFrontend from './layouts/frontend';
import { useRoutes } from 'react-router-dom';
import RouterFrontend from './router/RouterFrontend';
import RouterBackend from './router/RouterBackend';
import LayoutBackend from './layouts/admin/index';

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutFrontend />,
      children: RouterFrontend, 
    },
    {
      path: "/admin", 
      element: <LayoutBackend />,
      children: RouterBackend, 
    },
  ]);
  return element;
}

export default App;
