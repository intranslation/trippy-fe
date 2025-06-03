import { BrowserRouter, Route, Routes } from "react-router";

import "./App.css";
import ItineraryEditor from "./features/itinerary-editor/components/itinerary-editor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItineraryEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
