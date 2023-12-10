import { makeStyles } from "@mui/styles";
import reset from "react-style-reset";

import { globalStyles } from "../../static/styles";

const useStyles = makeStyles(() => ({
  root: {
    ...reset.div,
    zIndex: "99999 !important",

    "& *": {
      ...globalStyles().root,
    },
  },

  list: {
    "& li": {
      padding: "8px",
    },
  },
}));

export default useStyles;
