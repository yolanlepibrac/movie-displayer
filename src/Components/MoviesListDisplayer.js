import React, { Component } from 'react';
import posed from 'react-pose';

export default class MoviesListDisplayer extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render(){
    return(

        <div style={{ marginBottom:50, overflowX:'auto', display: 'flex', flexDirection: 'row',  borderStyle: 'solid', borderWidth: 0, borderColor: 'black', overflowY: 'scroll'}}>
          {
            this.props.listOfMovies.map((movie) => (
                this.props.renderMovies(movie)
              ))
            }
        </div>
    )
  }



}
