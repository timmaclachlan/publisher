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
  Skeleton,
  IconButton,
  Tooltip,
  Avatar,
  Box,
  Divider,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import BalanceIcon from "@mui/icons-material/Balance";
import PaymentsIcon from "@mui/icons-material/Payments";
import BarChartIcon from "@mui/icons-material/BarChart";

import ViewChip from "../ViewChip";
import LoadingOverlay from "../LoadingOverlay";

import { isEmptyObject, getFormattedCurrency } from "../../utils";

const AuthorView = ({
  author,
  onUpdateEditMode,
  isFavorite,
  onFavoriteToggle,
}) => {
  const loading = isEmptyObject(author);
  const navigate = useNavigate();

  const displayField = (
    field,
    width,
    height,
    variant = "subtitle1",
    maxchars = 50
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
        <Typography variant={variant}>{field}</Typography>
      )
    ) : (
      <Typography variant={variant}>Not set</Typography>
    );
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <Stack direction="row">
        <Box sx={{ width: "100%" }}>
          <Stack direction="row">
            <Grid container spacing={2}>
              {/* Top Row */}

              <Grid item md={1}>
                <PeopleIcon color="primary" sx={{ fontSize: 60 }} />
              </Grid>
              <Grid item md={3}>
                <Typography variant="h4" sx={{ pt: 1 }}>
                  View Author
                </Typography>
              </Grid>
              <Grid item md={3} />
              <Grid item md={1}>
                <Tooltip title="Mark author as a favorite">
                  <IconButton
                    color="primary"
                    onClick={onFavoriteToggle}
                    sx={{ mt: -1 }}
                  >
                    {isFavorite && <FavoriteIcon fontSize="large" />}
                    {!isFavorite && <FavoriteBorder fontSize="large" />}
                  </IconButton>
                </Tooltip>
              </Grid>
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

              {/* Row 2 - Author name */}

              <Grid item md={8}>
                {displayField(author.realname, 400, 40, "h4")}
              </Grid>

              <Grid item md={4}></Grid>

              {/* Row 3 - Personal details */}

              <Grid item md={6}>
                <Card>
                  <CardTopHeader
                    title="Personal Details"
                    icon={<PersonIcon />}
                  />
                  <CardContent>
                    <Grid container>
                      <Grid item md={4}>
                        <Stack spacing={2}>
                          <Stack direction="row" spacing={1}>
                            <BorderColorIcon color="primary" />
                            {displayField(author.penname, 150, 20)}
                          </Stack>
                          <Stack direction="row" spacing={1}>
                            <LocationCityIcon color="primary" />
                            {displayField(author.location, 150, 20)}
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
                            {displayField(author.email, 150, 20)}
                          </Stack>
                          <Stack direction="row" spacing={1}>
                            <EmailIcon color="primary" />
                            <Typography
                              variant="caption"
                              sx={{ marginLeft: "-2px !important" }}
                            >
                              2
                            </Typography>
                            {displayField(author.email2, 150, 20)}
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
                              {displayField(author.phonenumber, 150, 20)}
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
                            {displayField(author.phonenumber2, 150, 20)}
                          </Stack>
                        </Stack>
                      </Grid>

                      <Grid item md={12}>
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                          <LanguageIcon color="primary" />
                          {displayField(
                            author.website,
                            150,
                            20,
                            "subtitle1",
                            80
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={2}>
                <Card sx={{ height: "180px" }}>
                  <CardTopHeader title="Options" icon={<SettingsIcon />} />
                  <CardContent>
                    <Stack spacing={1} alignItems="center">
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
                      <ViewChip
                        label="In UK"
                        value={author.taxuk}
                        color="success"
                        tooltip="Pays UK tax (or not)"
                        width={100}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={2}>
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
                    <Typography variant="subtitle1">
                      {displayField(author.realname, 150, 20, "caption", 15)}
                    </Typography>
                  </Stack>
                </Avatar>
              </Grid>

              <Grid item md={2}></Grid>

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

              <Grid item md={3}>
                <Card sx={{ height: 250 }}>
                  <CardTopHeader
                    title="Notes"
                    icon={<SpeakerNotesIcon />}
                  ></CardTopHeader>
                  <CardContent>
                    {displayField(author.notes, 300, 300, "subtitle1", 200)}
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

                          <Typography variant="subtitle1" align="center">
                            {displayField(author.sortcode, 150, 20)}
                          </Typography>
                        </Stack>
                        <Divider orientation="vertical" flexItem />
                        <Stack sx={{ flex: 0.5 }}>
                          <Typography variant="subtitle2" align="center">
                            Account No
                          </Typography>

                          <Typography variant="subtitle1" align="center">
                            {displayField(author.accountno, 150, 20)}
                          </Typography>
                        </Stack>
                        <Divider orientation="vertical" flexItem />
                        <Stack sx={{ flex: 0.5 }}>
                          <Typography variant="subtitle2" align="center">
                            Name
                          </Typography>

                          <Typography variant="subtitle1" align="center">
                            {displayField(author.accountname, 150, 20)}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Stack sx={{ flex: 0.5 }}>
                          <Typography variant="subtitle2" align="center">
                            PayPal
                          </Typography>

                          <Typography variant="subtitle1" align="center">
                            {displayField(author.paypal, 150, 20)}
                          </Typography>
                        </Stack>
                        <Divider orientation="vertical" flexItem />
                        <Stack sx={{ flex: 0.5 }}></Stack>
                        <Stack sx={{ flex: 0.5 }}></Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={4}>
                <Card>
                  <CardTopHeader
                    title="Current Financials"
                    icon={<BalanceIcon />}
                  />
                  <CardContent>
                    <Stack spacing={1} direction="row">
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Balance
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          <Typography variant="h5">
                            {getFormattedCurrency(author.balance)}
                          </Typography>
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Owed Gross
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          <Typography variant="h5">
                            {getFormattedCurrency(author.grossowed)}
                          </Typography>
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Net Gross
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          <Typography variant="h5">
                            {getFormattedCurrency(author.netowed)}
                          </Typography>
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Tax
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          <Typography variant="h5">
                            {getFormattedCurrency(author.tax)}
                          </Typography>
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={4}>
                <Card>
                  <CardTopHeader title="Royalties" icon={<BarChartIcon />} />
                  <CardContent>
                    <Stack spacing={1} direction="row">
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          This Period
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          <Typography variant="h5">
                            {getFormattedCurrency(author.royaltiesthisperiod)}
                          </Typography>
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Previous Period
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          <Typography variant="h5">
                            {getFormattedCurrency(author.royaltiesprevperiod)}
                          </Typography>
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Total Royalties
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          <Typography variant="h5">
                            {getFormattedCurrency(author.royaltiestotal)}
                          </Typography>
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={4}>
                <Card>
                  <CardTopHeader title="Payments" icon={<PaymentsIcon />} />
                  <CardContent>
                    <Stack spacing={1} direction="row">
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          This Period
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          <Typography variant="h5">
                            {getFormattedCurrency(author.paymentsthisperiod)}
                          </Typography>
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Previous Period
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          <Typography variant="h5">
                            {getFormattedCurrency(author.paymentsprevperiod)}
                          </Typography>
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Total Payments
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          <Typography variant="h5">
                            {getFormattedCurrency(author.paymentstotal)}
                          </Typography>
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Box>

        <Box></Box>
      </Stack>
    </>
  );
};

export default AuthorView;

const CardTopHeader = (props) => {
  return (
    <CardHeader
      sx={{ p: 0, m: 0 }}
      subheader={<CardTop title={props.title} icon={props.icon} />}
    />
  );
};

const CardTop = (props) => {
  return (
    <Box sx={{ backgroundColor: "primary.main" }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          {props.icon && (
            <Typography variant="caption" color="white" sx={{ pl: 1, pt: 0.5 }}>
              {props.icon}
            </Typography>
          )}

          <Typography variant="h6" color="white" sx={{ pl: 1 }}>
            {props.title}
          </Typography>
        </Stack>
        {props.allowEdit && (
          <Button variant="text" size="small" color="whitepanel">
            Edit
          </Button>
        )}
      </Stack>
    </Box>
  );
};
