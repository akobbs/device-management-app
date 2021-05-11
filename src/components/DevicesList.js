// Material UI
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import { useDevices } from "../contexts/DevicesContext";

const useDeviceListStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function DeviceList({ checkedIds, onDeviceCheck }) {
  const classes = useDeviceListStyles();
  const devices = useDevices();

  function getIsChecked(deviceId) {
    return checkedIds.some((id) => id === deviceId);
  }

  return (
    <List className={classes.root}>
      {devices.map(({ title, id }) => {
        const labelId = `checkbox-list-label-${id}`;

        return (
          <ListItem
            key={id}
            role={undefined}
            dense
            button
            onClick={() => onDeviceCheck(id)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={getIsChecked(id)}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${title} | ${id}`} />
          </ListItem>
        );
      })}
    </List>
  );
}
