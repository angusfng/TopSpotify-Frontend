import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Tag,
  Image,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";
import useAuth from "../helpers/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Header from "./Header";
import { Route, Switch, useHistory } from "react-router-dom";
import { TimeRangeType } from "../types";
import TimeRangeSelect from "./TimeRangeSelect";
import BannerHeading from "./BannerHeading";
import SpotifyButton from "./SpotifyButton";
import ViewMoreButton from "./ViewMoreButton";

interface DashboardProps {
  authCode?: string;
}

// If token expires while on page, need alert to tell you expired
// Component the table
// Organize the files
// Remove console logs

const Dashboard = ({ authCode }: DashboardProps) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [topArtists, setTopArtists] = useState<SpotifyApi.ArtistObjectFull[]>(
    []
  );
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRangeType>("medium_term");
  const [artistsTotal, setArtistsTotal] = useState(0);
  const [tracksTotal, setTracksTotal] = useState(0);
  const limit = 10;

  const history = useHistory();
  const accessToken = useAuth(authCode);

  useEffect(() => {
    if (accessToken) {
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
          console.log(data.body.items);
          setTracksTotal(data.body.total);
          setTopTracks(data.body.items);
        })
        .catch((err) => {
          console.error(err);
        });
      if (authCode) {
        history.push("/artists");
      }
    }
  }, [accessToken, authCode, history, timeRange]);

  const getMoreArtists = () => {
    if (accessToken) {
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
    }
  };

  const getMoreTracks = () => {
    if (accessToken) {
      const spotifyAPI = new SpotifyWebApi({
        accessToken: accessToken,
      });
      spotifyAPI
        .getMyTopTracks({
          limit: limit,
          offset: topTracks.length,
          time_range: timeRange,
        })
        .then((data) => {
          setTopTracks((topTracks) => [...topTracks, ...data.body.items]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
    <Flex
      minH="100vh"
      flex={1}
      flexDirection={isLargerThan1280 ? "row" : "column"}
    >
      <Header />
      <Box flex={1} pl={isLargerThan1280 ? "18rem" : 0} pb="1rem" bg="#fafafa">
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
                    {isLargerThan600 && (
                      <Th textAlign="center">Open in spotify</Th>
                    )}
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
                      <Td w="79%">
                        <Flex align="center">
                          <Image
                            boxSize="90px"
                            minW="90px"
                            borderRadius="md"
                            src={artistObj.images[0].url}
                          />
                          <Box mx="1rem">
                            <Heading
                              as="h4"
                              size="sm"
                              fontWeight="semibold"
                              mb="0.5rem"
                            >
                              {artistObj.name}
                            </Heading>
                            <Box>
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
                      {isLargerThan600 && (
                        <Td textAlign="center">
                          <SpotifyButton
                            href={artistObj.external_urls.spotify}
                          />
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            {topArtists.length < artistsTotal && (
              <Box textAlign="center">
                <ViewMoreButton
                  viewMore={() => {
                    getMoreArtists();
                  }}
                />
              </Box>
            )}
          </Route>
          <Route exact path="/tracks">
            <BannerHeading
              bgURL={topTracks[0]?.album.images[0]?.url}
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
                    <Th>Track</Th>
                    {isLargerThan600 && (
                      <Th textAlign="center">Open in spotify</Th>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {topTracks.map((trackObj, idx) => (
                    <Tr
                      key={trackObj.id}
                      _hover={{
                        background: "white",
                      }}
                      w="10rem"
                    >
                      <Td fontSize="xl">{idx + 1}</Td>
                      <Td w="79%">
                        <Flex align="center">
                          <Image
                            boxSize="90px"
                            minW="90px"
                            borderRadius="md"
                            src={trackObj.album.images[0].url}
                          />
                          <Box mx="1rem">
                            <Heading
                              as="h4"
                              size="sm"
                              fontWeight="semibold"
                              mb="0.5rem"
                            >
                              {trackObj.name}
                            </Heading>
                            <Heading
                              as="h4"
                              size="sm"
                              fontWeight="normal"
                              color="gray.700"
                            >
                              {trackObj.album.artists[0].name}
                            </Heading>
                          </Box>
                        </Flex>
                      </Td>
                      {isLargerThan600 && (
                        <Td textAlign="center">
                          <SpotifyButton
                            href={trackObj.external_urls.spotify}
                          />
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            {topTracks.length < tracksTotal && (
              <Box textAlign="center">
                <ViewMoreButton
                  viewMore={() => {
                    getMoreTracks();
                  }}
                />
              </Box>
            )}
          </Route>
        </Switch>
      </Box>
    </Flex>
  );
};

export default Dashboard;
