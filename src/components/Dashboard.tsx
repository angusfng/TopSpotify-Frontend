import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  Image,
  Link,
  Select,
} from "@chakra-ui/react";
import useAuth from "../helpers/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Header from "./Header";
import { useHistory } from "react-router-dom";

type TimeRangeType = "medium_term" | "long_term" | "short_term" | undefined;

interface DashboardProps {
  authCode?: string;
}

// Fix the view more button
// Time range change

const Dashboard = (props: DashboardProps) => {
  const [topArtists, setTopArtists] = useState<SpotifyApi.ArtistObjectFull[]>(
    []
  );
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [timeRange, setTimeRange] = useState<TimeRangeType>("medium_term");

  const history = useHistory();
  const accessToken = useAuth(props.authCode);

  useEffect(() => {
    history.push("/");
    const spotifyAPI = new SpotifyWebApi({
      accessToken: accessToken,
    });
    spotifyAPI
      .getMyTopArtists({
        limit: limit,
        offset: offset * limit,
        time_range: timeRange,
      })
      .then((data) => {
        // console.log(data.body.items);
        setTopArtists((topArtists) => [...topArtists, ...data.body.items]);
      })
      .catch((err) => {
        console.error(err);
      });
    spotifyAPI
      .getMyTopTracks({ limit: limit, offset: offset * limit })
      .then((data) => {
        console.log(data.body.items);
        setTopTracks((topTracks) => [...topTracks, ...data.body.items]);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, offset]);

  const getMoreArtists = () => {
    setOffset((offset) => offset + 1);
  };

  const getMoreTracks = () => {
    setOffset((offset) => offset + 1);
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
    <Flex minH="100vh" flex={1} flexDirection="column">
      <Header />
      <Tabs isFitted>
        <TabList mb="1em">
          <Tab>Your Top Artists</Tab>
          <Tab>Your Top Tracks</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Select
              onChange={(e) => {
                setTimeRange(e.target.value as TimeRangeType);
              }}
            >
              <option value="short_term">in the past 4 weeks</option>
              <option value="medium_term">in the past 6 weeks</option>
              <option value="long_term">of all time</option>
            </Select>
            {topArtists.map((artistObj, idx) => (
              <Box
                key={artistObj.id}
                boxShadow="md"
                border="1px"
                borderColor="gray.100"
                mb="1rem"
              >
                <Text>{idx + 1}</Text>
                <Text>{artistObj.name}</Text>
                <Text>
                  {artistObj.popularity}#{artistObj.followers.total}
                </Text>
                <Text>
                  {artistObj.genres
                    .map((genreString) => {
                      return capitalizeWords(genreString);
                    })
                    .map((genre, idx) => (
                      <Tag mr="0.5rem" key={idx}>
                        {genre}
                      </Tag>
                    ))}
                </Text>
                <Image boxSize="150px" src={artistObj.images[0].url} />
                <Link href={artistObj.external_urls.spotify}>
                  Open in Spotify
                </Link>
              </Box>
            ))}
            <Button onClick={getMoreArtists}>View more</Button>
          </TabPanel>
          <TabPanel>
            {topTracks.map((trackObj) => (
              <Box key={trackObj.id}>
                <Text>{trackObj.name}</Text>
                <Text>
                  {trackObj.artists[0].name}#{trackObj.album.name}
                </Text>
                <Image boxSize="150px" src={trackObj.album.images[0].url} />
                <Link href={trackObj.external_urls.spotify}>
                  Open in Spotify
                </Link>
                <Text>{trackObj.popularity}</Text>
              </Box>
            ))}
            <Button onClick={getMoreTracks}>View more</Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Dashboard;
