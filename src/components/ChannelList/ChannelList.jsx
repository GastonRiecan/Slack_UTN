import { Link } from "react-router-dom";

export const ChannelList = ({ workSpace }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        borderRadius: "10px",
        padding: "2px",
        width: "30%",
      }}
    >
      <h2>ChannelList</h2>
      <section style={{ display: "flex", flexDirection: "column" }}>
        {workSpace.channels.map((channel) => (
          <Link
            to={`/workspace/${workSpace.id}/${channel.id}`}
            key={channel.id}
          >
            #{channel.name}
          </Link>
        ))}
      </section>
      <button style={{ border: "1px dashed black", borderRadius: "10px" }}>
        Crear Canal
      </button>
    </div>
  );
};

export default ChannelList;
