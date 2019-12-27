import React, { Component } from 'react';

import Title from './parts/title';
import AddBtns from './parts/addBtns';
import Add from './parts/addComponent';
import List from './parts/listComponent';
import SaveBtn from '../actionBtns/saveBtn';
import Grid from '@material-ui/core/Grid';

import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectsActions';
import { saveProjectEdit } from '../../store/actions/projectsActions';

import {validateProject} from '../misc/validateInputs';
import KeyboardEventHandler from "react-keyboard-event-handler";
import Error from '../misc/error';

class Edit extends Component {
    constructor(props) { 
        super(props);

        if(props.history.location.state) {
            const inheritState = props.history.location.state;
            this.state = {
                id: this.props.match.params.id ? this.props.match.params.id : '',
                name: inheritState.name,
                isNew: false,
                newItem: inheritState.newItem,
                newItemType: inheritState.newItemType,
                items: inheritState.items,
                backgroundColor: inheritState.backgroundColor ? inheritState.backgroundColor : '#fff'
            };
        } else {
            this.state = {
                name: this.props.name ? this.props.name : 'Name',
                newItem: false,
                isNew: true,
                newItemType: '',
                items: []
            };
        }

        this.handleTitle = this.handleTitle.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleTitle(title) {
        this.setState({
            name: title
        });
    }
    handleColor(color) {
        this.setState({
            backgroundColor: color
        });
    }
    handleButton(btn) {
        this.setState({
            newItemType: btn,
            newItem: true
        });
    }
    handleAdd(obj){
        let items = [...this.state.items];

        items.push(obj);

        this.setState({            
            items,
            newItem: false,
            newItemType: ''
        });
    }
    handleUpdate(obj) {
        let items = [...this.state.items];

        items[obj.id] = obj;

        this.setState({
            items,
            newItem: false,
            newItemType: ''
        });
    }
    handleSave() {
        this.setState({
          invalid: false,
          validationError: ''
        });

        const validation = validateProject(this.state);
        if (validation.isValid) {
            if(this.state.isNew) {
                this.props.createProject(this.state).then((res) => {
                    this.setState({
                        redirect: true,
                        id: res
                    });
                });
            } else {
                this.props.saveProjectEdit(this.state).then((res) => {
                    if (!this.state.id || this.state.id === '') {
                        this.setState({
                            id: res
                        });
                    }
    
                    this.setState({
                        redirect: true
                    });
                });
            }
        } else {
            this.setState({
              invalid: true,
              validationError: validation.error
            });
        }
    }
    handleEdit(index){
        let items = [...this.state.items];

        items.map((item, id) => {
            if (id === index) {
                item.isEditMode = true;
            }
        });

        this.setState({
            items
        });
    }
    handleDelete(index){
        let items = [...this.state.items];
        
        items.splice(index, 1);

        this.setState({
            items
        });
    }
    handleCancel(index) {
        let items = [...this.state.items];

        items.map((item, id) => {
            if (id === index) {
                item.isEditMode = false;
            }
        });

        this.setState({
            items,
            newItem: false
        });
    }
    render() {
        console.log(this.state);
        console.log(this.props);
        return (
            <div>
                {this.state.redirect ? 
                    <Redirect to={{pathname: '/project/' + this.state.id, state: this.state}}/>
                    :
                    null
                }
                {this.state.invalid ?
                    <Error open={true} message={this.state.validationError} />
                    :
                    null
                }
                <Title handleTitle={this.handleTitle} handleColor={this.handleColor} isEditMode={true} name={this.state.name} color={this.state.backgroundColor} />
                <Grid container spacing={3}>
                    {
                        this.state.items && this.state.items.length ?
                            this.state.items.map((item, id) => (
                                !item.isEditMode ?
                                    <Grid item xs={12} sm={6} md={4} key={id}>  
                                        <List data={item} id={id} handleEdit={this.handleEdit} handleDelete={this.handleDelete}/>
                                    </Grid> 
                                :
                                    <Grid item xs={12} sm={6} md={4} key={id}>  
                                        <Add type={item.type} data={item} id={id} handleAdd={this.handleUpdate}  handleDelete={this.handleCancel}/>
                                    </Grid> 
                            ))
                        :
                            null
                    }
                    <Grid item xs={12} sm={6} md={4} style={{display: 'flex', alignItems: 'center'}}>  
                        {
                            !this.state.newItem ?
                                <AddBtns handleButton={this.handleButton}/>
                            :
                                <Add type={this.state.newItemType} id={this.state.items.length} handleAdd={this.handleAdd}  handleDelete={this.handleCancel}/>
                        }
                    </Grid> 
                </Grid>

                <SaveBtn handleSave={this.handleSave} />
                <KeyboardEventHandler handleKeys={['shift+s']} onKeyEvent={(key, e) => this.handleSave(e)} />

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project)),
        saveProjectEdit: (project) => dispatch(saveProjectEdit(project))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));