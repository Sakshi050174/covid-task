import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
//import StarBorderIcon from '@material-ui/icons/StarBorder';
import {RouteComponentProps} from "react-router";
import axios from 'axios';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select/Select";

export default class ShowWidget extends Component<RouteComponentProps> {
    constructor(props:any){
        super(props);
    }
    allStatedata = [];
    renderDistrict(key:string){
        // @ts-ignore
        var stateData = this.props?.location?.state?.stateData;
        var distData = stateData?.districtData?  stateData?.districtData[key]: {};

            return (
                <tr>
                <td>{key}</td>
                <td className="confirmed">
                    <span>{distData.confirmed}</span>
                </td>
                <td className="active">
                    <span>{distData.active ? distData.active: '-'}</span>
                </td>
                <td className="recovered">
                    <span>{distData.recovered}</span>
                </td>
                <td className="deceased">
                    <span>{distData.deceased}</span>
                </td></tr>
            );
    }
    renderStateData(state:string){
        // @ts-ignore
        axios.get('https://api.covid19india.org/state_test_data.json')
            .then((res:any) =>{
                    this.allStatedata = res.data.states_tested_data
                    console.log(this.allStatedata)


                }
            );
        // @ts-ignore
        var stateData = this.props?.location?.state?.stateData;
            Object.values(stateData.districtData).forEach((obj:any)=>{
                console.log(obj);
            });
    }
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        var tile = {theme:'Default', states:'',footer:'',header:'', districts:[]};
        var stateData = {districtData:{}};
        if(this.props?.location?.state){
            // @ts-ignore
            tile = this.props?.location?.state?.widgetData;
            // @ts-ignore
            stateData = this.props?.location?.state?.stateData;
        }
        return (
            <div className={tile.theme}>
                <header className=""><h3>
                    {tile.header}</h3></header>
                <section className="container-fluid">
                    <div className="stateData">
                        <label>{tile.states}</label>
                        {this.renderStateData(tile.states)}
                    </div>
                    <table className='table'>
                        <thead>
                        <tr>
                            <td>District</td>
                            <td className="confirmed">Confirmed</td>
                            <td className="active">Active</td>
                            <td className="recovered">Recovered</td>
                            <td className="deceased">Deceased</td>
                        </tr>
                        </thead>
                        <tbody>
                        {tile.districts.map((key:string) =>

                            // @ts-ignore

                                this.renderDistrict(key)

                        )}
                        {!tile.districts.length && (
                            <tr>
                            <td colSpan={5} className="noData">
                                Please select districts to view district data
                            </td>
                        </tr>)}

                        </tbody>
                    </table>
                </section>
                <footer className="footer">{tile.footer}</footer>
            </div>
        );
    }



}
