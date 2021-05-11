const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
};

export function ReservationsPageHeader({ children }) {
  return <div style={styles.container}>{children}</div>;
}
