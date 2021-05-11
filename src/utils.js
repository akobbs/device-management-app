import moment from "moment";
import {
  HTC_DEVICE_ID,
  ReservationType,
  MOTOROLA_DEVICE_ID,
} from "./constants";

export const generateReservationsData = () => {
  const today = moment().startOf("day");
  const tomorrow = moment(today).add(1, "days");
  const dayAfterTomorrow = moment(tomorrow).add(1, "days");

  const todayTimestamp = today.unix();
  const tomorrowTimestamp = tomorrow.unix();
  const dayAfterTomorrowTimestamp = dayAfterTomorrow.unix();

  const reservations = {
    [todayTimestamp]: {
      [HTC_DEVICE_ID]: [
        {
          type: ReservationType.ME,
          from: moment(today).set({ hour: 1, minute: 0 }).unix(),
          to: moment(today).set({ hour: 2, minute: 30 }).unix(),
        },
        {
          type: ReservationType.ME,
          from: moment(today).set({ hour: 3, minute: 0 }).unix(),
          to: moment(today).set({ hour: 5, minute: 0 }).unix(),
        },
        {
          type: ReservationType.OTHERS,
          from: moment(today).set({ hour: 6, minute: 0 }).unix(),
          to: moment(today).set({ hour: 6, minute: 30 }).unix(),
        },
        {
          type: ReservationType.OTHERS,
          from: moment(today).set({ hour: 10, minute: 30 }).unix(),
          to: moment(today).set({ hour: 12, minute: 0 }).unix(),
        },
        {
          type: ReservationType.ME,
          from: moment(today).set({ hour: 13, minute: 0 }).unix(),
          to: moment(today).set({ hour: 14, minute: 0 }).unix(),
        },
      ],
      [MOTOROLA_DEVICE_ID]: [
        {
          type: ReservationType.OTHERS,
          from: moment(today).set({ hour: 1, minute: 30 }).unix(),
          to: moment(today).set({ hour: 2, minute: 30 }).unix(),
        },
        {
          type: ReservationType.ME,
          from: moment(today).set({ hour: 3, minute: 30 }).unix(),
          to: moment(today).set({ hour: 4, minute: 30 }).unix(),
        },
        {
          type: ReservationType.OTHERS,
          from: moment(today).set({ hour: 5, minute: 0 }).unix(),
          to: moment(today).set({ hour: 6, minute: 30 }).unix(),
        },
        {
          type: ReservationType.ME,
          from: moment(today).set({ hour: 7, minute: 0 }).unix(),
          to: moment(today).set({ hour: 9, minute: 30 }).unix(),
        },
        {
          type: ReservationType.OTHERS,
          from: moment(today).set({ hour: 13, minute: 0 }).unix(),
          to: moment(today).set({ hour: 14, minute: 0 }).unix(),
        },
      ],
    },
    [tomorrowTimestamp]: {
      [HTC_DEVICE_ID]: [
        {
          type: ReservationType.ME,
          from: moment(today).set({ hour: 2, minute: 0 }).unix(),
          to: moment(today).set({ hour: 3, minute: 30 }).unix(),
        },
        {
          type: ReservationType.ME,
          from: moment(today).set({ hour: 4, minute: 0 }).unix(),
          to: moment(today).set({ hour: 6, minute: 0 }).unix(),
        },
        {
          type: ReservationType.OTHERS,
          from: moment(today).set({ hour: 7, minute: 0 }).unix(),
          to: moment(today).set({ hour: 8, minute: 30 }).unix(),
        },
        {
          type: ReservationType.OTHERS,
          from: moment(today).set({ hour: 11, minute: 30 }).unix(),
          to: moment(today).set({ hour: 13, minute: 0 }).unix(),
        },
        {
          type: ReservationType.ME,
          from: moment(today).set({ hour: 14, minute: 0 }).unix(),
          to: moment(today).set({ hour: 15, minute: 0 }).unix(),
        },
      ],
      [MOTOROLA_DEVICE_ID]: [
        {
          type: ReservationType.OTHERS,
          from: moment(today).set({ hour: 2, minute: 30 }).unix(),
          to: moment(today).set({ hour: 3, minute: 30 }).unix(),
        },
        {
          type: ReservationType.ME,
          from: moment(today).set({ hour: 4, minute: 30 }).unix(),
          to: moment(today).set({ hour: 5, minute: 30 }).unix(),
        },
        {
          type: ReservationType.OTHERS,
          from: moment(today).set({ hour: 6, minute: 0 }).unix(),
          to: moment(today).set({ hour: 7, minute: 30 }).unix(),
        },
        {
          type: ReservationType.ME,
          from: moment(today).set({ hour: 8, minute: 0 }).unix(),
          to: moment(today).set({ hour: 10, minute: 30 }).unix(),
        },
        {
          type: ReservationType.OTHERS,
          from: moment(today).set({ hour: 14, minute: 0 }).unix(),
          to: moment(today).set({ hour: 15, minute: 0 }).unix(),
        },
      ],
    },
    [dayAfterTomorrowTimestamp]: {},
  };

  return reservations;
};
