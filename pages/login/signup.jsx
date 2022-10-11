import React, { useState } from "react"
import {
  Avatar,
  Alert,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useSignup } from "../../src/hooks/useAuth"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { signup, error } = useSignup()

  const handleSubmit = (event) => {
    event.preventDefault()
    signup(email, password)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ユーザー登録
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
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
          <TextField
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "success.main" }}
          >
            ユーザー登録
          </Button>
          {
            error && <Alert severity="error">ユーザー登録に失敗しました</Alert>
          }
        </Box>
      </Box>
    </Container>
  )
}
export default Signup