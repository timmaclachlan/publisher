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
} from "@mui/material";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ClassIcon from "@mui/icons-material/Class";

import BookViewOptions from "./BookViewOptions";

import ViewChip from "../ViewChip";

import { getFormattedDate, getRemainingPercentage } from "../../utils";

const LinkWithRouter = (props) => <Link {...props} component={RouterLink} />;

const renderServices = (services) => {
  return services.map((service, index) => {
    return (
      <ViewChip
        key={`service${index}`}
        label={service.service}
        color="primary"
        tooltip="Product type"
      />
    );
  });
};

const BookView = ({ book, bookServices, onUpdateEditMode }) => {
  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <Tooltip title="Title of book">
          <Typography variant="h5">{book.title}</Typography>
        </Tooltip>
      </Grid>
      <Grid item md={4}>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Office abbreviation">
            <Typography variant="h5"> {book.officeabb}</Typography>
          </Tooltip>
        </Stack>
      </Grid>

      <Grid item md={8}>
        <Card>
          <CardHeader subheader="Book Details"></CardHeader>
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
                      {book.author_penname}
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

                  {renderServices(bookServices)}
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={2}>
        <Card>
          <CardHeader subheader="Royalties"></CardHeader>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Stack>
                  <Typography variant="caption" align="center">
                    Author
                  </Typography>
                  <Tooltip title="Royalty percentage for author">
                    <Typography variant="h5">{book.royalty}%</Typography>
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

      <Grid item md={2}>
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
      </Grid>

      <Grid item md={12}>
        <BookViewOptions book={book} />
        <ViewChip
          label="Published"
          value={book.published}
          color="primary"
          tooltip="Book has been published"
        />
      </Grid>

      <Grid item md={4}></Grid>
    </Grid>
  );
};

export default BookView;
