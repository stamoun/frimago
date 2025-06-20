import { HStack, Select, SelectValueText, createListCollection, type SelectValueChangeDetails } from '@chakra-ui/react';
import { ChevronDown, Factory } from 'lucide-react';
import { useEffect } from 'react';
import { getBuildings } from '../api/googleApi';
import { useOfficeStore } from '../store/officeStore';

const OfficePicker = () => {
  const office = useOfficeStore((state) => state.office);
  const setOffice = useOfficeStore((state) => state.setOffice);

  const handleOfficeChanged = (details: SelectValueChangeDetails) => {
    if (details.value.length !== 0) {
      setOffice(details.value[0]);
    }
  };

  useEffect(() => {
    const fetchBuildings = async () => {
      if (office) {
        const buildings = await getBuildings();
        console.log(buildings);
      }
    };

    fetchBuildings();
  }, [office]);

  return (
    <HStack>
      <Factory />
      <Select.Root collection={items} maxWidth={200} value={office ? [office] : []} onValueChange={handleOfficeChanged}>
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <SelectValueText placeholder="Choisissez un bureau" />
            <ChevronDown style={{ marginLeft: 8 }} />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {items.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </HStack>
  );
};

const items = createListCollection({
  items: [
    { label: 'Montréal', value: 'mtl', image: '/assets/mtl-logo.png' },
    { label: 'Québec', value: 'qc', image: '/assets/qc-logo.png' },
  ],
});

export { OfficePicker };
