import { users } from "../../data/data.js";

const Message = ({ message }) => {
  const user = users.find((user) => user.id == message.userID);

  return (
    <section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2px",
        }}
      >
        <img src={`/images/profile-pictures/${user.profilePicture}`} />
        <h3>{user.userName}</h3>
        <span>{message.timeStamp}</span>
      </div>
      <p>{message.content}</p>
      <hr />
    </section>
  );
};

export default Message;
