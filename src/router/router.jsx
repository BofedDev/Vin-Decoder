import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homePage.jsx";
import VariablesPage from "../pages/variablesPage.jsx";
import VariablesDeterminedPage from "../pages/variablesDeterminedPage.jsx";
import Layout from "../components/Layout.jsx";

const routerConfig = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {path: "/", element: <HomePage/>},
            {path: "/variables", element: <VariablesPage/>},
            {path: "/variables/:variableId", element: <VariablesDeterminedPage/>},
            {path: "*", element: <div>404</div>},
        ]
    }
]);

export default routerConfig;