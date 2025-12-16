import { Fooldal } from "./pages/fooldal/Fooldal"
import { Kezdolap } from "./pages/kezdolap/Kezdolap"
import Admin from "./pages/Admin"
import Celok from "./pages/Celok"
import Grafikonok from "./pages/Grafikonok"


const router = [
    {
        path: "/",
        element: <Kezdolap/>
    },
    {
        path: "/fooldal",
        element: <Fooldal/>
    },
    {
        path: "/admin",
        element: <Admin/>
    },
    {
        path: "/celok",
        element: <Celok/>
    },
    {
        path: "/gradikonok",
        element: <Grafikonok/>
    },
]

export default router;