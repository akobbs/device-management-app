import React, { useState } from "react";

// Material UI
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { DeviceList } from "../components/DevicesList";
import { TimePicker } from "../components/TimePicker";

const styles = {
  timePickers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: {
    color: "red",
    padding: "12px 0px",
  },
};

function ErrorMessage({ message }) {
  return <div style={styles.error}>{message}</div>;
}

export function CreateReservationDialog({ open, onClose, onCreate }) {
  const [fromDate, setFromDate] = useState(() => {
    return {
      hoursValue: 0,
      minutesValue: 0,
    };
  });

  const [toDate, setToDate] = useState(() => {
    return {
      hoursValue: 0,
      minutesValue: 30,
    };
  });

  const [checkedIds, setCheckedIds] = useState([]);

  function getIsChecked(deviceId) {
    return checkedIds.some((id) => id === deviceId);
  }

  function getIsValidTimeslot() {
    if (fromDate.hoursValue > toDate.hoursValue) {
      return false;
    }

    if (fromDate.hoursValue === toDate.hoursValue) {
      return fromDate.minutesValue < toDate.minutesValue;
    }

    return true;
  }

  const isValidTimeslot = getIsValidTimeslot();
  const isMultipleDevicesChecked = checkedIds.length > 1;
  const isCreateButtonDisabled =
    checkedIds.length === 0 || !isValidTimeslot || isMultipleDevicesChecked;

  const onDeviceCheck = (deviceId) => {
    const isChecked = getIsChecked(deviceId);

    if (isChecked) {
      const newCheckedIds = checkedIds.filter((id) => id !== deviceId);
      setCheckedIds(newCheckedIds);
    } else {
      setCheckedIds([...checkedIds, deviceId]);
    }
  };

  const onCreateButtonClick = () => {
    onCreate({
      fromDate,
      toDate,
      checkedIds,
    });
  };

  return (
    <Dialog open={open}>
      <DialogTitle id="form-dialog-title">Create Reservation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select devices and suitable timeslot
        </DialogContentText>

        <DeviceList checkedIds={checkedIds} onDeviceCheck={onDeviceCheck} />

        {isMultipleDevicesChecked && (
          <ErrorMessage message="Please select only one device. Multiple selection will be added soon!" />
        )}

        <div style={styles.timePickers}>
          <TimePicker label="From" value={fromDate} onChange={setFromDate} />
          <TimePicker label="To" value={toDate} onChange={setToDate} />
        </div>

        {!isValidTimeslot && (
          <ErrorMessage message='"To Date" should be after "From Date"' />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Cancel
        </Button>
        <Button
          disabled={isCreateButtonDisabled}
          onClick={onCreateButtonClick}
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
