import React from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Grid,
  Button,
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

import LayersIcon from "@mui/icons-material/Layers";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ClassIcon from "@mui/icons-material/Class";

import BookViewOptions from "./BookViewOptions";

import ViewChip from "../ViewChip";
import BookViewFormats from "./BookViewFormats";

import { getFormattedDate, getRemainingPercentage } from "../../utils";

const LinkWithRouter = (props) => <Link {...props} component={RouterLink} />;

const BookView = ({ book, onUpdateEditMode }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item md={1}>
        <LayersIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
      </Grid>
      <Grid item md={3}>
        <Typography variant="h4" sx={{ pt: 1 }}>
          View Book
        </Typography>
      </Grid>
      <Grid item md={4} />
      <Grid item md={2}>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={() => navigate("/books")}
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

                  <ViewChip
                    label="Published"
                    value={book.published}
                    color="primary"
                    tooltip="Book has been published"
                  />
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

                  <ViewChip
                    label="EPPS"
                    color="primary"
                    tooltip="Product type"
                  />
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

      <Grid item md={8}>
        <Card>
          <CardHeader subheader="Formats"></CardHeader>
          <CardContent>
            <BookViewFormats book={book} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={4}>
        <Card>
          <CardHeader subheader="Specifications"></CardHeader>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Stack>
                  <Typography variant="subtitle2" align="center">
                    Width (mm)
                  </Typography>
                  <Tooltip title="Width of book">
                    <Typography variant="subtitle1" align="center">
                      {book.width}
                    </Typography>
                  </Tooltip>
                </Stack>

                <Divider orientation="vertical" flexItem />
                <Stack>
                  <Typography variant="subtitle2" align="center">
                    Height (mm)
                  </Typography>
                  <Tooltip title="Height of book">
                    <Typography variant="subtitle1" align="center">
                      {book.height}
                    </Typography>
                  </Tooltip>
                </Stack>

                <Divider orientation="vertical" flexItem />
                <Stack>
                  <Typography variant="subtitle2" align="center">
                    Page Count
                  </Typography>
                  <Tooltip title="Pages">
                    <Typography variant="subtitle1" align="center">
                      {book.pagecount}
                    </Typography>
                  </Tooltip>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={8}>
        <BookViewOptions book={book} />
      </Grid>

      <Grid item md={4}></Grid>
    </Grid>
  );
};

export default BookView;
