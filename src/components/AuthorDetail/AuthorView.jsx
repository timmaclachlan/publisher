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
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import ViewChip from "../ViewChip";
import LoadingOverlay from "../LoadingOverlay";

import { isEmptyObject } from "../../utils";

const AuthorView = ({
  author,
  onUpdateEditMode,
  isFavorite,
  onFavoriteToggle,
}) => {
  const loading = isEmptyObject(author);
  const navigate = useNavigate();

  const displayField = (field, width, height) => {
    return loading ? (
      <Skeleton variant="rectangular" width={width} height={height} />
    ) : field ? (
      field.length > 20 ? (
        <Tooltip title={field}>
          <Typography variant="subtitle1">
            {field.substr(0, 20) + "..."}
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant="subtitle1">{field}</Typography>
      )
    ) : (
      <Typography variant="subtitle1">Not set</Typography>
    );
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <Grid container spacing={2}>
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

        <Grid item md={6}>
          <Typography variant="h5">
            {displayField(author.realname, 400, 40)}
          </Typography>
        </Grid>

        <Grid item md={2}>
          <Stack direction="row" spacing={1}>
            {author.taxuk && (
              <>
                <DoneIcon color="success" />
                <Typography variant="subtitle1">UK</Typography>
              </>
            )}
            {!author.taxuk && (
              <>
                <CloseIcon color="success" />
                <Typography variant="subtitle1">Non-UK</Typography>
              </>
            )}
          </Stack>
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
                    {displayField(author.website, 150, 20)}
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
                  {displayField(author.sortcode, 150, 20)}
                  &nbsp;&nbsp;/
                  {displayField(author.accountno, 150, 20)}
                </Stack>
                <Stack direction="row" spacing={1}>
                  <AccountBalanceIcon color="primary" />
                  {displayField(author.paypal, 150, 20)}
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
                {displayField(author.address1, 150, 20)}
                {displayField(author.address2, 150, 20)}
                {displayField(author.address3, 150, 20)}
                {displayField(author.address4, 150, 20)}
                {displayField(author.postcode, 150, 20)}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={6}>
          <Card sx={{ height: 300 }}>
            <CardHeader subheader="Notes"></CardHeader>
            <CardContent>{displayField(author.notes, 300, 300)}</CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthorView;
