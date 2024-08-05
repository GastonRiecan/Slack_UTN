import { Link } from "react-router-dom";
import "./styles.css";
import { useParams } from "react-router-dom";

export const ChannelList = ({ workSpace }) => {
  const { id_channel } = useParams();

  return (
    <div className="channel-list-container">
      <span>Canales</span>
      <section className="channel-section">
        {workSpace.channels.map((channel) => (
          <Link
            className={`channel-link ${
              id_channel == channel.id ? "current-channel" : ""
            }`}
            to={`/workspace/${workSpace.id}/${channel.id}`}
            key={channel.id}
          >
            #{channel.name}
          </Link>
        ))}
      </section>
      <button>Crear Canal</button>
    </div>
  );
};

export default ChannelList;
