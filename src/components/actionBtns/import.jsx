import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import Preloader from '../dashboard/preloader';
import KeyboardEventHandler from "react-keyboard-event-handler";

import {uploadToStorage} from '../../store/actions/projectsActions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 75,
  },
  select: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    //   position: 'absolute',
    color: theme.palette.error.dark,
  },
  dropzone: {
    padding: theme.spacing(2),
    border: '2px dashed ' + theme.palette.primary.dark,
    background: theme.palette.primary.light,
    color: 'white'
  },
}));

const ImportBtn = (props) => {
    let history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);    
    const [link, setLink] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [value, setValue] = React.useState(0);
    const [file, setFile] = React.useState();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";


    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const handleChange = event => {
        setLink(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleImport = () => {
        setLoading(true);
        if(value ===0 ) {
            fetchProject().then(data=> {           
                setLoading(false);
                data.id = data.id + '-import';
                data.name = data.name + ' - Import';
                history.push({pathname: 'create', state: data});
            })
            .catch(e => {
                setLoading(false);
                console.log(e);
                setError('Error retrieving a project!');
            });
        } else {
            props.uploadToStorage(file).then(res => {
                console.log(res.metadata.fullPath);
                return importFromCsv(res.metadata.fullPath).then(data => {
                    setLoading(false);
                    data.id = data.id + "-import";
                    data.name = data.name + " - Import";
                    data.items = JSON.parse(data.items);

                    for (let line in data) {
                        if(data[line] === 'false' || data[line] === 'true') {
                            data[line] = JSON.parse(data[line]);
                        }
                    }
                    history.push({ pathname: "create", state: data });
                })
            })
            .catch(e => {
                setLoading(false);
                console.log(e);
                setError('Error importing a project!');
            });;
        }
    }
    const fetchProject = () => {
        return fetch(proxyurl + link)
        .then(res => res.json())
        .then(data => data)
    }
    const importFromCsv = (filename) => {
        return fetch(proxyurl + 'https://us-central1-bookmark-app-ff6b2.cloudfunctions.net/importFile?pathName=' + filename)
        .then(res => res.json())
        .then(data => data);
    };
    const onDrop = (userFile) => {
        setFile(userFile[0]);
    }
    return (
        <div>
        <Button onClick={handleClickOpen}>Import project</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
            <Tabs
                value={value}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab label="Link" id="full-width-tab-0" aria-controls="full-width-tabpanel-0"/>
                <Tab label="File" id="full-width-tab-1" aria-controls="full-width-tabpanel-1" />
            </Tabs>
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== 0}
                id={`full-width-tabpanel-0`}
                aria-labelledby={`full-width-tab-0`}
                >
                <form className={classes.container}>
                <FormControl className={classes.formControl}>
                <TextField id="standard-basic" label="Paste link to import" onChange={handleChange} />
                </FormControl>
                </form>
            </Typography>
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== 1}
                id={`full-width-tabpanel-1`}
                aria-labelledby={`full-width-tab-1`}
                >
                <form className={classes.container}>
                <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps, isDragActive}) => (
                    <div {...getRootProps()} className={classes.dropzone}>
                    <input type="file" {...getInputProps()} />
                        {file && file.name ? 
                            file.name
                            :
                            isDragActive ? "Drop file here" : 'Click or drag a file to upload'
                        }
                    </div>
                )}
                </Dropzone>
                </form>
            </Typography>
            <DialogContentText id="alert-dialog-description" className={classes.text}>
                {error}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleImport} color="primary">
            Import
          </Button>
        </DialogActions>
      </Dialog>
      {loading ?
        <Preloader/>
        :
        null
      }
        <KeyboardEventHandler handleKeys={['enter']} onKeyEvent={(key, e) => handleImport(e)} />
        <KeyboardEventHandler handleKeys={['alt+x']} onKeyEvent={(key, e) => handleClose(e)} />

    </div>
  );
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        firebase: state.firebase
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        uploadToStorage: (file) => dispatch(uploadToStorage(file))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ImportBtn);