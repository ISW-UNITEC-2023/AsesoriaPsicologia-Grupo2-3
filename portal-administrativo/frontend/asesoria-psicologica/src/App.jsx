import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const Login = () => <div>Login</div>;
const Reset = () => <div>Reset</div>;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/reset" element={<Reset />} />
      <Route path="login" element={<Login />} />
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
