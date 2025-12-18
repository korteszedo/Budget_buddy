import { Fooldal } from "./pages/fooldal/Fooldal"
import { Kezdolap } from "./pages/kezdolap/Kezdolap"
import Admin from "./pages/Admin"
import Tervek from "./pages/Tervek"
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
        path: "/tervek",
        element: <Tervek/>
    },
    {
        path: "/grafikonok",
        element: <Grafikonok/>
    },
]

export default router;