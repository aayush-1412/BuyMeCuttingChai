import HeaderLogo from "./components/HeaderLogo";
import HeaderNav from "./components/HeaderNav";
import Wallet from "./components/Wallet";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
const Header = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static "
          sx={{ marginBottom: "50px", backgroundColor: "#0a0b1b" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <HeaderLogo />
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <HeaderNav />
            </Typography>
            <Typography variant="h6" component="div">
              <Wallet />
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
     
    </div>
  );
};

export default Header;
