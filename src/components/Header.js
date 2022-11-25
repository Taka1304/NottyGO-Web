import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { userAuth } from '../firebase/client';
import { useLogout } from '../hooks/useAuth';
import { Alert, ListItemIcon, Snackbar } from '@mui/material';

const menuPages = [
  {
    label: 'スタンプカード',
    link: '/stamp'
  },
  {
    label: '景品交換',
    link: '/gift'
  }
]
// ログインしていない場合の表示
let userPages = [
  {
    label: 'アカウント作成',
    link: '/signup'
  },
  {
    label: 'ログイン',
    link: '/login'
  }
]

function ResponsiveAppBar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const { success, error, logout } = useLogout()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  useEffect(() => {
    setOpen(success)
    userAuth.onAuthStateChanged((auth) => {
      if (!auth){
        setUser(null)
        userPages = [{label: 'アカウント作成', link: '/signup'}, {label: 'ログイン', link: '/login'}]
      } else {
        setUser(auth)
        //ログイン状態によって中身を上書きする
        userPages = [{label: 'ログアウト', link: '/'}]
      }
    })
    },[success])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            のっティGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {menuPages.map((page) => (
                <MenuItem key={page.label} component="a" href={page.link} 
                  onClick={() => 
                  setAnchorElNav(null)
                }>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            のっティGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuPages.map((page) => (
              <Button
                key={page.label}
                component="a" 
                href={page.link}
                onClick={() => setAnchorElNav(null)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open userPages">
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}

              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              {userPages.map((page) => (
                <MenuItem 
                  key={page.label}
                  component="a" 
                  href={page.link}
                  onClick={() => {
                    page.label == 'ログアウト' && logout()
                    setAnchorElUser(null)}
                  }
                  >
                  <Typography textAlign="center" >{page.label}</Typography>
                </MenuItem>
              ))}
              {/* <MenuItem onClick={() => {
                logout()
                setAnchorElUser(null)
              }}>
                <ListItemIcon>
                  <LogoutIcon />
                  ログアウト
                </ListItemIcon>
              </MenuItem> */}
            </Menu>
          </Box>
        </Toolbar>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success'sx ={{width: '100%'}} >ログアウトしました</Alert>
        </Snackbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;