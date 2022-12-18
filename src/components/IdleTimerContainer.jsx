import React, { useRef } from "react";
import {useIdleTimer} from "react-idle-timer";




const IdleTimerContainer = () => {
  const idleTimerRef = useRef(null);
  

  const onIdle = () => {
    sessionStorage.removeItem("token_web");
    sessionStorage.setItem("stupierror", "Kicked for inactivity");
    window.location.reload(false);
  };

  const idletimer = useIdleTimer({
  crossTab: true,
  ref: idleTimerRef,
  timeout:1 * 60 * 1000,
  onIdle: onIdle})

return (<div idletimer={idletimer}></div>);
}

export default IdleTimerContainer;
