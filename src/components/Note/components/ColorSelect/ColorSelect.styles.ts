import reset from "react-style-reset";
import { makeStyles } from "@mui/styles";

import { globalStyles } from "../../../../static/styles";

const useStyles = makeStyles(() => ({
  root: {
    ...reset.div,
    background: "transparent",
    zIndex: "9999999 !important",

    "& *": {
      ...globalStyles().root,
    },
  },

  list: {
    padding: '0 !important',

    "& li": {
      padding: "8px",
    },
  },
}));

export default useStyles;
