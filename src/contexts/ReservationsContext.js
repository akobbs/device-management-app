import { createContext, useContext, useReducer } from "react";
import { generateReservationsData } from "../utils";

const reservations = generateReservationsData();

const ReservationsContext = createContext();

export function useReservations() {
  const context = useContext(ReservationsContext);
  if (!context) {
    throw new Error(
      "useReservations must be used within a ReservationsContextProvider"
    );
  }

  return context;
}

const ADD_RESERVATION_ACTION = "ADD_RESERVATION_ACTION";

function reservationsReducer(state, action) {
  switch (action.type) {
    case ADD_RESERVATION_ACTION:
      const { from, to, type, deviceId, current } = action.payload;

      return {
        ...state,
        [current]: {
          ...state?.[current],
          [deviceId]: [
            ...(state?.[current]?.[deviceId] ?? []),
            {
              type,
              from,
              to,
            },
          ],
        },
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function ReservationsProvider(props) {
  const reducerValue = useReducer(reservationsReducer, reservations);
  return <ReservationsContext.Provider value={reducerValue} {...props} />;
}

export const addReservations = (dispatch, payload) =>
  dispatch({ type: ADD_RESERVATION_ACTION, payload });
