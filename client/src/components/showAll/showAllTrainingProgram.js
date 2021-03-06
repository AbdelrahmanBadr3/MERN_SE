import React, { Component } from "react";
import { Link } from 'react-router-dom';
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
        .get(`https://hakunamatatasite.herokuapp.com/api/trainingPrograms`)
        .then(res => {this.setState({ tasks: res.data.data })
        console.log(res)}
        ).catch(err=>{
          console.log(err)
        })
    }
    getRow(){
        let returnedData=[]
        let array=this.state.tasks
    for(let x=0 ;x<array.length;x++){
      returnedData.unshift(
        <Card>
        <Card.Body>
          <Card.Title>{array[x].name}</Card.Title>
          <div style={{
            position:'absolute',
            right:10
          }}>
          <Link to={`/trainingPrograms/${array[x]._id}`} style={{ color: "black" }}>
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
