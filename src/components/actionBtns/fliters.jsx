import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 5,
    right: 45,
    zIndex: 7,
    margin: '0!important',
  },
  button: {
    padding: '7px!important',
  },
});

const options = [
    {
        name: 'Date desc',
        value: 'dateDesc'
    },
    {
        name: 'Date asc',
        value: 'dateAsc'
    },
    {
      name: 'A-Z',
      value: 'aZ'
    },
    {
      name: 'Z-A',
      value: 'zA'
    }
];

const ITEM_HEIGHT = 48;

export default function OptionBtns(props) {
  const classes = useStyles();
  const propItems = props.items;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    e.stopPropagation();
    handleMenuAction(e.target.dataset.value);
  };
  const handleMenuAction = (action) => {
    let items = [...propItems];

    switch (action) {
      case 'dateDesc':
        items = items.sort((a, b) => {
          return (a.created.seconds >= b.created.seconds) ? 1 : -1;
        });
        props.handleFilter(items);
        break;
      case 'dateAsc':
        items = items.sort((a, b) => {
          return (a.created.seconds <= b.created.seconds) ? 1 : -1;
        });
        props.handleFilter(items);
        break;
      case 'aZ':
        items = items.sort((a, b) => ((a.description !== '' ? a.description : a.content) >= (b.description !== '' ? b.description : b.content)) ? 1 : -1);
        props.handleFilter(items);
        break;
      case 'zA':
        items = items.sort((a, b) => ((a.description !== '' ? a.description : a.content) <= (b.description !== '' ? b.description : b.content)) ? 1 : -1);
        props.handleFilter(items);
        break;
    }
  }

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.button}
      >
        <SortIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {options.map((option, idx) => (
          <MenuItem key={idx} data-value={option.value} onClick={handleClose}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}