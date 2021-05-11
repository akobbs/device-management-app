import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};

export function DateSelector({ onPrev, onNext, isPrevDisabled, dateLabel }) {
  return (
    <div style={styles.container}>
      <IconButton
        aria-label="previous"
        onClick={onPrev}
        disabled={isPrevDisabled}
      >
        <ChevronLeftIcon />
      </IconButton>
      <div>{dateLabel}</div>
      <IconButton aria-label="next" onClick={onNext}>
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
}
