import { Select } from "@chakra-ui/react";
import { TimeRangeType } from "../helpers/types";

interface TimeRangeSelectProps {
  setTimeRange: (value: React.SetStateAction<TimeRangeType>) => void;
  timeRange: TimeRangeType;
}

const TimeRangeSelect = ({ setTimeRange, timeRange }: TimeRangeSelectProps) => {
  return (
    <Select
      w="20rem"
      onChange={(e) => {
        setTimeRange(e.target.value as TimeRangeType);
      }}
      value={timeRange}
      my="1rem"
      mx="2rem"
      borderColor="black"
    >
      <option value="short_term">in the past 4 weeks</option>
      <option value="medium_term">in the past 6 weeks</option>
      <option value="long_term">of all time</option>
    </Select>
  );
};

export default TimeRangeSelect;
