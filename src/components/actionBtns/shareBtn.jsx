import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';

import LinkPopup from '../dashboard/linkPopup';

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
        name: 'Get launch link',
        value: 'launchLink'
    },
    {
      name: 'Export as a link',
      value: 'exportLink'
    },
    {
        name: 'Export as a file',
        value: 'exportFile'
    }  
];

const ITEM_HEIGHT = 48;

export default function ShareBtn(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [linkModal, setLinkModal] = React.useState(false);
  const [link, setLink] = React.useState('');
  const [modalTitle, setModalTitle] = React.useState('');
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
      setLinkModal(false);
    switch (action) {
      case 'exportLink':
          setLink('exportProject?id=' + props.project.id);
          setModalTitle('Export link');
          setLinkModal(true);
        break;
      case 'launchLink':
        setLink('launchProject?id=' + props.project.id);
        setModalTitle('Launch link');
        setLinkModal(true);
        break;
      case 'exportFile':
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl + 'https://us-central1-bookmark-app-ff6b2.cloudfunctions.net/exportFile?id=' + props.project.id)
        .then(response => {
          const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
          response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
          });
        });
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
      {linkModal? 
        <LinkPopup link={link} title={modalTitle}/>
        :
        null
      }
    </div>
  );
}