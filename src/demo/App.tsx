import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tabs from "./Tabs";
import TabPanels from "./TabPanels";
import ProductDetail from "./ProductDetail";

const App = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: {
            lg: 300,
          },
          display: {
            xs: "none",
            lg: "block",
          },
        }}
      ></Box>
      <Box
        component="main"
        sx={{
          flex: 1,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 500,
                lineHeight: "21px",
              }}
              mb={0.75}
            >
              Create Demand
            </Typography>
            <Typography
              color="#8492A6"
              variant="subtitle2"
              component="p"
              mb={4.5}
              lineHeight="24px"
            >
              Search the product you need here. Use tags to find any
              alternative.
            </Typography>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "inline-block",
              }}
            >
              <Tabs />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <TabPanels />
          </Grid>
          <ProductDetail />
        </Grid>
      </Box>
    </Box>
  );
};

export default App;
