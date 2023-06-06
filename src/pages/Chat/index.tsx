import { Grid } from "@mui/material";
import RoomsContainer from "../../components/Chat/Rooms";
import MessagesContainer from "../../components/Chat/Messages";
import { COLOR } from "../../ts/enums/style_constant_enums";

const Chat = ({}): JSX.Element => {
  return (
    <Grid
      container
      style={{
        display: "flex",
        width: "1200px",
        margin: "0 auto",
        backgroundColor: COLOR.white,
      }}
    >
      <RoomsContainer />
      <MessagesContainer />
    </Grid>
  );
};

export default Chat;
