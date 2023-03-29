import React, { Component, Fragment } from 'react';
import './Players.css'
import { undefinedOrNull, undefinedOrZero, notUndefinedAndNull, empty } from '../../utils/Validation';



export default class Players extends Component {
        constructor(props) {
            super(props);
            this.state = {
                players: [],
                copyPlayerList : [],
                input:''
            }
        }

        componentDidMount(){
            this.getData()
        }

        getData(){
            fetch('https://api.npoint.io/20c1afef1661881ddc9c')
                .then(response =>  response.json())
                .then(resData => {
                    this.setState((state, props)=>({
                        players: resData.playerList,
                        copyPlayerList : resData.playerList,
                    }))
                })
        }


   getUpcomingMatch(UpComingMatchesList){
    let upComingMatchesListObj = UpComingMatchesList[0]
     return (
         <Fragment>
             <span>{upComingMatchesListObj.CCode} VS {upComingMatchesListObj.VsCCode}</span>
         </Fragment>
     )
    }

     convertUTCDateToLocalDate(date) {
        var newDate = new Date(date);
        newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return newDate;
    }
    
    getUpcomingMatchDate(UpComingMatchesList){
        let upComingMatchesListObj = UpComingMatchesList[0]
        var localDate = this.convertUTCDateToLocalDate(new Date(upComingMatchesListObj.MDate));
        var matchDate = localDate.toLocaleString()
        //var localDate = new Date(upComingMatchesListObj.MDate);
        //let localDate = moment(upComingMatchesListObj.MDate).local(true).format("YYYY-MM-DD HH:mm:ss");

        return (
            <Fragment>
                <span>{matchDate}</span>
            </Fragment>
        )
    }
    

    renderPlayerProfile(playerList){
        return playerList.map((player, index)=>{
            return(
                   <div  key={player.Id} className="col-md-4 col-xs-6 col-sm-3 player-info">
                        <div className="profile-pic-holder">
                            <img src={`${process.env.PUBLIC_URL}/player-images/${player.Id}.jpg`} alt="" className="profile-pic lazy"/> 
                        </div>
                        <div className="info">
                            <b>Name:</b ><span className="details">{player.PFName}</span><br />
                            <b>Skill:</b><span className="details">{player.SkillDesc}</span><br />

                            <b>Value:</b><span >${player.Value}</span><br />

                            <b>Upcoming Match:</b><span>{this.getUpcomingMatch(player.UpComingMatchesList)}</span><br />

                            <b>Date:</b><span>{this.getUpcomingMatchDate(player.UpComingMatchesList)}</span>
                        </div>
                    </div>

            )
        });
    }

    renderPlayerList(){
        if(!undefinedOrZero(this.state.players)){
            return (
            <div className="container-fluid">
                <div className="row row imageRow" id="playersList">
                    {this.renderPlayerProfile(this.state.players)}
                </div>
            </div>
            )
        }
    }

     updateInput =  (input) => {
        if (input !== "") {
            if(!undefinedOrZero(this.state.players)){
                const filtered = this.state.players.filter(player => {
                return (player.PFName.toLowerCase().includes(input.toLowerCase()) || player.TName.toLowerCase().includes(input.toLowerCase()))
                })
                this.setState((state, props)=>({
                    players: filtered,
                    input:input
                }))
            }else{
                this.getData()
            }
        }else{
            this.setState((state, props)=>({
                players: this.state.copyPlayerList,
                input:input
            }))
        }
     }



    rederSearchBar(){
        return(
                <input 
                className="searchBar"
                key="random1"
                placeholder={"search Player"}
                onChange={(e) => this.updateInput(e.target.value)}
                />
            )    
    }

    render(){
        return(
            <>
            <Fragment>
                {this.rederSearchBar()}
               {this.renderPlayerList()}
            </Fragment>
            </>
        )
    }
}



