import React from "react";

import { useNavigate } from "react-router-dom";

import {
  Grid,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Stack,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import ViewChip from "../ViewChip";

const DisplayField = (field) => {
  return field ? field : "Not set";
};

const AuthorView = ({ author, onUpdateEditMode }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item md={1}>
        <PeopleIcon color="primary" sx={{ fontSize: 60 }} />
      </Grid>
      <Grid item md={3}>
        <Typography variant="h4" sx={{ pt: 1 }}>
          View Author
        </Typography>
      </Grid>
      <Grid item md={4} />
      <Grid item md={2}>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={() => navigate("/authors")}
        >
          Cancel
        </Button>
      </Grid>

      <Grid item md={2}>
        <Button
          variant="contained"
          sx={{ width: "100px" }}
          color="success"
          startIcon={<EditIcon />}
          onClick={() => onUpdateEditMode(true)}
        >
          Edit
        </Button>
      </Grid>

      <Grid item md={8}>
        <Typography variant="h5">{author.realname}</Typography>
      </Grid>
      <Grid item md={4}>
        <Stack spacing={2} direction="row">
          <ViewChip
            label="Active"
            value={author.active}
            color="primary"
            width={100}
          />
          <ViewChip
            label="Retained"
            value={author.retained}
            color="primary"
            width={100}
          />
        </Stack>
      </Grid>

      <Grid item md={8}>
        <Card>
          <CardHeader subheader="Personal Details"></CardHeader>
          <CardContent>
            <Grid container>
              <Grid item md={4}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1}>
                    <BorderColorIcon color="primary" />
                    <Typography variant="subtitle1">
                      {author.penname}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <LanguageIcon color="primary" />
                    <Typography variant="subtitle1">
                      {DisplayField(author.website)}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item md={5}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1}>
                    <EmailIcon color="primary" />
                    <Typography
                      variant="caption"
                      sx={{ marginLeft: "-2px !important" }}
                    >
                      1
                    </Typography>
                    <Typography variant="subtitle1">{author.email}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <EmailIcon color="primary" />
                    <Typography
                      variant="caption"
                      sx={{ marginLeft: "-2px !important" }}
                    >
                      2
                    </Typography>
                    <Typography variant="subtitle1">
                      {DisplayField(author.email2)}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item md={3}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1}>
                    <PhoneIcon color="primary" />
                    <Typography
                      variant="caption"
                      sx={{ marginLeft: "-5px !important" }}
                    >
                      1
                    </Typography>
                    <Typography variant="subtitle1">
                      {DisplayField(author.phonenumber)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <PhoneIcon color="primary" />
                    <Typography
                      variant="caption"
                      sx={{ marginLeft: "-5px !important" }}
                    >
                      2
                    </Typography>
                    <Typography variant="subtitle1">
                      {DisplayField(author.phonenumber2)}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={4}>
        <Card>
          <CardHeader subheader="Banking Details"></CardHeader>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <AccountBalanceIcon color="primary" />
                <Typography variant="subtitle1">
                  {DisplayField(author.sortcode)}
                </Typography>
                &nbsp;&nbsp;/
                <Typography variant="subtitle1">
                  {DisplayField(author.accountno)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <AccountBalanceIcon color="primary" />
                <Typography variant="subtitle1">
                  {DisplayField(author.paypal)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={6}>
        <Card sx={{ height: 300 }}>
          <CardHeader subheader="Address Details"></CardHeader>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="subtitle1">{author.address1}</Typography>
              <Typography variant="subtitle1">{author.address2}</Typography>
              <Typography variant="subtitle1">{author.address3}</Typography>
              <Typography variant="subtitle1">{author.address4}</Typography>
              <Typography variant="subtitle1">{author.postcode}</Typography>
              <Stack direction="row" spacing={1}>
                <LocationCityIcon color="primary" />
                <Typography variant="subtitle1">
                  {DisplayField(author.location)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={6}>
        <Card sx={{ height: 300 }}>
          <CardHeader subheader="Notes"></CardHeader>
          <CardContent>
            <Typography variant="subtitle1">{author.notes}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AuthorView;
