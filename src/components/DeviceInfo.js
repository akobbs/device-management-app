import { TIME_SLOT_SIZE } from "../constants";

const styles = {
  container: {
    flexBasis: 200,
    flexGrow: 0,
    flexShrink: 0,
    height: TIME_SLOT_SIZE,
    border: "1px solid grey",
    borderWidth: "0px 1px 1px 1px",
    padding: 12,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: "darkgray",
    marginTop: 8,
  },
};

export function DeviceInfo({ title, id }) {
  return (
    <div style={styles.container}>
      <div style={styles.title}>{title}</div>
      <div style={styles.description}>{id}</div>
    </div>
  );
}
