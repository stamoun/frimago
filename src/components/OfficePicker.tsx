import { useCallback, useMemo } from 'react';
import { useBuildingsStore } from '../store/buildingStore';
import { useOfficeStore } from '../store/officeStore';
import type { Buildings } from '../types/buildings';
import { Group, Select, Stack } from '@mantine/core';
import { Factory } from 'lucide-react';

const OfficePicker = () => {
  const setOffice = useOfficeStore((state) => state.setOffice);
  const buildings = useBuildingsStore((state) => state.buildings);

  const handleOfficeChanged = useCallback(
    (selectedOffice: string | null) => {
      setOffice(selectedOffice);
    },
    [setOffice],
  );

  const offices = useMemo(() => {
    return buildings
      .reduce((acc, building) => {
        if (!acc.some((item) => item.locality.toLowerCase() === building.locality.toLowerCase())) {
          acc.push({
            id: building.id,
            name: building.name,
            locality: building.locality,
          });
        }
        return acc;
      }, [] as Buildings)
      .map((item) => ({ value: item.locality, label: item.locality }));
  }, [buildings]);

  return (
    <Stack>
      <Group>
        <Factory />
        <Select label="" placeholder="Choisissez un lieu" data={offices} onChange={handleOfficeChanged} />
      </Group>
    </Stack>
  );
};

export { OfficePicker };
