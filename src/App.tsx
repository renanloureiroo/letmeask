import { AuthContextProvider } from "./contexts/AuthContext";

import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Room } from "./pages/Room";
import { RoomAdmin } from "./pages/RoomAdmin";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />

          <Route path="/admin/rooms/:id" component={RoomAdmin} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
