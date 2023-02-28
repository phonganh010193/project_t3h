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
import Introduce from "../views/Introduce";
import HistoryOrder from "../views/HistoryOrder";
import ForgotPassword from "../container/ForgotPassword";
import Renraku from "../component/Renraku";
import NewService from "../component/NewService";
import PayMent from "../component/PayMent";
import Transport from "../Transport";
import ReturnProduct from "../component/ReturnProduct";
import Guerantee from "../component/Guarantee";
import Security from "../component/Security";
import UpdateNewProduct from "../views/UpdateNewProduct";

const routerName = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
  { path: "/perfume/:categoryId", element: <Perfume />, errorElement: <ErrorPage /> },
  { path: "/perfume-detail/:productId", element: <Detail />, errorElement: <ErrorPage /> },
  { path: "/signin", element: <SignIn />, errorElement: <ErrorPage /> },
  { path: "/signup", element: <SignUp />, errorElement: <ErrorPage /> },
  { path: "/cart", element: <Cart />, errorElement: <ErrorPage /> },
  { path: "/abate/:orderId", element: <Abate />, errorElement: <ErrorPage /> },
  { path: "/introduce", element: <Introduce />, errorElement: <ErrorPage /> },
  { path: "/perfume/:100", element: <Perfume />, errorElement: <ErrorPage /> },
  { path: "/abate", element: <HistoryOrder />, errorElement: <ErrorPage /> },
  { path: "/search/:value", element: <SearchList />, errorElement: <ErrorPage /> },
  { path: "/forgot-password", element: <ForgotPassword />, errorElement: <ErrorPage /> },
  { path: "/renraku", element: <Renraku />, errorElement: <ErrorPage /> },
  { path: "/newservice", element: <NewService />, errorElement: <ErrorPage /> },
  { path: "/payment", element: <PayMent />, errorElement: <ErrorPage /> },
  { path: "/transport", element: <Transport />, errorElement: <ErrorPage /> },
  { path: "/return-product", element: <ReturnProduct />, errorElement: <ErrorPage /> },
  { path: "/guerantee", element: <Guerantee />, errorElement: <ErrorPage /> },
  { path: "/security", element: <Security />, errorElement: <ErrorPage /> },
  { path: "/admin/update/product", element: <UpdateNewProduct />, errorElement: <ErrorPage /> },
]);

export default routerName;
