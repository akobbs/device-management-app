const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
  },
};

export function ReservationsPageContent({ children }) {
  return <div style={styles.container}>{children}</div>;
}
