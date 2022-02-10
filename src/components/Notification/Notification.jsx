import React from "react";
import "./Notification.css";

const Notification = ({ content }) => {
  return (
    <div className="notification">
      <div className="not-content">{content}</div>
    </div>
  );
};

export default Notification;
