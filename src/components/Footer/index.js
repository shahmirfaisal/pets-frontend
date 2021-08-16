import { Container, Typography, Box } from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { Link } from "react-router-dom";

export const Footer = (props) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div>
        <Container maxWidth="xl" className={classes.container}>
          <Box marginBottom={4}>
            <Typography variant="h4" component={Link} to="/">
              Tree Rabbitry
            </Typography>
          </Box>
          <Typography>Contact: 03225052506 OR 03338768603</Typography>
          <Typography>Email: shahmir049@gmail.com</Typography>
          <Typography>Payment methods:</Typography>
          <ul className={classes.ul}>
            <li>Easypaisa: 03455551164</li>
            <li>JazzCash: 03035423169</li>
          </ul>

          <Typography align="right">
            Copyright &copy; {new Date().getFullYear()}.
          </Typography>
        </Container>
      </div>
    </footer>
  );
};
