"use client";

import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const router = useRouter();

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleNavigation = (href) => {
    router.push(href);
    handleMenuClose();
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "List", href: "/list" },
    { label: "About", href: "/about" }
  ];

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <Box sx={{ height: 64 }} />
    );
  }

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            color: "white",
            fontWeight: 'bold',
            textShadow: '1px 2px 5px #000000',
          }}
        >
          React Learning Project
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={mobileMenuOpen}
              onClose={handleMenuClose}
              sx={{
                '& .MuiDrawer-paper': {
                  width: 'auto',
                  marginLeft: 'auto',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                }
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
                <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  Menu
                </Typography>
                <IconButton
                  onClick={handleMenuClose}
                  sx={{ 
                    color: '#1976d2',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'rotate(180deg)',
                      backgroundColor: 'rgba(25, 118, 210, 0.1)'
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <List sx={{ py: 2 }}>
                {menuItems.map((item) => (
                  <ListItem
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    sx={{
                      textAlign: 'center',
                      color: '#1976d2',
                      fontSize: '1.1rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.1)'
                      }
                    }}
                  >
                    {item.label}
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                onClick={() => router.push(item.href)}
                sx={{
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: pathname === item.href ? '100%' : '0%',
                    height: '2px',
                    backgroundColor: 'white',
                    transition: 'width 0.3s ease'
                  },
                  '&:hover::after': {
                    width: '100%'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
