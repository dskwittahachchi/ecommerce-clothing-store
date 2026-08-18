import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AccountPage } from "./pages/AccountPage";
import { AdminPage } from "./pages/AdminPage";
import { AuthPage } from "./pages/AuthPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import { ProductPage } from "./pages/ProductPage";
import { ShopPage } from "./pages/ShopPage";
import { WishlistPage } from "./pages/WishlistPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/product/:slug", element: <ProductPage /> },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/auth", element: <AuthPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/order-success/:id", element: <OrderSuccessPage /> },
      { path: "/account", element: <AccountPage /> },
      { path: "*", element: <NotFoundPage /> }
    ]
  },
  { path: "/admin", element: <AdminPage /> }
]);

export function App() {
  return <RouterProvider router={router} />;
}
