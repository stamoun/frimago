import { createListCollection, HStack, Select, SelectValueText, type SelectValueChangeDetails } from '@chakra-ui/react';
import { ChevronDown } from 'lucide-react';
import { useBuildingsStore } from '../store/buildingStore';
import { useCallback, useMemo } from 'react';
import type { Rooms } from '../types/rooms';
import { useRoomsStore } from '../store/roomsStore';
import { groupBy } from 'es-toolkit';

const RoomTypes = {
  OPEN_OFFICES: 'Bureaux à aire ouverte',
  CLOSED_OFFICES: 'Bureaux fermés',
  MEETING_ROOMS: 'Salles de réunion',
  OTHER: 'Autre',
};

type RoomType = (typeof RoomTypes)[keyof typeof RoomTypes];

const ORDERED_ROOM_TYPES: RoomType[] = [
  RoomTypes.MEETING_ROOMS,
  RoomTypes.OPEN_OFFICES,
  RoomTypes.CLOSED_OFFICES,
  RoomTypes.OTHER,
];

const ROOM_EXCLUSIONS = RegExp(/( - 1401)/);

interface RoomOption {
  label: string;
  value: string;
  type: RoomType;
}

function sortRooms(a: RoomOption, b: RoomOption): number {
  const typeIndexA = ORDERED_ROOM_TYPES.indexOf(a.type);
  const typeIndexB = ORDERED_ROOM_TYPES.indexOf(b.type);
  if (typeIndexA !== typeIndexB) {
    return typeIndexA - typeIndexB;
  }

  return a.label.localeCompare(b.label, undefined, { numeric: true });
}

function getType(item: { type: string }): RoomType {
  switch (item.type[0].toLowerCase()) {
    case 'b':
      return item.type.match(/ouv/i) ? RoomTypes.OPEN_OFFICES : RoomTypes.CLOSED_OFFICES;
    case 's':
      return RoomTypes.MEETING_ROOMS;
    default:
      return RoomTypes.OTHER;
  }
}

function filterRooms(roomsData: Rooms): RoomOption[] {
  return roomsData
    .filter((room) => !room.name.match(ROOM_EXCLUSIONS))
    .map((room) => ({
      label: room.name,
      value: room.id,
      type: getType(room),
    }))
    .sort(sortRooms);
}

interface RoomPickerProps {
  office?: string;
}

const RoomPicker: React.FC<RoomPickerProps> = ({ office }: RoomPickerProps) => {
  const allBuildings = useBuildingsStore((state) => state.buildings);
  const allRooms = useRoomsStore((state) => state.rooms);

  const availableRooms = useMemo(() => {
    const roomsData = allBuildings.reduce((acc, building) => {
      if (office && building.locality.toLowerCase() === office.toLowerCase()) {
        const buildingRooms = allRooms.filter((room) => room.buildingId === building.id);
        return [...acc, ...buildingRooms];
      }
      return acc;
    }, [] as Rooms);
    return createListCollection({
      items: filterRooms(roomsData).sort(sortRooms),
    });
  }, [allBuildings, allRooms, office]);

  const groupedRooms = useMemo(() => Object.entries(groupBy(availableRooms.items, getType)), [availableRooms.items]);

  const handleRoomChanged = useCallback((details: SelectValueChangeDetails) => {
    console.log('Selected room:', details.value);
  }, []);

  return office ? (
    <HStack>
      <h2>Choisissez un bureau</h2>
      <Select.Root collection={availableRooms} value={office ? [office] : []} onValueChange={handleRoomChanged}>
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <SelectValueText />
            <ChevronDown style={{ marginLeft: 8 }} />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {groupedRooms.map(([type, roomItems]) => (
              <Select.ItemGroup key={type}>
                <Select.ItemGroupLabel>{type}</Select.ItemGroupLabel>
                {roomItems.map((roomItem) => (
                  <Select.Item item={roomItem} key={roomItem.value}>
                    {roomItem.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </HStack>
  ) : (
    <div>asdf </div>
  );
};

export { RoomPicker };
