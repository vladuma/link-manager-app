import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 5,
    right: 3,
    zIndex: 7,
    margin: '0!important',
  },
  button: {
    padding: '7px!important',
  },
});

const options = [
    {
        name: 'Open selected',
        value: 'open'
    },
    {
      name: 'Open all links',
      value: 'openAll'
    },
    {
        name: 'Duplicate',
        value: 'duplicate'
    }  
];

const ITEM_HEIGHT = 48;

export default function OptionBtns(props) {
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
      case 'open':
        project.items.filter(item => item.type === 'link' && item.isSelected).forEach((link) => {window.open(link.content, "_blank");});
        break;
      case 'openAll':
        project.items.filter(item => item.type === 'link').forEach((link) => {window.open(link.content, "_blank");});
        break;
      case 'duplicate':
        const newProject = {
          ...project,
          name: project.name + ' - Copy'
        };

        history.push({pathname: '/create', state: newProject}) ; 
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
        <MoreVertIcon />
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