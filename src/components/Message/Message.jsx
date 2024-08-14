import { users } from "../../data/data.js";
import "./styles.css";

const Message = ({ message }) => {
  const user = users.find((user) => user.id == message.userID);

  return (
    <section className="full-message">
      <div className="message-container">
        <div className="user-info">
          <img src={`/images/profile-pictures/${user.profilePicture}`} />
          <h3>{user.userName}</h3>
        </div>
        <span>{message.timeStamp}</span>
      </div>
      <p>{message.content}</p>
    </section>
  );
};

export default Message;
