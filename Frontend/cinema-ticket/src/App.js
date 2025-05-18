import LayoutFrontend from './layouts/frontend';
import { useRoutes } from 'react-router-dom';
import RouterFrontend from './router/RouterFrontend';

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutFrontend />,
      children: RouterFrontend, 
    },
    {
      path: "/admin",
    }
  ]);
  return element;
}

export default App;
