import React from "react";
import {makeStyles} from "@mui/styles";
const useStyles = makeStyles({
  footer: {
    color: "#FFFFFF",
    backgroundColor: "#6495ED",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
const Footer = () => {
  const classes = useStyles();
  return <div className={classes.footer}>情報工学科2年<br />EP-E3班</div>;
};
export default Footer;