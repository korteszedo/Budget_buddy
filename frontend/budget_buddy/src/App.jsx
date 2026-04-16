import './App.css'
import './pages/kezdolap/kezdolap.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from './AppRoutes';

// router init
const routeer = createBrowserRouter(router)




// app gyoker
function App() {
  return <RouterProvider router={routeer} />
}

export default App
