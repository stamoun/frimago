import {
  HStack,
  Select,
  SelectValueText,
  VStack,
  createListCollection,
  type SelectValueChangeDetails,
} from '@chakra-ui/react';
import { ChevronDown, Factory } from 'lucide-react';
import { useOfficeStore } from '../store/officeStore';
import { useBuildingsStore } from '../store/buildingStore';
import { useCallback, useMemo } from 'react';
import type { Buildings } from '../types/buildings';

const OfficePicker = () => {
  const office = useOfficeStore((state) => state.office);
  const setOffice = useOfficeStore((state) => state.setOffice);
  const buildings = useBuildingsStore((state) => state.buildings);

  const handleOfficeChanged = useCallback(
    (details: SelectValueChangeDetails) => {
      if (details.value.length !== 0) {
        setOffice(details.value[0]);
      } else {
        setOffice(null);
      }
    },
    [setOffice],
  );

  const offices = useMemo(() => {
    const uniqueBuildings = buildings.reduce((acc, building) => {
      if (!acc.some((item) => item.locality.toLowerCase() === building.locality.toLowerCase())) {
        acc.push({
          id: building.id,
          name: building.name,
          locality: building.locality,
        });
      }
      return acc;
    }, [] as Buildings);
    return createListCollection({
      items: uniqueBuildings.map((building) => ({
        label: building.locality,
        value: building.locality,
      })),
    });
  }, [buildings]);

  return (
    <VStack>
      Choisissez un lieu
      <HStack>
        <Factory />
        <Select.Root collection={offices} value={office ? [office] : []} onValueChange={handleOfficeChanged}>
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <SelectValueText />
              <ChevronDown style={{ marginLeft: 8 }} />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {offices.items.map((officeItem) => (
                <Select.Item item={officeItem} key={officeItem.value}>
                  {officeItem.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </HStack>
    </VStack>
  );
};

export { OfficePicker };
