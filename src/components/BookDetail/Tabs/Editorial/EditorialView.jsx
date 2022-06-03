import React from "react";

import {
  Typography,
  Grid,
  Skeleton,
  Card,
  CardHeader,
  CardContent,
  Box,
  Stack,
  Divider,
} from "@mui/material";

import { isEmptyObject } from "../../../../utils";

const EditorialView = ({ editorial }) => {
  const loading = isEmptyObject(editorial);

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
      <Grid item md={12}>
        <Card>
          <CardHeader
            sx={{ p: 0, m: 0 }}
            subheader={<CardTopHeader title="Editorial Details" />}
          ></CardHeader>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Stack sx={{ flex: 0.5 }}>
                  <Typography variant="subtitle2" align="center">
                    Edit Level
                  </Typography>

                  <Typography variant="subtitle1" align="center">
                    {displayField(editorial.editlevel)}
                  </Typography>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack sx={{ flex: 0.5 }}>
                  <Typography variant="subtitle2" align="center">
                    Word Count
                  </Typography>

                  <Typography variant="subtitle1" align="center">
                    {displayField(editorial.wordcount)}
                  </Typography>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack sx={{ flex: 0.5 }}>
                  <Typography variant="subtitle2" align="center">
                    Blurb Level
                  </Typography>

                  <Typography variant="subtitle1" align="center">
                    {displayField(editorial.blurblevel)}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default EditorialView;

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
