import React from "react";

import { useNavigate } from "react-router-dom";

import {
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Skeleton,
  IconButton,
  Tooltip,
  Avatar,
  Box,
  Divider,
  TextField,
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

import ViewChip from "../ViewChip";
import LoadingOverlay from "../LoadingOverlay";
import CardTopHeader from "../CardTopHeader";
import AuthorRoyalties from "./AuthorRoyalties";

import { isEmptyObject } from "../../utils";

const AuthorView = ({
  author,
  onUpdateEditMode,
  onUpdateAuthor,
  isFavorite,
  isOneBookPublished,
  onFavoriteToggle,
}) => {
  const loading = isEmptyObject(author);
  const navigate = useNavigate();

  const [notesEditMode, setNotesEditMode] = React.useState(false);

  const handleChange = (name, value) => {
    if (onUpdateAuthor) {
      onUpdateAuthor(name, value);
    }
  };

  const valueChange = (event) => {
    const { name, value } = event.target;
    handleChange(name, value);
  };

  const displayField = (
    field,
    width,
    height,
    variant = "subtitle1",
    maxchars = 22
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
        <Typography variant={variant} align="center">
          {field}
        </Typography>
      )
    ) : (
      <Typography variant={variant} align="center">
        Not set
      </Typography>
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
                            {displayField(author.email, 150, 15)}
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
                            {displayField(author.phonenumber, 150, 20)}
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
                        mykey="chip-active"
                        tooltipTrue="Author is active"
                        tooltipFalse="Author is not active"
                        width={100}
                      />
                      <ViewChip
                        label="Retained"
                        value={author.retained}
                        color="primary"
                        mykey="chip-retained"
                        width={100}
                        tooltipTrue="Author is retained"
                        tooltipFalse="Author is not retained"
                      />
                      <ViewChip
                        label="In UK"
                        value={author.notax}
                        color="success"
                        tooltipTrue="In UK so we don't deduct tax from author royalties"
                        tooltipFalse="Not in UK so we deduct tax from author royalties"
                        mykey="chip-notax"
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
                    {displayField(author.realname, 150, 20, "caption", 15)}
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
                    allowEdit
                  ></CardTopHeader>
                  <CardContent>
                    {!notesEditMode &&
                      displayField(author.notes, 300, 300, "subtitle1", 200)}
                    {notesEditMode && (
                      <TextField
                        label="Notes"
                        name="notes"
                        variant="outlined"
                        multiline
                        rows={6}
                        value={author.notes}
                        onChange={valueChange}
                        fullWidth
                      />
                    )}
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

              {isOneBookPublished && (
                <AuthorRoyalties author={author} loading={loading} />
              )}
            </Grid>
          </Stack>
        </Box>

        <Box></Box>
      </Stack>
    </>
  );
};

export default AuthorView;
