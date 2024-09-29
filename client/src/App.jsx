import {  Route, createBrowserRouter, createRoutesFromElements,  RouterProvider } from "react-router-dom";
import Login from "./components/authentications/Login";
import Register from "./components/authentications/Register";
import Homepage from "./components/homepages/Homepage";
import ProtectedRoute from "./components/authentications/ProtectedRoute";
import AuthProvider from "./context/AuthContext";

import RootLayout from "./Layouts/RootLayout";
import DeveloperLayout from "./Layouts/DeveloperLayout";


import Home from "./Developer/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>

      <Route index element={<Homepage />}  />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="/developer" element={<DeveloperLayout />}>
      
      <Route index element={<ProtectedRoute child={<Home />} />} />
      </Route>
      {/* <Route path="resetPassword" element={<ResetPassword />} /> */}


  {/* add routes */}


      {/* <Route path="*" element={<NotFound />} /> */}
    </Route>
  )
);
const App = () => {
  return (
    <AuthProvider>
     <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
