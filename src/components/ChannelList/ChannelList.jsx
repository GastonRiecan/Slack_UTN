import { Link } from "react-router-dom";
import "./styles.css";
export const ChannelList = ({ workSpace }) => {
  return (
    <div className="channel-list-container">
      <h2>CHANNELS</h2>
      <section>
        {workSpace.channels.map((channel) => (
          <Link className="channel-link"
            to={`/workspace/${workSpace.id}/${channel.id}`}
            key={channel.id}
          >
            #{channel.name}
          </Link>
        ))}
      </section>
      <button>
        Crear Canal
      </button>
    </div>
  );
};

export default ChannelList;
