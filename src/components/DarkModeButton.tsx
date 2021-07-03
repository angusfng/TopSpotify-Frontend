import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";

const DarkModeButton = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <IconButton
      boxSize="60px"
      aria-label="Search database"
      icon={<FaMoon size={25} />}
      onClick={toggleColorMode}
    />
  );
};

export default DarkModeButton;
