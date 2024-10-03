import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Login from "./components/authentications/Login";
import Register from "./components/authentications/SignUp";
import { ProtectedRoute, ProtectedRootRoute } from "./components/authentications/ProtectedRoute";
import AuthProvider from "./context/AuthContext";

import RootLayout from "./Layouts/RootLayout";
import DeveloperLayout from "./Layouts/DeveloperLayout";

import ErrorAnalyser from "./Developer/ErrorAnalyser";
import CodeSummarizer from "./Developer/CodeSummarizer";
import HomePage from "./pages/Homepage";
import CodeVisualizer from "./Developer/CodeVisualizer";
import ProfilePage from "./pages/ProfilePage";
import CodeEditor from "./Developer/CodeEditor";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../Routes/codeEditor/theme";
import DocumentationPage from "./Developer/DocumentationPage";
import MyCodeLabs from "./components/Documentation/MyCodeLabs";
import CodeLab from "./components/Documentation/CodeLab";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>

      <Route index element={<ProtectedRootRoute />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Register />} />
      <Route path="profile" element={<ProfilePage />} />

      <Route path="developer" element={<DeveloperLayout />}>

        <Route index element={<ProtectedRoute child={<HomePage />} />} />
        <Route path="documentation" element={<DocumentationPage />} >
          <Route index element={<ProtectedRoute child={<MyCodeLabs />} />} />
          <Route path="/edit" element={<ProtectedRoute child={<CodeLab />} />} />
          <Route path="genAI" element={<ProtectedRoute child={<div>gen ai page</div>} />} />

        </Route>
        <Route path="errorAnalyser" element={<ProtectedRoute child={<ErrorAnalyser />} />} />
        <Route path="codeSummarizer" element={<ProtectedRoute child={<CodeSummarizer />} />} />
        <Route path="codeVisualizer" element={<ProtectedRoute child={<CodeVisualizer />} />} />
        <Route path="codeEditor" element={<ProtectedRoute child={
          <>
            <ChakraProvider theme={theme}>
              <CodeEditor />
            </ChakraProvider>
          </>
        } />} />

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
