import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import VariablesPage from "../pages/VariablesPage.jsx";
import VariablesDeterminedPage from "../pages/VariablesDeterminedPage.jsx";

const routerConfig = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/variables", element: <VariablesPage /> },
    { path: "/variables/:variableId", element: <VariablesDeterminedPage /> },
    { path: "*", element: <div>404</div> },
]);

export default routerConfig;