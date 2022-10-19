import { observer } from "mobx-react";
import React, { useContext } from "react";
import { Paper, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { RootStoreContext } from "../store/StoreProvider";

const SearchTextField = observer(() => {
  const rootStore = useContext(RootStoreContext);

  const textInput = React.useRef<HTMLDivElement>(null);

  function handleFocus() {
    const el = textInput.current;
    if (el) {
      el.style.backgroundColor = "#F5F6F7";
    }
  }

  function handleBlur() {
    const el = textInput.current;
    if (el) {
      el.style.backgroundColor = "";
    }
  }

  const handleOnChange = (event: { target: { value: string } }) => {
    rootStore.searchProductStore.setSearchKeyword(event.target.value);
  };

  return (
    <Paper
      component="div"
      elevation={0}
      sx={{
        p: "2px 4px",
        flex: 1,
        display: "flex",
        alignItems: "center",
        borderRadius: "2px",
        border: "1px solid #F0F2F4",
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      }}
      ref={textInput}
    >
      <IconButton type="button" sx={{ p: 0 }} aria-label="search">
        <SearchIcon sx={{ color: "#AFB8C5" }} />
      </IconButton>
      <InputBase
        sx={{
          ml: 1,
          color: "#3C4858",
          fontSize: 14,
        }}
        placeholder="Searching"
        inputProps={{ "aria-label": "search product" }}
        fullWidth
        onFocus={() => {
          handleFocus();
        }}
        onBlur={() => {
          handleBlur();
        }}
        value={rootStore.searchProductStore.searchKeyword}
        onChange={handleOnChange}
      />
    </Paper>
  );
});

export default SearchTextField;
