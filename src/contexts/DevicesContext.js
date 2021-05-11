import { createContext, useContext } from "react";
import {
  HTC_DEVICE_ID,
  MOTOROLA_DEVICE_ID,
  IPHONE_DEVICE_ID,
} from "../constants";

const devices = [
  {
    title: "HTC One M8",
    id: HTC_DEVICE_ID,
  },
  {
    title: "Motorola Moto X 2014",
    id: MOTOROLA_DEVICE_ID,
  },
  {
    title: "iPhone 12",
    id: IPHONE_DEVICE_ID,
  },
];

const DevicesContext = createContext();

export function useDevices() {
  const context = useContext(DevicesContext);
  if (!context) {
    throw new Error("useDevices must be used within a DevicesContextProvider");
  }

  return context;
}

export function DevicesProvider(props) {
  return <DevicesContext.Provider value={devices} {...props} />;
}
