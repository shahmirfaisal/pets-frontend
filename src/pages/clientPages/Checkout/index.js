import { useState } from "react";
import { Container } from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { Shipping } from "./Shipping";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { NotificationManager } from "react-notifications";
import { UserAxios } from "../../../api/instances";
import * as Api from "../../../api/endpoints";
import { useHistory } from "react-router-dom";
import { emptyCart } from "../../../redux/slices/user";
import { withUserAuth } from "../../../hoc/withUserAuth";
import { Loader } from "../../../components/Loader/";

export const Checkout = withUserAuth(true)((props) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const contentLoading = useSelector((state) => state.orders.contentLoading);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [processing, setProcessing] = useState("");

  const changeCountryHandler = (e) => setCountry(e.target.value);
  const changeCityHandler = (e) => setCity(e.target.value);
  const changeAddress1Handler = (e) => setAddress1(e.target.value);
  const changeAddress2Handler = (e) => setAddress2(e.target.value);
  const changeZipCodeHandler = (e) => {
    if (isNaN(Number(e.target.value))) return;
    setZipCode(e.target.value.trim());
  };

  const orderHandler = async () => {
    try {
      setProcessing(true);

      const res = await UserAxios.post(Api.CREATE_ORDER, {
        country,
        city,
        address1,
        address2,
        zipCode,
      });

      dispatch(emptyCart());

      NotificationManager.success("Order placed!");

      history.replace("/");
      setProcessing(false);
    } catch (error) {
      NotificationManager.error(error.message);
    }
    setProcessing(false);
  };

  return (
    <Container maxWidth="lg">
      {contentLoading ? (
        <Loader />
      ) : (
        <>
          <Shipping
            country={country}
            city={city}
            address1={address1}
            address2={address2}
            zipCode={zipCode}
            changeCountryHandler={changeCountryHandler}
            changeCityHandler={changeCityHandler}
            changeAddress1Handler={changeAddress1Handler}
            changeAddress2Handler={changeAddress2Handler}
            changeZipCodeHandler={changeZipCodeHandler}
            processing={processing}
            placeOrder={orderHandler}
          />
        </>
      )}
    </Container>
  );
});
