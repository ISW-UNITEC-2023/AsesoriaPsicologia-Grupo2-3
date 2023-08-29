import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Reset from "./components/Reset";
import ResetPass from "./pages/ResetPass";
const Login = () => <div>Login</div>;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/reset" element={<Reset />} />
      <Route path="/reset-pass" element={<ResetPass />} />
    </Route>
  )
);

function App({ routes }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
