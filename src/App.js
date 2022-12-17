import { useState /* useEffect */ } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Login from "./scenes/login/Login";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import React from "react";
import axios from "axios";
//const jwt = require("jsonwebtoken");

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [token] = useState(() => sessionStorage.getItem("token_web"));
  const [auth, setAuth] = useState(false);
  //const tokens = jwt.sign(token)
  axios
    .get("http://localhost:3050/user/validateToken", {
      headers: {
        aaaaaaaa: token,
      },
    })
    .then(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          setAuth(true);
          console.log("ce l'ho fatta")
        } else {
          setAuth(false);
          console.log("ce l'ho fatta");
        }
      },
      (error) => {
        console.log(error);
      }
    )
    .then();

  console.log(token);

  if (auth) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  } else {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <main className="content">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Login />} />
                <Route path="/contacts" element={<Login />} />
                <Route path="/form" element={<Login />} />
                <Route path="/bar" element={<Login />} />
                <Route path="/pie" element={<Login />} />
                <Route path="/line" element={<Login />} />
                <Route path="/geography" element={<Login />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
}

export default App;
