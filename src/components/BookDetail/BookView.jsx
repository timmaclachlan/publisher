import React from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  Grid,
  Typography,
  Link,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Divider,
  Tooltip,
  Avatar,
  Skeleton,
  Box,
} from "@mui/material";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ClassIcon from "@mui/icons-material/Class";

import BookViewOptions from "./BookViewOptions";

import ViewChip from "../ViewChip";
import LoadingOverlay from "../LoadingOverlay";

import {
  getFormattedDate,
  getRemainingPercentage,
  isEmptyObject,
} from "../../utils";

const STAGE_PRE = 1;
const STAGE_PUB = 2;
const STAGE_POST = 3;

const LinkWithRouter = (props) => <Link {...props} component={RouterLink} />;

const renderServices = (services, stage) => {
  return services.map((service, index) => {
    if (service.stage === stage) {
      return (
        <ViewChip
          key={`service${index}`}
          label={service.service}
          color="primary"
          value={true}
          tooltip="Product type"
        />
      );
    }
    return null;
  });
};

const BookView = ({ book, bookServices, onUpdateEditMode }) => {
  const loading = isEmptyObject(book);

  const displayField = (field, width, height) => {
    return loading ? (
      <Skeleton variant="rectangular" width={width} height={height} />
    ) : field ? (
      field
    ) : (
      "Not set"
    );
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Tooltip title="Title of book">
            <Typography variant="h5">
              {displayField(book.title, 400, 40)}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item md={4}>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Office abbreviation">
              <Typography variant="h5">
                {displayField(book.officeabb, 200, 40)}
              </Typography>
            </Tooltip>
          </Stack>
        </Grid>

        <Grid item md={8}>
          <Card>
            <CardTopHeader title="Book Details" />
            <CardContent>
              <Grid container>
                <Grid item md={7}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Author of the book">
                        <PersonIcon color="primary" />
                      </Tooltip>
                      <LinkWithRouter
                        to={"/authors/" + book.authorid}
                        underline="hover"
                        color="primary"
                      >
                        <Typography variant="subtitle1">
                          {book.author_name}
                        </Typography>
                      </LinkWithRouter>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Pen name of the book author">
                        <BorderColorIcon color="primary" />
                      </Tooltip>
                      <Typography variant="subtitle1">
                        {displayField(book.author_penname, 400, 40)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>

                <Grid item md={5}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Genre of book">
                        <ClassIcon color="primary" />
                      </Tooltip>
                      <Typography variant="subtitle1">
                        {book.genre ? book.genre.genre : "Not set"}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Book publication date">
                        <CalendarMonthIcon color="primary" />
                      </Tooltip>
                      <Typography variant="subtitle1">
                        {book.publicationdate
                          ? getFormattedDate(book.publicationdate)
                          : "No date"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={2}>
          <Card sx={{ height: 144 }}>
            <CardTopHeader title="Royalties" />
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                  <Stack>
                    <Typography variant="caption" align="center">
                      Author
                    </Typography>
                    <Tooltip title="Royalty percentage for author">
                      <Typography variant="h5">
                        {displayField(book.royalty, 100, 40)}%
                      </Typography>
                    </Tooltip>
                  </Stack>

                  <Divider orientation="vertical" flexItem />
                  <Stack>
                    <Typography variant="caption" align="center">
                      Publisher
                    </Typography>
                    <Tooltip title="Royalty percentage for publisher">
                      <Typography variant="h5">
                        {getRemainingPercentage(book.royalty)}%
                      </Typography>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={2}></Grid>

        <Grid item md={3}>
          <Card sx={{ height: 1 }}>
            <CardTopHeader title="Pre-Pub Services" />
            <CardContent>{renderServices(bookServices, STAGE_PRE)}</CardContent>
          </Card>
        </Grid>

        <Grid item md={3}>
          <Card sx={{ height: 1 }}>
            <CardTopHeader title="Pub Services" />
            <CardContent>{renderServices(bookServices, STAGE_PUB)}</CardContent>
          </Card>
        </Grid>

        <Grid item md={3}>
          <Card sx={{ height: 1 }}>
            <CardTopHeader title="Post-Pub Services" />
            <CardContent>
              {renderServices(bookServices, STAGE_POST)}
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={3}>
          <Card>
            <CardTopHeader title="Staff" />
            <CardContent>
              <Stack direction="row">
                <Stack>
                  <Typography variant="caption">Acc. Man.</Typography>
                  <Tooltip title="Some lady">
                    <Avatar
                      alt="some lady"
                      src="/assets/user_3.jpg"
                      sx={{ width: 48, height: 48 }}
                    />
                  </Tooltip>
                </Stack>
                <Stack>
                  <Typography variant="caption">Last Edit.</Typography>
                  <Tooltip title="Some dude">
                    <Avatar
                      alt="some dude"
                      src="/assets/user_2.jpg"
                      sx={{ width: 48, height: 48 }}
                    />
                  </Tooltip>
                </Stack>
                <Stack>
                  <Typography variant="caption">Pub Adv.</Typography>
                  <Tooltip title="Some dude">
                    <Avatar
                      alt="some dude"
                      src="/assets/user_1.jpg"
                      sx={{ width: 48, height: 48 }}
                    />
                  </Tooltip>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={9}>
          <Card>
            <CardTopHeader title="Options" />
            <CardContent>
              <BookViewOptions book={book} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={3}>
          <Card>
            <CardTopHeader title="Status" />
            <CardContent>
              <ViewChip
                label="Published"
                value={book.published}
                color="primary"
                tooltip="Book has been published"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default BookView;

const CardTopHeader = (props) => {
  return (
    <CardHeader
      sx={{ p: 0, m: 0 }}
      subheader={<CardTop title={props.title} />}
    />
  );
};

const CardTop = (props) => {
  return (
    <Box sx={{ backgroundColor: "primary.main" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" color="white" sx={{ pl: 1 }}>
          {props.title}
        </Typography>
      </Stack>
    </Box>
  );
};
