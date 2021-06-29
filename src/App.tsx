import { Flex } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

// Authcode null - check cookies
// Either show dashboard, or show login
// Authcode not null
// Show dashboard, push("/")

const App = () => {
  const [cookies] = useCookies(["spotifyAccessToken"]);
  const authCode = new URLSearchParams(window.location.search).get("code");

  return (
    <Flex>
      {authCode ? (
        <Dashboard authCode={authCode} />
      ) : cookies.spotifyAccessToken ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </Flex>
  );
};

export default App;
