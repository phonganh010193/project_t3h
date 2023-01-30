import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../component/ErrorPage/ErrorPage";
import SignIn from "../container/SignIn";
import SignUp from "../container/SignUP";
import Abate from "../views/Abate";
import Cart from "../views/Cart";
import Detail from "../views/Detail";
import HomePage from "../views/Home";
import Perfume from "../views/Perfume";
import SearchList from "../views/SearchList";

const routerName = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
  { path: "/perfume/:categoryId", element: <Perfume />, errorElement: <ErrorPage /> },
  { path: "/perfume-detail/:productId", element: <Detail />, errorElement: <ErrorPage /> },
  { path: "/signin", element: <SignIn />, errorElement: <ErrorPage /> },
  { path: "/signup", element: <SignUp />, errorElement: <ErrorPage /> },
  { path: "/cart", element: <Cart />, errorElement: <ErrorPage /> },
  { path: "/abate", element: <Abate />, errorElement: <ErrorPage /> },
  { path: "/search/:value", element: <SearchList />, errorElement: <ErrorPage /> },
]);

export default routerName;
