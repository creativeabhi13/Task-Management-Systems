// src/pages/Search.js

import React from 'react';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <IconButton type="button" aria-label="search" size="small">
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </>
  );
};

export default Search;
