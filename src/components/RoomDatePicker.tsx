import { Group } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { Calendar } from 'lucide-react';
import { useState } from 'react';

const RoomDatePicker: React.FC = () => {
  const [pickedDate, setPickedDate] = useState<string | null>(null);

  return (
    <Group>
      <DatePickerInput
        leftSection={<Calendar size={18} />}
        label="Choisissez une date"
        placeholder="Choisissez une date"
        value={pickedDate}
        onChange={setPickedDate}
      />
    </Group>
  );
};

export { RoomDatePicker };
