import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react";
import { useContext } from "react";
import { RootStoreContext } from "../store/StoreProvider";
import Tags from "./Tags";

const ProductDetail = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { productDetail } = rootStore.searchProductStore;
  return (
    <Grid
      item
      md={3}
      sx={{
        display: {
          md: "block",
          sm: "none",
          xs: "none",
        },
      }}
    >
      {productDetail ? (
        <Box sx={{ py: "24px" }}>
          <Paper
            sx={{
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.08)",
              mb: 2,
            }}
          >
            <Box borderBottom={1} borderColor="#EBEBEB" pt="14px" pb="20px">
              <Box px={3}>
                <Typography
                  color="#3C4858"
                  sx={{ fontSize: 16, fontWeight: 500 }}
                >
                  Product Details
                </Typography>
              </Box>
            </Box>
            <Box px={3} pt="42px" pb="20px">
              <Typography
                color="#3C4858"
                fontSize={14}
                fontWeight={500}
                mb="20px"
              >
                {productDetail.productName}
              </Typography>
              <Tags tags={productDetail.tags} />
              <Button
                variant="contained"
                href={productDetail.manufacturerUrl}
                target="_blank"
                sx={{
                  color: "#fff",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                  borderRadius: "2px",
                  mt: 3,
                  mb: "10px",
                }}
              >
                Go to Manufacturer
              </Button>
              <Box mb={2}>
                <Typography color="secondary" fontSize={14}>
                  {productDetail.description}
                </Typography>
              </Box>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  // value={value}
                  // onChange={handleChange}
                >
                  <FormControlLabel
                    value="option1"
                    control={
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 16,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        color="secondary.light"
                        fontSize={14}
                        fontWeight={500}
                      >
                        {productDetail.option1}
                      </Typography>
                    }
                  />
                  <Typography color="secondary" fontSize={14}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                  <FormControlLabel
                    value="option2"
                    control={
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 16,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        color="secondary"
                        fontSize={14}
                        fontWeight={500}
                      >
                        {productDetail.option2}
                      </Typography>
                    }
                  />
                  <Typography color="secondary" fontSize={14}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                </RadioGroup>
              </FormControl>
            </Box>
          </Paper>
        </Box>
      ) : null}
    </Grid>
  );
});

export default ProductDetail;
