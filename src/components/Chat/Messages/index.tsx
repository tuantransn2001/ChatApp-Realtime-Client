import React from "react";
import Header from "./Header";
import Conversation from "./Conversation";
import Footer from "./Footer";
import { Grid } from "@mui/material";

export default function Messages({}): JSX.Element {
  return (
    <Grid item xs={9}>
      <Header />
      <Conversation />
      <Footer />
    </Grid>
  );
}
