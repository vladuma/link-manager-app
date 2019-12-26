import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  select: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  swatch: {
    width: 15,
    height: 15,
    borderRadius: '3px',
    // border: '1px solid ',
    margin: '0 7px',
  },
}));
const colors = [
    {
        name: 'Red',
        value: '#F44336'
    },
    {
        name: 'Pink',
        value: '#E91E63'
    },
    {
        name: 'Deep Purple',
        value: '#673AB7'
    },
    {
        name: 'Cyan',
        value: '#00BCD4'
    },
    {
        name: 'Light Green',
        value: '#8BC34A'
    },
    {
        name: 'Amber',
        value: '#FFC107'
    },
    {
        name: 'Blue Grey',
        value: '#607D8B'
    }
];

const ColorPicker = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);    
  const [color, setColor] = React.useState(props.color ? props.color : '');

  const handleChange = event => {
    setColor(String(event.target.value));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.handleColor(color);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} style={{backgroundColor: color}}>Project color</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Pick color</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={color}
                onChange={handleChange}
                input={<Input />}
                classes={classes}
                autoWidth={true}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {colors.map((color, id) => (
                    <MenuItem value={color.value} key={id} className={classes.item}>{color.name}<div className={classes.swatch} style={{backgroundColor: color.value}}></div></MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ColorPicker;