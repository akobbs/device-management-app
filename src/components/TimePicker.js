import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = {
  label: {
    textAlign: "center",
  },
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const hoursList = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
];

const minutesListFor24Hours = [0];
const minutesList = [0, 30];

export function TimePicker({ label, value, onChange }) {
  const classes = useStyles();
  const { minutesValue, hoursValue } = value;

  const minutesItems = hoursValue === 24 ? minutesListFor24Hours : minutesList;

  function handleHoursChange(e) {
    onChange({
      minutesValue,
      hoursValue: +e.target.value,
    });
  }

  function handleMinutesChange(e) {
    onChange({
      minutesValue: +e.target.value,
      hoursValue,
    });
  }

  return (
    <div>
      <div style={styles.label}>{label}</div>
      <FormControl className={classes.formControl}>
        <InputLabel>Hours</InputLabel>
        <Select
          defaultValue={hoursList[0]}
          value={hoursValue}
          onChange={handleHoursChange}
        >
          {hoursList.map((hours) => (
            <MenuItem key={hours} value={hours}>
              {hours}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Minutes</InputLabel>
        <Select value={minutesValue} onChange={handleMinutesChange}>
          {minutesItems.map((minutes) => (
            <MenuItem key={minutes} value={minutes}>
              {minutes}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
