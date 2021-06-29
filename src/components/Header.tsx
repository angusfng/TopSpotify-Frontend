import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Text,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import useAuth from "../helpers/useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const Header = () => {
  const accessToken = useAuth();
  const history = useHistory();
  const [, , removeCookie] = useCookies([]);
  const [displayName, setDisplayName] = useState<string | undefined>("");
  const [spotifyURL, setSpotifyURL] = useState("");
  const [spotifySrc, setSpotifySrc] = useState("");

  useEffect(() => {
    const spotifyAPI = new SpotifyWebApi({
      accessToken: accessToken,
    });
    spotifyAPI
      .getMe()
      .then((data) => {
        setDisplayName(data.body.display_name);
        setSpotifyURL(data.body.external_urls.spotify);
        if (data.body.images) {
          setSpotifySrc(data.body.images[0].url);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [accessToken]);

  const logout = () => {
    removeCookie("spotifyAccessToken");
    removeCookie("spotifyRefreshToken");
    history.push("/");
  };

  return (
    <Flex h="4rem" bg="gray.200" align="center">
      <Heading>Top Spotify</Heading>
      <Menu>
        <MenuButton as={Button}>Actions</MenuButton>
        <MenuList>
          <LinkBox>
            <MenuItem>
              <LinkOverlay href={spotifyURL}>View Spotify Profile</LinkOverlay>
            </MenuItem>
          </LinkBox>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
      <Text>{displayName}</Text>
      <Image
        boxSize="50px"
        borderRadius="full"
        src={spotifySrc}
        alt="Spotify Profile Picture"
      />
    </Flex>
  );
};

export default Header;
