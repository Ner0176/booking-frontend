import Calendar from "react-calendar";
import { styled } from "styled-components";
import tw from "twin.macro";

export const LabelContainer = styled.div(
  tw`flex items-center justify-center h-full w-full cursor-pointer bg-white`
);
export const StyledCalendar = styled(Calendar)`
  ${tw`bg-white border !border-neutral-200 rounded-lg p-4 shadow-lg`}

  .react-calendar__tile {
    border-radius: 8px;
    &:hover {
      background-color: #7c3aedff !important;
    }
  }

  .react-calendar__tile--now {
    color: black !important;
    background-color: white !important;
    border: 1px solid #7c3aedff !important;
  }

  .react-calendar__tile--active {
    color: white !important;
    background-color: #7c3aedff !important;
  }
`;
