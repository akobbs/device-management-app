export const HTC_DEVICE_ID = "HTS19WM00429";
export const MOTOROLA_DEVICE_ID = "TA980AQPQ";
export const IPHONE_DEVICE_ID = "AS123VDF1";

const HOUR_LIST = [];
for (let i = 0; i < 25; i++) {
  HOUR_LIST.push(`${("0" + i).slice(-2)}:00`);
}

export { HOUR_LIST };

export const ReservationType = {
  ME: "me",
  OTHERS: "others",
};

export const RESERVATION_COLOR = {
  [ReservationType.ME]: "purple",
  [ReservationType.OTHERS]: "blue",
};

export const RESERVATION_TITLE = {
  [ReservationType.ME]: "Reserved By Me",
  [ReservationType.OTHERS]: "Reserved By Others",
};

export const TIMESLOT_SIZE = 100;
