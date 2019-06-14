import React, { Component } from "react";
import Select from "react-select";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import {Card, Dropdown,DropdownButton,ButtonGroup,CardDeck,Button} from "react-bootstrap";

class ShowAllTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tasks:[]
        }
      }
    componentDidMount(  
        // axios.get(`https://hakunamatatasite.herokuapp.com/api/users/${store.get('payload').id}`)
        // .then((res) =>  {})
    ){
        axios
        .get(`https://hakunamatatasite.herokuapp.com/api/courses`)
        .then(res => this.setState({ tasks: res.data.data }))
    }
    getRow(){
        let returnedData=[]
        let array=this.state.tasks
    for(let x=0 ;x<array.length;x++){
      console.log(array[x])
      returnedData.unshift(
        <Card>
        <Card.Body>
          <Card.Title>{array[x].name}</Card.Title>
          <div style={{
            position:'absolute',
            right:10
          }}>
          <Link to={`/courses/${array[x]._id}`} style={{ color: "black" }}>
          View
          </Link>
          </div>
        </Card.Body>
        <br></br>
        <Card.Footer>
          <small className="text-muted">Last updated {array[x].date}</small>
        </Card.Footer>
      </Card>
      )
      }
      return  returnedData
      }
  render() {
    return (
<Card>
<Card.Header>

  </Card.Header>
  <Card.Body>
  {
    this.getRow()
  }
  
  </Card.Body>
</Card>
    );
  }
}
export default ShowAllTask;
