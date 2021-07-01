import { Flex, Heading } from "@chakra-ui/react";

interface BannerHeadingProps {
  bgURL: string;
  heading: string;
}

const BannerHeading = ({ bgURL, heading }: BannerHeadingProps) => {
  return (
    <Flex
      h="14rem"
      w="100%"
      backgroundSize="cover"
      backgroundPosition="center 20%"
      bgImage={bgURL}
      align="flex-end"
      boxShadow="inset 0 0 150px black"
    >
      <Heading as="h1" m="2rem" color="white" size="4xl">
        {heading}
      </Heading>
    </Flex>
  );
};

export default BannerHeading;
