import './App.css'
import './pages/kezdolap/kezdolap.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from './AppRoutes';

const routeer = createBrowserRouter(router)




function App() {
  return <RouterProvider router={routeer} />
}

export default App
