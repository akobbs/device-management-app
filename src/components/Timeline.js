import moment from "moment";
import { HOUR_LIST, RESERVATION_COLOR, TIMESLOT_SIZE } from "../constants";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  timeslot: {
    height: TIMESLOT_SIZE,
    flexBasis: TIMESLOT_SIZE,
    flexGrow: 0,
    flexShrink: 0,
    borderRight: "1px solid grey",
    borderBottom: "1px solid grey",
  },
};

const calculateX = (date) => {
  const hours = date.hour();
  const minutes = date.minute();

  return (hours + Math.floor(minutes / 30) * 0.5 + 1) * TIMESLOT_SIZE;
};

const getReservationStyle = ({ from, to, type }) => {
  const fromDate = moment.unix(from);
  const toDate = moment.unix(to);

  const startX = calculateX(fromDate);
  const endX = calculateX(toDate);

  const width = endX - startX;

  return {
    position: "absolute",
    background: RESERVATION_COLOR[type],
    opacity: 0.5,
    height: "100%",
    width,
    left: startX,
  };
};

export function Timeline({ device, reservations }) {
  return (
    <div style={styles.container}>
      {HOUR_LIST.map((date) => (
        <div key={date} style={styles.timeslot} />
      ))}

      {reservations.map((reservation, index) => {
        return <div key={index} style={getReservationStyle(reservation)} />;
      })}
    </div>
  );
}
