import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Options from '../actionBtns/optionsBtn';
import Share from '../actionBtns/shareBtn';

import { connect } from 'react-redux';
import { deleteProject } from '../../store/actions/projectsActions';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    maxWidth: 345,
  },
  media: {
    height: 140,
    width: 70,
  },
  area: {
      display: 'flex',
      justifyContent: 'flex-start'
  },
  deleteBtn: {
    marginLeft: 'auto!important'
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
});

function ProjectCard(props) {
  const classes = useStyles(),
        {project} = props;
  let history = useHistory();

  const handleOpen = () => {

    history.push('/project/' + props.project.id);
  }
  const handleEdit = () => {

    history.push({pathname: '/edit/' + props.project.id, state: project}) ; 
  }

  const handleDelete = () => {
    props.deleteProject(props.project.id);
  }

  return (
    <Card className={classes.card}>
      <Options project={project} />
      <Share project={project} />
      <CardActionArea className={classes.area}>
        <div className={classes.media} style={{background: project.backgroundColor + ' linear-gradient(to bottom, rgba(0,0,0, 0.07), rgba(255,255,255, 0.07))'}} />
        <CardContent>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">
            {project.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Project has {project.items.length} items
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleOpen}>
            Open                 
        </Button>
        <Button size="small" color="primary" onClick={handleEdit}>
            Edit                 
        </Button>
        <IconButton color="primary" aria-label="delete" onClick={handleDelete} className={classes.deleteBtn}>
            <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (id) => dispatch(deleteProject(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);