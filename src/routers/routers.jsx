import {createBrowserRouter,} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../components/CartPage";
import CartPage from "../components/CartPage";
import CheckoutPage from "../components/CheckoutPage";
import AdminRoute from "./AdminRoute";
import SingleBook from "../pages/Home/SingleBook";
import PrivateRoute from "./PrivateRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/orders",
          element: <div>orders</div>
        },
        {
          path: "api/users/login",
          element: <Login/>
        },
        {
          path: "api/users/register",
          element: <Register/>
        },
        {
          path: "/CartPage",
          element: <CartPage/>
        },
        {
          path: "/CheckoutPage",
          element: <PrivateRoute><CheckoutPage/></PrivateRoute>
        },
        {
          path: "/books/:id",
          element: <SingleBook/>
        }
        
      ]
    },
    {
      path: "/admin",
      element: <AdminLogin/>
    },
    {
      path: "/dashboard",
      element: <AdminRoute><DashboardLayout/></AdminRoute>,
      children: [
        {
          path: "",
          element:  <AdminRoute><Dashboard/></AdminRoute>
        },
        {
          path: "add-new-book",
          element: <AdminRoute><AddBook/></AdminRoute>
        },
        {
          path: "edit-book/:id",
          element: <AdminRoute><div>Edit Book</div></AdminRoute>
        },
        {
          path: "manage-books",
          element: <AdminRoute><ManageBooks/></AdminRoute>
        }

      ]

    }

  ]
);

  export default router;  