import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  function handleApiErrors(errors: any) {
    errors.forEach((error: string) => {
      if (error.includes("Password")) {
        setError("password", { message: error });
      } else if (error.includes("Email")) {
        setError("email", { message: error });
      } else if (error.includes("Username")) {
        setError("username", { message: error });
      }
    });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component={Paper}
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) =>
            agent.Account.register(data)
              .then(() => {
                toast.success("Registration Successful... You can login", {
                  theme: "colored",
                });
                navigate("/login");
              })
              .catch((error: any) => handleApiErrors(error))
          )}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={
              errors?.username?.message ? String(errors.username.message) : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                message: "Not a valid email address",
              },
            })}
            error={!!errors.email}
            helperText={
              errors?.email?.message ? String(errors.email.message) : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                message: "Not a valid password",
              },
            })}
            error={!!errors.password}
            helperText={
              errors?.password?.message ? String(errors.password.message) : ""
            }
          />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            {...register("password", {
              required: "Confirm Password is required",
            })}
            error={!!errors.password}
            helperText={
              errors?.password?.message ? String(errors.password.message) : ""
            }
          /> */}

          <LoadingButton
            loading={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid}
          >
            Register
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link to="/login">{"Already have an account"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
