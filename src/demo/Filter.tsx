import {
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  Box,
  FormGroup,
} from "@mui/material";
import { observer } from "mobx-react";
import { useContext } from "react";
import { RootStoreContext } from "../store/StoreProvider";
import SearchTextField from "./SearchTextField";

const Filter = observer(() => {
  const rootStore = useContext(RootStoreContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    rootStore.categoryListStore.setChecked(event.target.id);
  };

  const renderCheckbox = () => {
    const elements: JSX.Element[] = [];
    rootStore.categoryListStore.categories.forEach((value, key) => {
      elements.push(
        <FormControlLabel
          key={value.id}
          control={
            <Checkbox
              id={value.id}
              name={value.name}
              checked={value.checked}
              onChange={handleChange}
              inputProps={{
                "aria-label": value.id,
              }}
            />
          }
          label={
            <Typography color="#8492A6" fontSize={13} fontWeight={500}>
              {value.name}
            </Typography>
          }
        />
      );
    });
    return elements;
  };

  return (
    <Paper
      sx={{
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.08)",
        mb: 2,
      }}
    >
      <Box borderBottom={1} borderColor="#EBEBEB" pt="14px" pb="20px">
        <Box px={3}>
          <Typography color="#3C4858" sx={{ fontSize: 16, fontWeight: 500 }}>
            I'm looking for...
          </Typography>
        </Box>
      </Box>
      <Box sx={{ px: 3, pb: 4 }}>
        <FormGroup row sx={{ mb: "21px" }}>
          {renderCheckbox()}
        </FormGroup>
        <SearchTextField />
      </Box>
    </Paper>
  );
});

export default Filter;
