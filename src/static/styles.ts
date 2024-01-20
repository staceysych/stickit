import { createStyles } from "@mui/styles";

export const globalStyles = () =>
  createStyles({
    root: {
      boxSizing: "border-box",
      borderRadius: "0",
      background: "none",
      border: "none",
      width: "auto",
      height: "auto",
      boxShadow: "none",
      padding: 0,
      margin: 0,
    },
  });
