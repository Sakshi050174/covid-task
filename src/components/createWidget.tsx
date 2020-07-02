import React, { Component } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import  stateData from '../assets/stateData.json';
import axios from 'axios';
import {Button} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {classes} from "istanbul-lib-coverage";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {RouteComponentProps} from "react-router";


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
export default class TodosList extends Component<RouteComponentProps> {
    constructor(props:any){
        super(props);
    }
    state = {
        widget:{
            header: '',
            footer: '',
            states: '',
            districts: [],
            theme:'Default'
        }
    };
    districtData:any = [];
    handleChange = ( e : any, key : string)=>{
        let val:any;
            val = e.target.value;
        if(key == 'states'){
            Object.keys(stateData).map((obj,index)=>{
                if(obj == val){
                    this.districtData = Object.values(stateData)[index]['districtData'];
                }
            })
        }
        let widget:any = {};
        widget = Object.assign({}, this.state.widget);
        widget[key] = val;
        this.setState({ widget:widget});
    }
    onSubmit(e:any) {
        e.preventDefault();
        const widget = this.state.widget;
        let tempStateData;
        Object.keys(stateData).forEach(key=>{
            if(key == this.state.widget.states){
                // @ts-ignore
                tempStateData = stateData[key]
            }
        })
        this.props.history.push('/show', {
            widgetData: widget,
            stateData: tempStateData
        })
    }
    render() {
        return (
            <div className="form-container wrapper">
                <header className="form-header">
                    <h3>Create Widget</h3>
                </header>
                <form className="container-fluid" onSubmit={(e)=>this.onSubmit(e)}>
                    <FormControl className="form-group">
                        <TextField
                            id="standard-helperText"
                            label="Header"
                            placeholder="Please enter widget header"
                            onChange={(e) => this.handleChange(e,'header')}
                            required
                        />
                    </FormControl>
                    <FormControl className="form-group">
                        <TextField
                            id="standard-helperText"
                            label="Footer"
                            placeholder="Please enter widget footer"
                            onChange={(e) => this.handleChange(e,'footer')}
                        />
                    </FormControl>
                    <FormControl className="form-group">
                        <InputLabel id="demo-simple-select-label">Theme</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.widget.theme}
                            onChange={(e) => this.handleChange(e,'theme')}
                        >
                            <MenuItem value="Default" key="Default">
                                Default
                            </MenuItem>
                            <MenuItem value="Red" key="Red">
                                Red
                            </MenuItem>
                            <MenuItem value="Orange" key="Orange">
                                Orange
                            </MenuItem>
                            <MenuItem value="Green" key="Green">
                                Green
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl   required className="form-group">
                        <InputLabel id="demo-simple-select-label">States</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="States"

                            value={this.state.widget.states}
                            onChange={(e) => this.handleChange(e,'states')}
                        >
                            {Object.keys(stateData).map((report:string) => (
                                <MenuItem value={report} key={report}>
                                    {report}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {this.state.widget.states && this.state.widget.states != '' &&
                    <FormControl className="form-group">
                        <InputLabel id="demo-simple-select-label">Districts</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Districts"
                            value={this.state.widget.districts}
                            onChange={(e) => this.handleChange(e,'districts')}
                            multiple>
                            <MenuItem value="{}" key="{}">--Select--</MenuItem>
                            {Object.keys(this.districtData).map((report:string) => (
                                <MenuItem value={report} key={report}>
                                    {report}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                }

                <div className="submitBtn">
                    <Button type="submit" value="Create" variant="contained" color="primary">
                        Create Widget
                    </Button>
                    </div>
                    </form>
            </div>
        )
    }
}
