import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Order from "./components/Order";
import Cart from "./components/Cart";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { ProductContextProvider } from "./productContext";
import { AuthContextProvider } from "./authContext";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/orders",
      element: <Order />
    },
    {
      path: "/cart",
      element: <Cart />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/login",
      element: <SignIn />
    }
  ]);

  return (
    <>
      <AuthContextProvider>
        <ProductContextProvider>
          <RouterProvider router={router} />
        </ProductContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;