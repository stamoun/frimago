import { groupBy } from 'es-toolkit';
import { useMemo, useCallback, useEffect } from 'react';
import { useBuildingsStore } from '../store/buildingStore';
import { useRoomsStore } from '../store/roomsStore';
import type { Rooms } from '../types/rooms';
import { Group, Select } from '@mantine/core';

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
  office: string;
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
    return filterRooms(roomsData).sort(sortRooms);
  }, [allBuildings, allRooms, office]);

  const groupedRooms = useMemo(() => {
    const groups = Object.entries(groupBy(availableRooms, getType));
    return groups.map((group) => ({ group: group[0], items: group[1] }));
  }, [availableRooms]);

  useEffect(() => console.log(groupedRooms), [groupedRooms]);

  const handleRoomChanged = useCallback((selectedRoom: any) => {
    console.log('Selected room:', selectedRoom);
  }, []);

  return (
    <Group>
      <Select
        label="Bureau"
        placeholder="Choisissez un bureau"
        data={groupedRooms}
        onChange={handleRoomChanged}
        searchable
      />
    </Group>
  );
};

export { RoomPicker };
