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
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import ViewChip from "../ViewChip";

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
        <Typography variant="h5">{author.realName}</Typography>
      </Grid>
      <Grid item md={4}>
        <Stack direction="row" spacing={1}>
          <BorderColorIcon color="primary" />
          <Typography variant="subtitle1">{author.penName}</Typography>
        </Stack>
      </Grid>

      <Grid item md={8}>
        <Card>
          <CardHeader subheader="Personal Details"></CardHeader>
          <CardContent>
            <Grid container>
              <Grid item md={7}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1}>
                    <EmailIcon color="primary" />
                    <Typography variant="subtitle1">{author.email}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <PhoneIcon color="primary" />
                    <Typography variant="subtitle1">
                      {author.website}
                    </Typography>
                  </Stack>

                  <ViewChip
                    label="Active"
                    value={author.active}
                    color="primary"
                  />
                </Stack>
              </Grid>

              <Grid item md={5}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1">
                      {author.phoneNumber}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <LocationCityIcon color="primary" />
                    <Typography variant="subtitle1">
                      {author.location}
                    </Typography>
                  </Stack>

                  <ViewChip
                    label="Retained"
                    value={author.retainedClient}
                    color="primary"
                  />
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
                <Typography variant="subtitle1">{author.sortCode}</Typography>
                &nbsp;&nbsp;/
                <Typography variant="subtitle1">{author.accountNo}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <AccountBalanceIcon color="primary" />
                <Typography variant="subtitle1">{author.iban}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <AccountBalanceIcon color="primary" />
                <Typography variant="subtitle1">{author.bic}</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={6}>
        <Card>
          <CardHeader subheader="Address Details"></CardHeader>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="subtitle1">{author.address1}</Typography>
              <Typography variant="subtitle1">{author.address2}</Typography>
              <Typography variant="subtitle1">{author.address3}</Typography>
              <Typography variant="subtitle1">{author.address4}</Typography>
              <Typography variant="subtitle1">{author.postCode}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={6}>
        <Card>
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
