
import React, { Component } from 'react';
import axios from 'axios'
import {Form , Button,Image} from 'react-bootstrap'
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import '../../bootstrap.css'
import { connect } from 'react-redux'

// x

class ConsultancyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     name: '',
      token: '',
      isClose: false,
      isLoaded:false,
      redirect:false

    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleClickClose = this.handleClickClose.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(event) {
    const id=this.props.auth.user._id

    event.preventDefault();
    axios.post(`https://hakunamatatasite.herokuapp.com/api/consultancyAgencies/${id}`, {
        consultancyAgencyName: this.state.name,
    }).then(res => {
      window.location.href="https://hakunamatatasite.herokuapp.com/HomePage"
    }).catch(e => {
      alert('error ')
    })

  }
  
  getLoginStyle() {
    return {
      borderRadius: (15, 50, 30, 5),
      height: 200,
      background: 'transparent',
      width: 250,
      testAlign:'center'

    }
  } 


  render() {   const {redirect} = this.state;
  if(redirect){
   return <Redirect push to={'/HomePage'} /> }
  return (
<div style={this.getLoginStyle()} >
<Form onSubmit={this.handleSubmit}>
<Form.Group controlId="formBasicEmail">
<div class="container">
<h1 style={{textAlign: "center"}}>consultancy Agency Creation</h1>
</div>

<Form.Label style={{textAlign:'left'}}>Full Name</Form.Label>
  <Form.Control  placeholder="Enter full name"  name="name"style={{
    backgroundColor:'transparent'}} onChange={this.onChange} value={this.state.name}/>

</Form.Group>
<Button variant="outline-info"  type="create" block >
 Create
</Button>
</Form>
</div>

    );
  }
}

const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors,
  info:state.info
})
export default connect(mapStateToProps,{})(ConsultancyForm)
// export default ConsultancyForm;
