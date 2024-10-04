import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Login from "./components/authentications/Login";
import Register from "./components/authentications/Register";
import {ProtectedRoute, ProtectedRootRoute } from "./components/authentications/ProtectedRoute";
import AuthProvider from "./context/AuthContext";

import RootLayout from "./Layouts/RootLayout";
import DeveloperLayout from "./Layouts/DeveloperLayout";

import DocumentationPage from "./Developer/Documentation/DocumenationPage";
import ErrorAnalyser from "./Developer/ErrorAnalyser";
import CodeSummarizer from "./Developer/CodeSummarizer";
import HomePage from "./pages/Homepage";
import CodeVisualizer from "./Developer/CodeVisualizer";
import MyCodeLabs from "./Developer/MyCodeLabs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>

      <Route index element={<ProtectedRootRoute/>} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="developer" element={<DeveloperLayout />}>

        <Route index element={<ProtectedRoute child={<HomePage />} />} />
        <Route path="documentation" element={<DocumentationPage/>} />
        <Route path="mycodelabs" element={<MyCodeLabs/>} />
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
