import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { OfficePicker } from './OfficePicker';
import { getBuildings, getRooms } from '../api/googleApi';
import { useBuildingsStore } from '../store/buildingStore';
import { useRoomsStore } from '../store/roomsStore';
import { useOfficeStore } from '../store/officeStore';
import { Tabs } from '@mantine/core';
import { LampDesk, Calendar } from 'lucide-react';
import { RoomDatePicker } from './room/RoomDatePicker';
import { RoomPicker } from './room/RoomPicker';

const Body: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const office = useOfficeStore((state) => state.office);
  const setBuildings = useBuildingsStore((state) => state.setBuildings);
  const setRooms = useRoomsStore((state) => state.setRooms);

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
  }, [setBuildings, token]);

  return (
    <div>
      {token && (
        <>
          <OfficePicker />
          {office && (
            <Tabs defaultValue="rooms">
              <Tabs.List>
                <Tabs.Tab value="rooms">
                  <LampDesk />
                  Bureau
                </Tabs.Tab>
                <Tabs.Tab value="dates">
                  <Calendar />
                  Date
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="rooms">
                <RoomPicker office={office} />
              </Tabs.Panel>
              <Tabs.Panel value="dates">
                <RoomDatePicker />
              </Tabs.Panel>
            </Tabs>
          )}
        </>
      )}
    </div>
  );
};

export { Body };
