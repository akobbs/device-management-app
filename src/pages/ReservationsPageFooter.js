import {
  RESERVATION_COLOR,
  RESERVATION_TITLE,
  ReservationType,
} from "../constants";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 16,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16,
  },
  itemCircle: (backgroundColor) => ({
    height: 16,
    width: 16,
    backgroundColor,
    borderRadius: "50%",
    display: "inline-block",
  }),
  itemTitle: {
    marginLeft: 8,
  },
};

function FooterItem({ type }) {
  const backgroundColor = RESERVATION_COLOR[type];
  const title = RESERVATION_TITLE[type];

  return (
    <div style={styles.item}>
      <span style={styles.itemCircle(backgroundColor)} />
      <span style={styles.itemTitle}>{title}</span>
    </div>
  );
}

export function ReservationsPageFooter() {
  return (
    <div style={styles.container}>
      {Object.values(ReservationType).map((type) => (
        <FooterItem key={type} type={type} />
      ))}
    </div>
  );
}
