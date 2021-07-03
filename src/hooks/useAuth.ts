import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import API from "../helpers/api";

const useAuth = (authCode?: string) => {
  const [cookies, setCookie] = useCookies([
    "spotifyAccessToken",
    "spotifyRefreshToken",
  ]);
  const [token, setToken] = useState(cookies.spotifyAccessToken);

  // Returns date with time added
  const addTimeDate = (expiresIn: number) => {
    const currentTime = new Date();
    currentTime.setSeconds(currentTime.getSeconds() + expiresIn);
    return currentTime;
  };

  useEffect(() => {
    if (authCode && !cookies.spotifyAccessToken) {
      // No token
      const getAccessToken = async () => {
        try {
          const payload = { authCode };
          const data = await API.postPath("/getAccess", payload);
          setCookie("spotifyAccessToken", data.accessToken, { path: "/" });
          setCookie("spotifyRefreshToken", data.refreshToken, { path: "/" });
          setToken(data.accessToken);
          localStorage.setItem(
            "expiresIn",
            addTimeDate(data.expiresIn).toISOString()
          );
        } catch (error) {
          console.error(error);
        }
      };
      getAccessToken();
    } else {
      // Refresh
      const storedExpire = localStorage.getItem("expiresIn");
      const expiresIn = new Date(storedExpire!);

      if (storedExpire && new Date() > expiresIn) {
        const refreshAccessToken = async () => {
          try {
            const payload = { refreshToken: cookies.spotifyRefreshToken };
            const data = await API.postPath("/refresh", payload);
            setCookie("spotifyAccessToken", data.accessToken, { path: "/" });
            setToken(data.accessToken);
            localStorage.setItem(
              "expiresIn",
              addTimeDate(data.expiresIn).toISOString()
            );
          } catch (error) {
            console.error(error);
          }
        };
        refreshAccessToken();
      }
    }
  }, [
    authCode,
    cookies.spotifyAccessToken,
    cookies.spotifyRefreshToken,
    setCookie,
  ]);

  return token;
};

export default useAuth;
