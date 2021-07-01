import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Tag,
  Text,
  Image,
  Link,
  ListItem,
  OrderedList,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  IconButton,
} from "@chakra-ui/react";
import useAuth from "../helpers/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Header from "./Header";
import { Route, Switch, useHistory } from "react-router-dom";
import { TimeRangeType } from "../types";
import TimeRangeSelect from "./TimeRangeSelect";
import DrawerExample from "./DrawerExample";
import BannerHeading from "./BannerHeading";
import { FaSpotify } from "react-icons/fa";

interface DashboardProps {
  authCode?: string;
}

const Dashboard = (props: DashboardProps) => {
  const [topArtists, setTopArtists] = useState<SpotifyApi.ArtistObjectFull[]>(
    []
  );
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const limit = 10;
  const [timeRange, setTimeRange] = useState<TimeRangeType>("medium_term");
  const [artistsTotal, setArtistsTotal] = useState(0);
  const [tracksTotal, setTracksTotal] = useState(0);

  const history = useHistory();
  const accessToken = useAuth(props.authCode);

  useEffect(() => {
    history.push("/artists");
    const spotifyAPI = new SpotifyWebApi({
      accessToken: accessToken,
    });
    spotifyAPI
      .getMyTopArtists({
        limit: limit,
        time_range: timeRange,
      })
      .then((data) => {
        setArtistsTotal(data.body.total);
        setTopArtists(data.body.items);
      })
      .catch((err) => {
        console.error(err);
      });
    spotifyAPI
      .getMyTopTracks({ limit: limit, time_range: timeRange })
      .then((data) => {
        // console.log(data.body.items);
        setTopTracks(data.body.items);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [accessToken, history, timeRange]);

  const getMoreArtists = () => {
    console.log(topArtists.length + 10);
    const spotifyAPI = new SpotifyWebApi({
      accessToken: accessToken,
    });
    spotifyAPI
      .getMyTopArtists({
        limit: limit,
        offset: topArtists.length,
        time_range: timeRange,
      })
      .then((data) => {
        setTopArtists((topArtists) => [...topArtists, ...data.body.items]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getMoreTracks = () => {
    const spotifyAPI = new SpotifyWebApi({
      accessToken: accessToken,
    });
    spotifyAPI
      .getMyTopTracks({
        limit: limit,
        offset: topArtists.length,
        time_range: timeRange,
      })
      .then((data) => {
        setTopTracks((topTracks) => [...topTracks, ...data.body.items]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const capitalizeWords = (spacedString: string) => {
    return spacedString
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  return (
    <Flex minH="100vh" flex={1}>
      <Header />
      <Box flex={1} pl="18rem" pb="1rem" bg="#fafafa">
        <Switch>
          <Route exact path="/artists">
            <BannerHeading
              bgURL={topArtists[0]?.images[0]?.url}
              heading="Your Top Artists"
            />
            <TimeRangeSelect
              setTimeRange={setTimeRange}
              timeRange={timeRange}
            />
            <Box p="1rem">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Artist</Th>
                    <Th textAlign="center">Open in spotify</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {topArtists.map((artistObj, idx) => (
                    <Tr
                      key={artistObj.id}
                      _hover={{
                        background: "white",
                      }}
                    >
                      <Td fontSize="xl">{idx + 1}</Td>
                      <Td>
                        <Flex align="center">
                          <Image
                            boxSize="90px"
                            borderRadius="md"
                            src={artistObj.images[0].url}
                          />
                          <Box>
                            <Heading
                              as="h4"
                              size="sm"
                              fontWeight="semibold"
                              mx="1rem"
                              my="0.7rem"
                            >
                              {artistObj.name}
                            </Heading>
                            <Box ml="0.9rem">
                              {artistObj.genres
                                .map((genreString) => {
                                  return capitalizeWords(genreString);
                                })
                                .map((genre, idx) => (
                                  <Tag
                                    key={idx}
                                    mr="0.7rem"
                                    my="0.3rem"
                                    variant="outline"
                                  >
                                    {genre}
                                  </Tag>
                                ))}
                            </Box>
                          </Box>
                        </Flex>
                      </Td>
                      <Td textAlign="center">
                        <IconButton
                          aria-label="Search database"
                          color="#1DB954"
                          variant="outline"
                          size="lg"
                          as={Link}
                          href={artistObj.external_urls.spotify}
                          icon={<FaSpotify size={30} />}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            {topArtists.length < artistsTotal && (
              <Box textAlign="center">
                <Button
                  size="lg"
                  onClick={getMoreArtists}
                  variant="outline"
                  colorScheme="green"
                >
                  View more
                </Button>
              </Box>
            )}
          </Route>
          <Route exact path="/tracks">
            <BannerHeading
              bgURL={topTracks[0]?.album?.images[0]?.url}
              heading="Your Top Tracks"
            />
            <TimeRangeSelect
              setTimeRange={setTimeRange}
              timeRange={timeRange}
            />
            <Box p="1rem">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Artist</Th>
                    <Th textAlign="center">Open in spotify</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {topArtists.map((artistObj, idx) => (
                    <Tr
                      key={artistObj.id}
                      _hover={{
                        background: "white",
                      }}
                    >
                      <Td fontSize="xl">{idx + 1}</Td>
                      <Td>
                        <Flex align="center">
                          <Image
                            boxSize="90px"
                            borderRadius="md"
                            src={artistObj.images[0].url}
                          />
                          <Box>
                            <Heading
                              as="h4"
                              size="sm"
                              fontWeight="semibold"
                              mx="1rem"
                              my="0.7rem"
                            >
                              {artistObj.name}
                            </Heading>
                            <Box ml="0.9rem">
                              {artistObj.genres
                                .map((genreString) => {
                                  return capitalizeWords(genreString);
                                })
                                .map((genre, idx) => (
                                  <Tag
                                    key={idx}
                                    mr="0.7rem"
                                    my="0.3rem"
                                    variant="outline"
                                  >
                                    {genre}
                                  </Tag>
                                ))}
                            </Box>
                          </Box>
                        </Flex>
                      </Td>
                      <Td textAlign="center">
                        <IconButton
                          aria-label="Search database"
                          color="#1DB954"
                          variant="outline"
                          size="lg"
                          as={Link}
                          href={artistObj.external_urls.spotify}
                          icon={<FaSpotify size={30} />}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <Button onClick={getMoreTracks}>View more</Button>
          </Route>
        </Switch>
      </Box>
    </Flex>
  );
};

export default Dashboard;

{
  /* <OrderedList listStyleType="none" m={0}>
  {topTracks.map((trackObj, idx) => (
    <ListItem
      key={trackObj.id}
      border="1px"
      borderColor="gray.100"
      display="flex"
    >
      <Text>{idx + 1}</Text>
      <Text>{trackObj.name}</Text>
      <Text>
        {trackObj.artists[0].name}#{trackObj.album.name}
      </Text>
      <Image boxSize="150px" src={trackObj.album.images[0].url} />
      <Link href={trackObj.external_urls.spotify}>Open in Spotify</Link>
      <Text>{trackObj.popularity}</Text>
    </ListItem>
  ))}
</OrderedList>; */
}
