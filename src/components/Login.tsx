import { Button, Link } from "@chakra-ui/react";

const Login = () => {
  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=4bed51c856c54870906b1fd174911b53&response_type=code&redirect_uri=http://localhost:3000&scope=user-top-read";

  return (
    <Button as={Link} href={AUTH_URL} colorScheme="green">
      Login To Spotify
    </Button>
  );
};

export default Login;
