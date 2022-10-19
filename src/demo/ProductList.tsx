import { Paper, Typography, Grid, Skeleton } from "@mui/material";
import { observer } from "mobx-react";
import { useContext } from "react";
import { RootStoreContext } from "../store/StoreProvider";
import ProductCard from "./ProductCard";

const ProductList = observer(() => {
  const rootStore = useContext(RootStoreContext);
  if (
    rootStore.searchProductStore.state === "hasData" &&
    !rootStore.searchProductStore.filterProducts.length
  ) {
    return (
      <Paper variant="outlined" sx={{ textAlign: "center" }}>
        <Typography sx={{ color: "#3C4858", fontSize: "14px", py: 1 }}>
          There is irrelevant product
        </Typography>
      </Paper>
    );
  }

  return (
    <Grid container direction="column" spacing={1}>
      {rootStore.searchProductStore.state === "loading" ? (
        <>
          {Array(10)
            .fill(4)
            .map((n, idx) => (
              <Grid key={idx} item xs={12}>
                <Skeleton />
              </Grid>
            ))}
        </>
      ) : null}
      {rootStore.searchProductStore.filterProducts.map((item, idx) => (
        <Grid item xs={12} key={idx}>
          <ProductCard product={item} />
        </Grid>
      ))}
    </Grid>
  );
});

export default ProductList;
