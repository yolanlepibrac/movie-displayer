import React, { Component } from 'react';
import SearchSelector from './SearchSelector';
import BoutonElementsSelected from './BoutonElementsSelected';


class SearchBy extends Component {
  constructor (props) {
    super(props)
    this.state = {
      focus : false,
      elementsResearched : "",
     }
  }

  enterToSubmit = (event) => {
    if (event.keyCode  == 13) {
      this.props.loadFilmsByFilter();
    }
  }



  handleChangeCategory = (event) => {
    this.setState({
      elementsResearched : event.target.value,
      focus :  true
    })
    if(this.props.StateListOfChlid){
      this.props.StateListOfChlid(event.target.value)
    }
  }

  toggleCategorySearch = () => {
    this.setState({
      focus : this.state.focus ? false : true,
    })
  }

  onBlurElement = (e) => {
    var currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!document.activeElement.contains(currentTarget)) {
        /*
        $("#Reaserch_Element").focus(function(){
        //we add the css class blur to the elements that we would like to blur on focus
            $("h1").addClass("blur");
            $("p").addClass("blur");
        }).blur(function(){
        //we remove the blur class which will remove the blur from the elements specified when we are no longer focused on an input
            $("h1").removeClass("blur");
            $("p").removeClass("blur");
        });
        */
        this.setState({
          focus : false,
        })
      }
    }, 0);
  }

  chooseOption = (element) => {
    this.props.addtoReduxStore(element);
    this.props.loadFilmsByFilter();
    this.setState({
      focus : false,
      elementsResearched : "",
    })
  }


  noDataFound = () => {
    let oneExists = false
    Object.entries(this.props.objectOfElementsToSearchIdName).map((element) => {
      if(element[1].name.toLowerCase().startsWith(this.state.elementsResearched.toLowerCase())){
          oneExists = true
      }
    })
    if(oneExists != true){
      return <SearchSelector Name={"NO DATA FOUND"} />
    }
  }

  render(){

    return(

      <div class="Reaserch_Element"  style={{width:'85%'}} onKeyDown={this.enterToSubmit} onBlur={this.onBlurElement}>
        <div  style={{width:'100%', maxWidth:'100%', minHeight : 35, marginTop:20, borderRadius:4, backgroundColor:'rgba(0,0,0,0)', display:'flex', flexDirection:'row', flexWrap:'wrap', borderStyle: 'solid', borderColor:'rgba(18,137,54)', borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.1)', justifyContent:'flex-start', alignItems:'center'}}>
          {this.props.ReduxStoreOfElements ? this.props.ReduxStoreOfElements.map(
            (category) =>
            <BoutonElementsSelected Name={category} DeleteCategory={() => this.chooseOption(category)}/>) :
            <div></div>
          }
          <input onClick={ this.toggleCategorySearch } style={{marginTop:5, width:'100%', border: 0, marginLeft:15, boxShadow: 'none', outline:'none', backgroundColor:'rgba(0,0,0,0)'}} type="text" name="name" value={this.state.elementsResearched} onChange={this.handleChangeCategory} onKeyDown={this.enterToSubmit} placeholder = {this.props.PlaceHolder}/>
        </div>
        <div>
          {this.state.focus ?
          <div style={{maxHeight: 350, overflow:'auto', display:'flex', flexDirection:'column', justifyContent:'flex-start', width : '100%', backgroundColor:'rgba(0,0,0,0.05)', cursor :'pointer' }}>
            {this.noDataFound()}
            {Object.entries(this.props.objectOfElementsToSearchIdName).map((element) => {
              if(element[1].name.toLowerCase().startsWith(this.state.elementsResearched.toLowerCase())){
                var exist = false
                for(var i=0; i<this.props.ReduxStoreOfElements.length;i++){
                  if(this.props.ReduxStoreOfElements[i] === element[1].name){
                    exist = true
                  }
                }
                if(exist === false){
                  return <SearchSelector Name={element[1].name} ChooseCategory={() => this.chooseOption(element[1].name)} />
                }
              }
            })}
          </div>:
          <div></div>
          }
        </div>
      </div>

    )

  }
}


    export default SearchBy;
