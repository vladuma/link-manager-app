import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import KeyboardEventHandler from "react-keyboard-event-handler";

import Grid from '@material-ui/core/Grid';

import Title from './parts/title';
import List from './parts/listComponent';
import EditBtn from '../actionBtns/editBtn';

export const View = (props) => {
    let history = useHistory();
    const historyProject = props.location.state;
    const [project, setProject] = React.useState(historyProject ? historyProject : props.project);
    const [items, setItems] = React.useState(project.items);
    const [selected, setSelected] = React.useState(0);
    
    useEffect(() => {
        setProject(props.project);
    }, [props.project]);

    useEffect(() => {
        setProject(props.location.state);
    }, [props.location.state]);

    useEffect(() => {
        setItems(project.items);
    }, [project.items]);
    
    const handleFilter = (sortedItems) => {
        setItems(sortedItems);
    }
    const handleEdit = () => {
        history.push({
            pathname: `/edit/${props.match.params.id}`,
            state: {
                ...project
            }
        });
    }
    const handleItemSelect = (id, isSelected) => {
        let prevItems = [...items];
        
        prevItems[id].isSelected = isSelected;
        setItems(prevItems);
    }
    const handleCounterUpdate = (id, counter) => {
        let prevItems = [...items];
        
        if (!prevItems[id].selectedCount || prevItems[id].selectedCount !== 0) {
            prevItems[id].selectedCount = counter;
            setSelected(counter);
            validateCounters(prevItems);
        } else {
            prevItems[id].selectedCount = 0;
            setSelected(counter);
            validateCounters(prevItems);
        }
    }
    const validateCounters = (prevItems) => {
        let prevCount = 0,
            selectedArray = [];
        prevItems
        .filter(item => item.isSelected)
        .sort((a, b) => a.selectedCount - b.selectedCount)
        .forEach(item => {
            selectedArray.push({id: item.id, count: item.selectedCount});
        });

        selectedArray
        .sort((a, b) => a.count - b.count)
        .forEach(selectedItem => {
            const currentCount = selectedItem.count;

            if(currentCount !== prevCount++) {
                prevItems[selectedItem.id].selectedCount = prevCount;
            } else {
                prevCount = currentCount;
            }
        });
        
        setItems(prevItems);
    }
    return (
        <div>
            <Title isEditMode={false} project={project} items={items} handleFilter={items => handleFilter(items)}/>
            <Grid container spacing={3}>
                {
                    items && items.length ?
                        items.map((item, id) => (
                            <Grid item xs={12} sm={6} md={4} key={id}>
                                <List data={item} key={id} isView={true} selectedCount={selected} updateCounter={handleCounterUpdate} handleItemSelect={handleItemSelect}/>
                            </Grid>
                        ))
                    :
                        null
                }
            </Grid>
            <EditBtn doAction={handleEdit}/>
            <KeyboardEventHandler handleKeys={['shift+e']} onKeyEvent={(key, e) => handleEdit(e)} />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    console.log(state);
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;

    return {
        project: project,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [{
        collection: 'projects',
        where: ['uid', '==', (props.auth.uid ? props.auth.uid : '')]
    }])
)(View);