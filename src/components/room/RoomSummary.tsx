import { Table, Text } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { getRoomEvents } from '../../api/googleApi';
import dayjs from 'dayjs';
import type { RoomEvent } from '../../types/rooms';

interface RoomSummaryProps {
  roomId: string;
  start: string | null;
  end: string | null;
}

const RoomSummary: React.FC<RoomSummaryProps> = ({ roomId, start, end }) => {
  const [roomEvents, setRoomEvents] = useState<RoomEvent[]>([]);

  useEffect(() => {
    const retrieveRoomEvents = async () => {
      try {
        if (!start || !end) {
          return [];
        }
        const startDate = dayjs(start);
        const endDate = dayjs(end);
        const events = await getRoomEvents(roomId, startDate.toDate(), endDate.toDate());
        setRoomEvents(events);
      } catch (error) {
        console.error('Error retrieving room events:', error);
      }
    };
    retrieveRoomEvents();
  }, [end, roomId, start, setRoomEvents]);

  const sortedEvents = useMemo(() => roomEvents.sort((a, b) => a.start.diff(b.start)), [roomEvents]);

  return sortedEvents.length ? (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Propriétaire</Table.Th>
          <Table.Th>Début</Table.Th>
          <Table.Th>Fin</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {sortedEvents.map((event) => (
          <Table.Tr key={event.id}>
            <Table.Td align="left">{event.owner}</Table.Td>
            <Table.Td align="left">{event.start.format('YYYY-MM-DD HH:mm')}</Table.Td>
            <Table.Td align="left">{event.end.format('YYYY-MM-DD HH:mm')}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  ) : (
    <Text>Aucune réservation pour ces dates.</Text>
  );
};

export { RoomSummary };
