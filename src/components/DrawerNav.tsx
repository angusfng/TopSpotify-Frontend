import { useRef } from "react";
import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
  LinkBox,
  LinkOverlay,
  ListItem,
  UnorderedList,
  Heading,
  DrawerFooter,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import DarkModeButton from "./DarkModeButton";

function DrawerNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        ref={btnRef}
        variant="ghost"
        onClick={onOpen}
        aria-label="Open drawer"
        icon={<GiHamburgerMenu size={25} />}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading>Top Spotify</Heading>
          </DrawerHeader>
          <DrawerBody>
            <UnorderedList listStyleType="none" ml={0} fontSize="1.4em">
              <LinkBox
                onClick={() => {
                  onClose();
                }}
                py="1rem"
                color={location.pathname === "/artists" ? "#1DB954" : ""}
              >
                <ListItem>
                  <LinkOverlay as={RouterLink} to="/artists">
                    Top Artists
                  </LinkOverlay>
                </ListItem>
              </LinkBox>
              <LinkBox
                onClick={() => {
                  onClose();
                }}
                py="1rem"
                color={location.pathname === "/tracks" ? "#1DB954" : ""}
              >
                <ListItem>
                  <LinkOverlay as={RouterLink} to="/tracks">
                    Top Tracks
                  </LinkOverlay>
                </ListItem>
              </LinkBox>
            </UnorderedList>
          </DrawerBody>
          <DrawerFooter justifyContent="flex-start">
            <DarkModeButton />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerNav;
