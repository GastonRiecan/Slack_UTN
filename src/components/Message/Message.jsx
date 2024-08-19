import { users } from "../../data/data.js";
import "./styles.css";
import { useRef, useEffect } from "react";

const Message = ({ message }) => {
  const user = users.find((user) => user.id == message.userID);
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [message]);

  return (
    <section className="full-message" ref={messageRef}>
      <div className="message-container">
        <div className="user-info">
          <img src={`/images/profile-pictures/${user.profilePicture}`} />
          <h3>{user.userName}</h3>
        </div>
        <span>{message.timeStamp}</span>
      </div>
      {message.content.includes(".gif") ? (
        <img className="gif" src={message.content}></img>
      ) : (
        <p>{message.content}</p>
      )}
    </section>
  );
};

export default Message;
