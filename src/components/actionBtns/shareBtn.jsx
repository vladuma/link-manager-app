import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 5,
    right: 37,
    zIndex: 7,
    margin: '0!important',
  },
  button: {
    padding: '7px!important',
  },
});

const options = [
    {
        name: 'Get link',
        value: 'getLink'
    },
    {
        name: 'Export as a file',
        value: 'export'
    }  
];

const ITEM_HEIGHT = 48;

export default function ShareBtn(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {project} = props;
  let history = useHistory();

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    e.stopPropagation();
    handleMenuAction(e.target.dataset.value);
  };
  const handleMenuAction = (action) => {
    switch (action) {
      case 'getLink':
          console.log('get link');
        break;
      case 'export':
        console.log('export');
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
        <ShareIcon />
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