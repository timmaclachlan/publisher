import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Grid,
  Skeleton,
  Typography,
  Tooltip,
  Card,
  CardContent,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaymentIcon from "@mui/icons-material/Payment";

import LoadingOverlay from "../LoadingOverlay";
import CardTopHeader from "../CardTopHeader";

import { readById } from "../../fetcher";
import { isEmptyObject } from "../../utils";

const MyDetails = () => {
  const { user } = useAuth0();
  const [author, setAuthor] = useState({});
  const loading = isEmptyObject(author);

  let authorId = user["https://rowanvale-athena/authorId"];

  useEffect(() => {
    const retrieveAuthor = async () => {
      let authorRecord = {};
      try {
        let response = await readById("author", authorId);
        if (Array.isArray(response.result) && response.result.length > 0) {
          authorRecord = response.result[0];
        }

        setAuthor(authorRecord);
      } catch (error) {
        console.log(error);
      }
    };
    if (authorId.length === 36) {
      retrieveAuthor();
    }
  }, [authorId]);

  const displayField = (
    field,
    width,
    height,
    variant = "subtitle1",
    maxchars = 22,
    alignText = "center"
  ) => {
    return loading ? (
      <Skeleton variant="rectangular" width={width} height={height} />
    ) : field ? (
      field.length > maxchars ? (
        <Tooltip title={field}>
          <Typography variant={variant}>
            {field.substr(0, maxchars) + "..."}
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant={variant} align={alignText}>
          {field}
        </Typography>
      )
    ) : (
      <Typography variant={variant} align={alignText}>
        Not set
      </Typography>
    );
  };

  const displayFieldValue = (field) => {
    return displayField(field, 150, 20, "h6", 22, "left");
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* Top Row */}
        <Grid item md={1}>
          <ManageAccountsIcon color="primary" sx={{ fontSize: 60 }} />
        </Grid>
        <Grid item md={11}>
          <Typography variant="h4" sx={{ pt: 1 }}>
            My Details
          </Typography>
        </Grid>

        {/* Row 2 - Author name */}

        <Grid item md={8}>
          {displayField(author.realname, 400, 40, "h4", 22, "left")}
        </Grid>

        <Grid item md={4}></Grid>

        {/* Row 3 - Personal details */}
        <Grid item md={6}>
          <Card sx={{ pt: 2 }}>
            <CardTopHeader title="Personal Details" icon={<PersonIcon />} />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item md={4}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <BorderColorIcon color="primary" />
                      <Typography variant="subtitle1">My Pen Name</Typography>
                    </Stack>
                    {displayFieldValue(author.penname)}
                  </Stack>
                </Grid>

                <Grid item md={5}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <EmailIcon color="primary" />
                      <Typography variant="subtitle1">Email 1</Typography>
                    </Stack>
                    {displayFieldValue(author.email)}
                  </Stack>
                </Grid>

                <Grid item md={3}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <PhoneIcon color="primary" />
                      <Typography variant="subtitle1">
                        Phone Number 1
                      </Typography>
                    </Stack>
                    {displayFieldValue(author.phonenumber)}
                  </Stack>
                </Grid>

                <Grid item md={4}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <LocationCityIcon color="primary" />
                      <Typography variant="subtitle1">My Country</Typography>
                    </Stack>
                    {displayFieldValue(author.location)}
                  </Stack>
                </Grid>

                <Grid item md={5}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <EmailIcon color="primary" />
                      <Typography variant="subtitle1">Email 2</Typography>
                    </Stack>
                    {displayFieldValue(author.email2)}
                  </Stack>
                </Grid>

                <Grid item md={3}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <PhoneIcon color="primary" />
                      <Typography variant="subtitle1">
                        Phone Number 2
                      </Typography>
                    </Stack>
                    {displayFieldValue(author.phonenumber2)}
                  </Stack>
                </Grid>

                <Grid item md={12}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <LanguageIcon color="primary" />
                      <Typography variant="subtitle1">My Website</Typography>
                    </Stack>
                    {displayFieldValue(author.phonenumber2)}
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={6}>
          <Avatar
            alt={author.realname}
            src={`/assets/authors/${author.id}.jpg`}
            sx={{
              width: 160,
              height: 160,
              border: "solid 5px",
              backgroundColor: "primary.dark",
              borderColor: "primary.light",
              mt: 1,
              ml: 1,
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <PersonIcon sx={{ fontSize: 60 }} />
              {displayField(author.realname, 150, 20, "caption", 15)}
            </Stack>
          </Avatar>
        </Grid>

        {/* Row 4 - Address details */}
        <Grid item md={3}>
          <Card sx={{ height: 250 }}>
            <CardTopHeader
              title="Address Details"
              icon={<ApartmentIcon />}
            ></CardTopHeader>
            <CardContent>
              <Stack spacing={1}>
                {displayField(author.address1, 150, 20)}
                {displayField(author.address2, 150, 20)}
                {displayField(author.address3, 150, 20)}
                {displayField(author.address4, 150, 20)}
                {displayField(author.postcode, 150, 20)}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={4}>
          <Card sx={{ height: 250 }}>
            <CardTopHeader
              title="Payment Details"
              icon={<PaymentIcon />}
            ></CardTopHeader>
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Sort Code
                    </Typography>

                    {displayField(author.sortcode, 150, 20)}
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Account No
                    </Typography>

                    {displayField(author.accountno, 150, 20)}
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Name
                    </Typography>

                    {displayField(author.accountname, 150, 20)}
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      PayPal
                    </Typography>
                    {displayField(author.paypal, 150, 20)}
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      IBAN
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                      Not set
                    </Typography>
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      SwiftBIC
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                      Not set
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default MyDetails;
