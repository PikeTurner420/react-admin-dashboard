import { useState, useEffect } from "react";
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
import IdleTimerContainer from "./components/IdleTimerContainer";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  var [token] = useState(() => sessionStorage.getItem("token_web"));
  const [auth, setAuth] = useState(false);
  console.log(token)

  //_____________RICHIESTA CONTINUA DEL TOKEN PER NON FAR LOGARE FUORI L'USER____________//
  useEffect(() => {
    if (auth) {
      setInterval(() => {
        axios.get("http://localhost:3050/user/restartToken", {}).then(
          (response) => {
            sessionStorage.setItem("token_web", response.data);
            console.log("restert del token");
          },
          (error) => {
            console.log(error);
          }
        );
      }, 6000);
    }
  }, [token, auth]);
  //________________________RICHIESTA SINGOLA PER VALIDARE IL LOG IN
  useEffect(() => {
    axios
      .get("http://localhost:3050/user/validateToken", {
        headers: {
          thk: token,
        },
      })
      .then(
        (response) => {
          if (response.status === 200) {
            console.log("autorizzato")
            setAuth(true);
          } else {
            setAuth(false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, [token]);

  if (auth) {
    return (
      <>
        <IdleTimerContainer />
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
      </>
    );
  } else {
    return (
      <>
        <IdleTimerContainer />
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
      </>
    );
  }
}

export default App;
