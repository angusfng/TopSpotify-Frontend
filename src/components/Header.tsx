import { useEffect, useState } from "react";
import {
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
  UnorderedList,
  ListItem,
  Box,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";
import useAuth from "../helpers/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import circle from "../helpers/circle.png";

const Header = () => {
  const accessToken = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [, , removeCookie] = useCookies([]);
  const [displayName, setDisplayName] = useState<string | undefined>(
    "Spotify User"
  );
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
    <Flex
      as="nav"
      flexDirection="column"
      width="18rem"
      h="100vh"
      position="fixed"
      pt="1rem"
      bg="white"
    >
      <Box py="1rem" pl="1.5rem">
        <Heading as="h1" mb="2rem">
          Top Spotify
        </Heading>
        <Menu placement="bottom-start">
          <MenuButton>
            <Flex align="center">
              <Image
                boxSize="50px"
                borderRadius="full"
                src={spotifySrc}
                fallbackSrc={circle}
                alt="Spotify Profile Picture"
                mr="1rem"
              />
              <Text fontWeight="semibold">{displayName}</Text>
            </Flex>
          </MenuButton>
          <MenuList>
            <LinkBox>
              <MenuItem>
                <LinkOverlay href={spotifyURL}>
                  View Spotify Profile
                </LinkOverlay>
              </MenuItem>
            </LinkBox>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <UnorderedList listStyleType="none" ml={0} mt="1rem">
        <LinkBox>
          <ListItem
            py="1rem"
            px="1.5rem"
            fontSize="1.4em"
            color={location.pathname === "/artists" ? "#1DB954" : ""}
            _hover={{
              background: "gray.50",
            }}
          >
            <LinkOverlay as={RouterLink} to="/artists">
              Top Artists
            </LinkOverlay>
          </ListItem>
        </LinkBox>
        <LinkBox>
          <ListItem
            py="1rem"
            px="1.5rem"
            fontSize="1.4em"
            color={location.pathname === "/tracks" ? "#1DB954" : ""}
            _hover={{
              background: "gray.50",
            }}
          >
            <LinkOverlay as={RouterLink} to="/tracks">
              Top Tracks
            </LinkOverlay>
          </ListItem>
        </LinkBox>
      </UnorderedList>
    </Flex>
  );
};

export default Header;
