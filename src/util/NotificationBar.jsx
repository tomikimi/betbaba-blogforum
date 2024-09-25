import { Callout } from "@blueprintjs/core";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

function NotificationBar({ intent, status, children }) {
  const [isClose, setIsClose] = useState(Boolean(status));
  function handleNotificationBar() {
    setIsClose(() => !isClose);
  }
  return (
    <>
      {status && isClose && (
        <Callout className={`bp5-callout ${intent}`}>
          <FaXmark
            className="markXIcon"
            onClick={handleNotificationBar}
          ></FaXmark>
          {children}
        </Callout>
      )}
    </>
  );
}

export default NotificationBar;
