import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: `"Nunito", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#450099",
    },
  },
});

export const theme2 = createTheme({
  palette: {
    primary: {
      main: "#aadd22",
    },
  },
});
