import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../store/authStore';
import { OfficePicker } from './OfficePicker';
import { RoomPicker } from './RoomPicker';
import { getBuildings, getRooms } from '../api/googleApi';
import { useBuildingsStore } from '../store/buildingStore';
import { useRoomsStore } from '../store/roomsStore';
import { Tabs } from '@chakra-ui/react';

import { Calendar, LampDesk } from 'lucide-react';
import { RoomDatePicker } from './RoomDatePicker';
import { useOfficeStore } from '../store/officeStore';

const BodyDiv = styled.div`
  width: 100%;
  flex: 1 1 auto;
  overflow: auto;
`;

const Body: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const setBuildings = useBuildingsStore((state) => state.setBuildings);
  const setRooms = useRoomsStore((state) => state.setRooms);
  const office = useOfficeStore((state) => state.office);

  useEffect(() => {
    const retrieveBuildingData = async () => {
      if (!token) {
        return;
      }

      try {
        // TODO Loading spinner when fetching Google data
        const buildings = await getBuildings();
        setBuildings(buildings);

        const rooms = await getRooms();
        setRooms(rooms);
      } catch (error) {
        console.error('Error retrieving building data:', error);
      }
    };
    retrieveBuildingData();
  }, [setBuildings, setRooms, token]);

  return (
    <BodyDiv>
      {token && (
        <>
          <OfficePicker />
          {office && (
            <Tabs.Root defaultValue="rooms">
              <Tabs.List>
                <Tabs.Trigger value="rooms">
                  <LampDesk />
                  Bureau
                </Tabs.Trigger>
                <Tabs.Trigger value="dates">
                  <Calendar />
                  Date
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="rooms">
                <RoomPicker office={office} />
              </Tabs.Content>
              <Tabs.Content value="dates">
                <RoomDatePicker />
              </Tabs.Content>
            </Tabs.Root>
          )}
        </>
      )}
    </BodyDiv>
  );
};

export { Body };
