import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";

//_____________LOGIN___________________//
const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [alert, setAlert] = useState();
  sessionStorage.removeItem("stupierror");

  useEffect(() => {
    let err = sessionStorage.getItem("stupierror");
    if (err) showAlert(err);
  });
  //_____________________________________//

  //_______NASCONDI ALERT PER L'ERRORE___________//
  const hidealert = () => {
    console.log("hideAlert");
    sessionStorage.removeItem("stupierror");
    setAlert(<></>);
  };
  //_____________________________________________//

  //__________MOSTRA ALER DELL'ERRORE_________________________//
  const showAlert = (er) => {
    setAlert(
      <Alert
        style={{ width: "25%" }}
        severity="warning"
        action={
          <Button color="inherit" size="small" onClick={hidealert}>
            CANCEL
          </Button>
        }
      >
        {er}
      </Alert>
    );
  };
  //____________________________________________________________//

  //__________________FUNZIONE PER GENERARE IL TOKEN DOPO IL LOGIN____________//
  const handleFormSubmit = (values) => {
    axios
      .post("http://localhost:3050/user/generateToken", {
        username: values.username,
        pwd: values.password,
      })
      .then(
        (response) => {
          console.log("token preso");
          sessionStorage.setItem("token_web", response.data);
        },
        (error) => {
          console.log(error.response.data);
          sessionStorage.setItem("stupierror", error.response.data);
        }
      )
      .catch(() => {
        localStorage.setItem(
          "stupierror",
          "Connection error, please try later"
        );
      })
      .then(() => window.location.reload(false));
  };
  //____________________________________________________________________________//

  return (
    <Box m="20px">
      <Header title="Login" subtitle="Login as admin" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              width="500px"
              m="0px 50px 10px 0px"
              display="grid"
              gap="50px"
              gridTemplateColumns="repeat(4, minmax(12, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            {alert}
            <Box display="flex" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Log-in
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  password: yup.string().required("required"),
  username: yup.string().required("required"),
});
const initialValues = {
  password: "",
  username: "",
};

export default Login;
