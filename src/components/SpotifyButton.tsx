import { IconButton, Link } from "@chakra-ui/react";
import { FaSpotify } from "react-icons/fa";

interface SpotifyButtonProps {
  href: string;
}

const SpotifyButton = ({ href }: SpotifyButtonProps) => {
  return (
    <IconButton
      aria-label="Open in Spotify"
      color="#1DB954"
      variant="outline"
      size="lg"
      as={Link}
      href={href}
      icon={<FaSpotify size={30} />}
    />
  );
};

export default SpotifyButton;
