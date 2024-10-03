import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Login from "./components/authentications/Login";
import Register from "./components/authentications/SignUp";
import {ProtectedRoute, ProtectedRootRoute } from "./components/authentications/ProtectedRoute";
import AuthProvider from "./context/AuthContext";

import RootLayout from "./Layouts/RootLayout";
import DeveloperLayout from "./Layouts/DeveloperLayout";

import DocumentationPage from "./Developer/Documentation(temp)/DocumenationPage";
import ErrorAnalyser from "./Developer/ErrorAnalyser";
import CodeSummarizer from "./Developer/CodeSummarizer";
import HomePage from "./pages/Homepage";
import CodeVisualizer from "./Developer/CodeVisualizer";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>

      <Route index element={<ProtectedRootRoute/>} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Register />} />
      <Route path="profile" element={<ProfilePage />} />

      <Route path="developer" element={<DeveloperLayout />}>

        <Route index element={<ProtectedRoute child={<HomePage />} />} />
        <Route path="documentation" element={<DocumentationPage/>} />
        <Route path="errorAnalyser" element={<ProtectedRoute child={<ErrorAnalyser />} />} />
        <Route path="codeSummarizer" element={<ProtectedRoute child={<CodeSummarizer />} />} />
        <Route path="codeVisualizer" element={<ProtectedRoute child={<CodeVisualizer />} />} />

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
