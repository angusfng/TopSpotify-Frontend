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
  useMediaQuery,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";
import useAuth from "../helpers/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import circle from "../helpers/circle.png";
import DrawerNav from "./DrawerNav";

const Header = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
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
    if (accessToken) {
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
        .catch((error) => {
          console.log("header error");
          console.error(error);
        });
    }
  }, [accessToken]);

  const logout = () => {
    removeCookie("spotifyAccessToken");
    removeCookie("spotifyRefreshToken");
    history.push("/");
  };

  if (isLargerThan1280) {
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
  }

  return (
    <Flex as="nav" bg="white" h="3.5rem" align="center" justify="space-between">
      <Flex mx="1rem" align="center">
        <DrawerNav />
        <Heading as="h1" size="lg" ml="1rem" w="max-content" color="gray.800">
          Top Spotify
        </Heading>
      </Flex>
      <Menu>
        <MenuButton>
          <Flex align="center" mr="1rem">
            {isLargerThan600 && (
              <Text fontWeight="semibold">{displayName}</Text>
            )}
            <Image
              boxSize="45px"
              borderRadius="full"
              src={spotifySrc}
              fallbackSrc={circle}
              alt="Spotify Profile Picture"
              ml="1rem"
            />
          </Flex>
        </MenuButton>
        <MenuList>
          <LinkBox>
            <MenuItem>
              <LinkOverlay href={spotifyURL}>View Spotify Profile</LinkOverlay>
            </MenuItem>
          </LinkBox>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;