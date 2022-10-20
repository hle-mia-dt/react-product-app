import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import { useContext } from "react";
import { TProduct } from "../store/SearchProductStore";
import { RootStoreContext } from "../store/StoreProvider";
import Tags from "./Tags";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard = observer(({ product }: ProductCardProps) => {
  const rootStore = useContext(RootStoreContext);
  const { productDetail } = rootStore.searchProductStore;
  const handleOnClickProductCard = () => {
    rootStore.searchProductStore.setProductDetail(product);
  };
  const selected =
    productDetail && productDetail.productId === product.productId
      ? true
      : false;
  return (
    <Card
      sx={{
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.08)",
        borderLeft: selected ? "2px solid #12B8FF" : "none",
      }}
    >
      <CardActionArea
        onClick={handleOnClickProductCard}
        aria-label="product_card_button"
      >
        <CardContent sx={{ px: 3, py: "14px" }}>
          <Box display="flex" alignItems="center">
            <Box maxWidth={500}>
              <Typography
                sx={{ color: "#3C4858", fontSize: "14px", mb: "14px" }}
              >
                {product.productName}
              </Typography>
              <Tags tags={product.tags} />
            </Box>
            <Typography
              ml="auto"
              sx={{ color: "#8492A6", fontSize: "14px", fontWeight: 400 }}
            >
              {product.category}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default ProductCard;
