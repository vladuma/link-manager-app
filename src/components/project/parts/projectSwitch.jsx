import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function Switches(props) {
  const [state, setState] = React.useState(props.status ? props.status : false);

  const handleChange = e => {
    setState(e.target.checked);
    props.handleChange(state);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
            <Switch
                checked={state}
                onChange={handleChange}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        }
        label={`Project is ${state ? ' private' : 'public'}`}
      />
      </FormGroup>
  );
}