import { HStack } from '@chakra-ui/react';

const RoomDatePicker: React.FC = () => {
  // const [pickedDate, setPickedDate] = useState(new Date());

  return (
    <HStack>
      <h2>Choisissez une date</h2>
      {/* <SingleDatepicker name="date-input" date={pickedDate} onDateChange={setPickedDate} /> */}
    </HStack>
  );
};

export { RoomDatePicker };
