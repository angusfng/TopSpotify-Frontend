import { Flex } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

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
        <>
          <Dashboard />
          <Login />
        </>
      )}
    </Flex>
  );
};

export default App;
