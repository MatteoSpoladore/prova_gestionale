import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import HomeIcon from "@mui/icons-material/Home";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TableRowsIcon from "@mui/icons-material/TableRows";
import BalanceIcon from "@mui/icons-material/AccountBalance";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

export default function Navbar({ content }) {
  const location = useLocation();

  // Stato di apertura del sotto-menu
  const [openContabilita, setOpenContabilita] = React.useState(false);

  const handleClickContabilita = () => {
    setOpenContabilita(!openContabilita);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Barra superiore */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Gestione Contabile
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {/* HOME */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/"
                selected={location.pathname === "/"}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/anagrafiche"
                selected={location.pathname === "/anagrafiche"}
              >
                <ListItemIcon>
                  <AccessibilityIcon />
                </ListItemIcon>
                <ListItemText primary="Anagrafiche" />
              </ListItemButton>
            </ListItem>

            {/* CONTABILITA (con submenu) */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleClickContabilita}>
                <ListItemIcon>
                  <AutoGraphIcon />
                </ListItemIcon>
                <ListItemText primary="Contabilità" />
                {openContabilita ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            {/* Sottomenu espandibile */}
            <Collapse in={openContabilita} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItemButton
                  component={Link}
                  to="/contabilita/scritture"
                  selected={location.pathname === "/contabilita/scritture"}
                >
                  <ListItemIcon>
                    <TableRowsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Scritture" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/contabilita/bilancio"
                  selected={location.pathname === "/contabilita/bilancio"}
                >
                  <ListItemIcon>
                    <BalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bilancio" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/contabilita/nuovo_bilancio"
                  selected={location.pathname === "/contabilita/nuovo_bilancio"}
                >
                  <ListItemIcon>
                    <BalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Nuovo Bilancio" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>

      {/* Contenuto principale */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
