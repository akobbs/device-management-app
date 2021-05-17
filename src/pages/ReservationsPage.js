import React, { useState, useMemo, useRef } from "react";
import moment from "moment";

// Material UI
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

import { useDevices } from "../contexts/DevicesContext";
import {
  useReservations,
  addReservations,
} from "../contexts/ReservationsContext";
import { DeviceInfo } from "../components/DeviceInfo";
import { Timeline } from "../components/Timeline";
import { HOUR_LIST, ReservationType, TIME_SLOT_SIZE } from "../constants";
import { DateSelector } from "../components/DateSelector";
import { CreateReservationDialog } from "../dialogs/CreateReservationDialog";
import { ReservationsPageFooter } from "./ReservationsPageFooter";
import { ReservationsPageHeader } from "./ReservationsPageHeader";
import { ReservationsPageContent } from "./ReservationsPageContent";

const HEADER_HEIGHT = 36;
const HEADER_ITEM_WIDTH = 50;

const styles = {
  root: {
    backgroundColor: "lightgrey",
    padding: 24,
  },
  devices: {
    display: "flex",
    flexDirection: "column",
  },
  devicesHeader: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    border: "1px solid grey",
  },
  timelineForDevices: {
    display: "flex",
    flexDirection: "column",
  },
  timelineHeader: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: TIME_SLOT_SIZE - HEADER_ITEM_WIDTH / 2,
    height: HEADER_HEIGHT,
    alignItems: "center",
  },
  timelineHeaderItem: {
    flexBasis: TIME_SLOT_SIZE,
    flexGrow: 0,
    flexShrink: 0,
  },
  timelineHeaderItemText: {
    width: HEADER_ITEM_WIDTH,
    textAlign: "center",
  },
  timelines: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    flex: 1,
  },
};

function Timelines({ currentReservations, devices }) {
  function renderTimelineForDevices() {
    return (
      <div style={styles.timelineForDevices}>
        {devices.map((device) => (
          <Timeline
            key={device.id}
            device={device}
            reservations={currentReservations[device.id] || []}
          />
        ))}
      </div>
    );
  }

  function renderTimelineHeader() {
    return (
      <div style={styles.timelineHeader}>
        {HOUR_LIST.map((date) => (
          <div style={styles.timelineHeaderItem} key={date}>
            <div style={styles.timelineHeaderItemText}>{date}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={styles.timelines}>
      {renderTimelineHeader()}
      {renderTimelineForDevices()}
    </div>
  );
}

function Devices({ devices }) {
  return (
    <div style={styles.devices}>
      <div style={styles.devicesHeader}>Device / Time</div>
      {devices.map((device) => (
        <div key={device.id}>
          <DeviceInfo {...device} />
        </div>
      ))}
    </div>
  );
}

export function ReservationsPage() {
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const todayRef = useRef(null);

  if (!todayRef.current) {
    todayRef.current = moment().startOf("day");
  }

  const [currentDate, setCurrentDate] = useState(() => {
    return todayRef.current;
  });

  const dateLabel = useMemo(() => {
    return currentDate.format("LL");
  }, [currentDate]);

  const currentTimestamp = useMemo(() => {
    return moment(currentDate).unix();
  }, [currentDate]);

  const [reservations, dispatch] = useReservations();
  const currentReservations = reservations[currentTimestamp] || {};

  const isPrevDisabled = todayRef.current.isSameOrAfter(currentDate, "day");
  const devices = useDevices();

  const onNext = () => {
    setCurrentDate(moment(currentDate).add(1, "days"));
  };

  const onPrev = () => {
    setCurrentDate(moment(currentDate).subtract(1, "days"));
  };

  function onClose() {
    setCreateDialogOpen(false);
  }

  function getIsTimeSlotAvailable() {
    // TODO: Validate that this specific time slot is available
    return true;
  }

  function onCreate({ fromDate, toDate, checkedIds }) {
    const fromTimestamp = moment(currentDate)
      .set({
        hour: fromDate.hoursValue,
        minute: fromDate.minutesValue,
      })
      .unix();

    const toTimestamp = moment(currentDate)
      .set({
        hour: toDate.hoursValue,
        minute: toDate.minutesValue,
      })
      .unix();

    const isTimeSlotAvailable = getIsTimeSlotAvailable();
    if (isTimeSlotAvailable) {
      // TODO: Add ability to add time slot for multiple devices at the same time
      addReservations(dispatch, {
        from: fromTimestamp,
        to: toTimestamp,
        type: ReservationType.ME,
        current: currentDate.unix(),
        deviceId: checkedIds[0],
      });

      onClose();
    }
  }

  return (
    <div style={styles.root}>
      <ReservationsPageHeader>
        <DateSelector
          onPrev={onPrev}
          onNext={onNext}
          isPrevDisabled={isPrevDisabled}
          dateLabel={dateLabel}
        />
        <Button
          onClick={() => setCreateDialogOpen(true)}
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
        >
          Add Reservation
        </Button>
      </ReservationsPageHeader>

      <ReservationsPageContent>
        <Devices devices={devices} />
        <Timelines
          currentReservations={currentReservations}
          devices={devices}
        />
      </ReservationsPageContent>

      <ReservationsPageFooter />

      <CreateReservationDialog
        open={isCreateDialogOpen}
        onClose={onClose}
        onCreate={onCreate}
      />
    </div>
  );
}
