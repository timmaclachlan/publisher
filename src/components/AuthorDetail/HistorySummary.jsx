import React from "react";

import {
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  Skeleton,
} from "@mui/material";

import CardTopHeader from "../CardTopHeader";

const HistorySummary = ({
  loading,
  headerTitle,
  headerIcon,
  label1,
  label2,
  label3,
  value1,
  value2,
  value3,
  width,
  height,
}) => {
  const displayValue = (value) => {
    if (loading) {
      return <Skeleton variant="rectangular" width={width} height={height} />;
    }
    return <Typography variant="h5">{value}</Typography>;
  };

  return (
    <Card>
      <CardTopHeader title={headerTitle} icon={headerIcon} />
      <CardContent>
        <Stack spacing={1} direction="row">
          <Stack sx={{ flex: 0.5 }}>
            {label1 && (
              <>
                <Typography variant="subtitle2" align="center">
                  {label1}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {displayValue(value1)}
                </Typography>
              </>
            )}
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack sx={{ flex: 0.5 }}>
            {label2 && (
              <>
                <Typography variant="subtitle2" align="center">
                  {label2}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {displayValue(value2)}
                </Typography>
              </>
            )}
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack sx={{ flex: 0.5 }}>
            {label3 && (
              <>
                <Typography variant="subtitle2" align="center">
                  {label3}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {displayValue(value3)}
                </Typography>
              </>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default HistorySummary;
