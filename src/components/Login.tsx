import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Heading,
} from "@chakra-ui/react";

const Login = () => {
  const scopes = encodeURI("user-top-read user-read-email user-read-private");
  const redirectURI = "https://topspotify.netlify.app";
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=4bed51c856c54870906b1fd174911b53&response_type=code&redirect_uri=${redirectURI}&scope=${scopes}&show_dialog=false`;
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered
        size="md"
      >
        <ModalOverlay />
        <ModalContent textAlign="center" minH="30%" m="1rem">
          <ModalHeader>
            <Heading>Top Spotify</Heading>
          </ModalHeader>
          <ModalBody display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="lg">
              Login to see your top Spotify tracks and artists!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button as={Link} href={AUTH_URL} colorScheme="green" w="100%">
              Login To Spotify
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
