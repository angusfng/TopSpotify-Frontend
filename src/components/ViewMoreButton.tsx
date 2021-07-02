import { Button } from "@chakra-ui/react";
import React from "react";

interface ViewMoreButtonProps {
  viewMore: () => void;
}

const ViewMoreButton = ({ viewMore }: ViewMoreButtonProps) => {
  return (
    <Button size="lg" onClick={viewMore} variant="outline" colorScheme="green">
      View more
    </Button>
  );
};

export default ViewMoreButton;
