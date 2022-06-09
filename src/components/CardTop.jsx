import React from "react";

import { Box, Stack, Typography, Button } from "@mui/material";

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
          <Button
            variant="text"
            size="small"
            color="whitepanel"
            onClick={props.onEditClick}
          >
            Edit
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default CardTop;
