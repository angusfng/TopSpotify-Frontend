import { Flex } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const App = () => {
  // Check if I have cookies
  // If I have cookies then go to dashboard
  // Else go to login page and get auth coe
  const authCode = new URLSearchParams(window.location.search).get("code");

  return (
    <Flex>{authCode ? <Dashboard authCode={authCode} /> : <Login />}</Flex>
  );
};

export default App;
