import { Typography, CircularProgress, Stack, Box } from "@mui/material";

const LoadingOverlay = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          border: "2px solid",
          borderColor: "primary.dark",
          padding: "30px",
          position: "absolute",
          top: "40%",
          left: "40%",
          zIndex: 1000,
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography variant="h5" color="primary">
            Please wait while data is loading
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default LoadingOverlay;
