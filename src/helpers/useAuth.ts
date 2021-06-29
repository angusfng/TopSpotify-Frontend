import { useEffect } from "react";
import { useCookies } from "react-cookie";
import API from "./api";

// Get access token from localStorage or cookies
// 1. If access token is null then get one from backend and return it
// 2. If access token is expired then refresh it and return it
// 3. If I have non expired access token then return it

const useAuth = (authCode?: string) => {
  const [cookies, setCookie] = useCookies([
    "spotifyAccessToken",
    "spotifyRefreshToken",
  ]);

  // Returns date with time added
  const addTimeDate = (expiresIn: number) => {
    const currentTime = new Date();
    currentTime.setSeconds(currentTime.getSeconds() + expiresIn);
    return currentTime;
  };

  useEffect(() => {
    const storedExpire = localStorage.getItem("expiresIn");
    const expiresIn = new Date(storedExpire!);

    const getAccessToken = async () => {
      try {
        const payload = { authCode };
        const data = await API.postPath("/getAccess", payload);
        setCookie("spotifyAccessToken", data.accessToken, { path: "/" });
        setCookie("spotifyRefreshToken", data.refreshToken, { path: "/" });
        localStorage.setItem(
          "expiresIn",
          addTimeDate(data.expiresIn).toISOString()
        );
      } catch (error) {
        console.error(error);
      }
    };

    const refreshAccessToken = async () => {
      try {
        const payload = { refreshToken: cookies.spotifyRefreshToken };
        const data = await API.postPath("/refresh", payload);
        setCookie("spotifyAccessToken", data.accessToken, { path: "/" });
        localStorage.setItem(
          "expiresIn",
          addTimeDate(data.expiresIn).toISOString()
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (!cookies.spotifyAccessToken) {
      console.log("no token");
      getAccessToken();
    } else if (storedExpire && new Date() > expiresIn) {
      console.log("refresh");
      refreshAccessToken();
    }
  }, [
    authCode,
    setCookie,
    cookies.spotifyAccessToken,
    cookies.spotifyRefreshToken,
  ]);
  // console.log(cookies.spotifyAccessToken);
  return cookies.spotifyAccessToken;
};

export default useAuth;
