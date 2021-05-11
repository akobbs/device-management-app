import { DevicesProvider } from "./contexts/DevicesContext";
import { ReservationsProvider } from "./contexts/ReservationsContext";
import { ReservationsPage } from "./pages/ReservationsPage";

function App() {
  return (
    <DevicesProvider>
      <ReservationsProvider>
        <ReservationsPage />
      </ReservationsProvider>
    </DevicesProvider>
  );
}

export default App;
