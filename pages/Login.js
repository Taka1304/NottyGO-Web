import React,{ useState } from 'react'
import { useLogin } from '../src/hooks/useAuth'
import * as mui from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

const Login = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { success, error, login } = useLogin()

  const handleSubmit = (event) => {
    event.preventDefault()
    login(email, password)
  }

  return (
    <mui.Container component="main" maxWidth="xs">
      <mui.CssBaseline />
      <mui.Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <mui.Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </mui.Avatar>
        <mui.Typography component="h1" variant="h5">
          ログイン
        </mui.Typography>
        <mui.Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <mui.TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <mui.TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <mui.Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ログイン
          </mui.Button>
          <mui.Grid container>
            <mui.Grid item xs>
              <mui.Link href="#" variant="body2">
                パスワードを忘れた方
              </mui.Link>
            </mui.Grid>
            <mui.Grid item>
              <mui.Link href="Signup" variant="body2">
                アカウントをお持ちでない方
              </mui.Link>
            </mui.Grid>
          </mui.Grid>
          {
            error && <mui.Alert severity="error">ログインできませんでした</mui.Alert>
          }
          {
            success && <mui.Alert severity="success">ログインしました</mui.Alert>
          }
        </mui.Box>
      </mui.Box>
    </mui.Container>
  )
}

export default Login