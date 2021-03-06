
import React, { Component } from "react";
import Select from "react-select";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import {Card, Dropdown,DropdownButton,ButtonGroup,CardDeck,Button ,Media,Row,Container,Col,Image,Spinner,Modal} from "react-bootstrap";
import cover from '../../assessments/bg3.jpg'
import profile from '../../assessments/home1.jpg'
import Moment from 'react-moment'
import axios from "axios";
import { element } from "prop-types";
import PlatformCard from "../newComponents/PlatformCard";
import PostCard from "../../testComponents/PostCard";
import ImageSrc from '../../assessments/man.jpg';
import { connect } from 'react-redux'
import TaskForm from '../../testComponents/TaskForm'
import ProjectForm from '../../testComponents/ProjectForm'
import CourseForm from '../../testComponents/CourseForm'
import MasterClassForm from '../../testComponents/MasterClassForm'

// import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from '../chat/Chat'
var store = require('store')
class MemberProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id:null,
    tags:[],
    email: '',
    dateOfBirth:'',
    age:'',
    deactivated: false,
    profileName:'',
    //ConsultancyAgency
    consultancyAgencyName: '',
    consultancyAgencyManager: '',
    consultancyAgencyRate: '',
    consultancyAgencyLocation:[],
    consultancyAgencyPhoneNumber: '',
    consultancyAgencyPartners: [],
    consultancyAgencyMembers: [],
    consultancyAgencyEvents: [],
    consultancyAgencyAppliedInPorjects: [],
    consultancyAgencyAppliedInTasks: [],
    consultancyAgencyAcceptedInPorjects: [],
    consultancyAgencyAcceptedInTasks: [],
    consultancyAgencyReports: [],
    consultancyAgencyRevenues: '',
    consultancyAgencyRevenuePerEmployee: '',  
    consultancyAgencyFiscalYear: '',
    consultancyAgencyHeadquarters: [],
    consultancyAgencyOffers: [],
    consultancyAgencyDateJoined: '',
    //End ConsultancyAgency

    //Member
    memberFullName: '',
    memberWebName: '',
    memberLocation:'',
    memberDateJoined: '',
    memberPhoneNumber: '',
    isExpert: false,
    completedTasks: [],
    acceptedInTasks: [],
    appliedInTasks: [],
    completedProjects: [],
    acceptedInProjects: [],
    appliedInProjects: [],
    experienceLevel: '',
    memberRating:'',
    allRatedTasks:'',
    allRatedReco: '',
    averageRecoRate: '',
    memberHirePerHour:'',
    skills: [],
    memberEvents:[],
    memberCertificates:[],
    memberCourses:[],
    memberCoursesAppliedIn:[],
    memberCoursesAcceptedIn:[],
    memberMasterClassesAppliedIn:[],
    memberMasterClassesAcceptedIn:[],
    memberWorksIn:[],

    courseRequests:[],
    posts:[],
    //End Member

    // Partner
    partnerName:'',
    partnerPhoneNumber: '',
    partnerLocation:'',
    partnerDateJoined:'',
    partnerPartners: [],
    fieldOfWork:[],
    partnerEvents:[],
    partnerProjects: [],
    partnerTasks: [],
    feedbackForm: [],
    // End Partner

    // CoworkingSpace
    coworkingSpaceName: '',
    coworkingSpaceDateJoined:'',
    coworkingSpacePhoneNumber: '',
    coworkingSpaceLocation: '',
    coworkingSpaceBusinessPlans: [],
    coworkingSpaceFacilites: '',
    coworkingSpaceMaxNoRooms:'',
    coworkingSpaceRooms: [],
    // End CoworkingSpace

    // EducationOrganization
    educationOrganizationName: '',
    educationOrganizationPhoneNumber: '',
    educationOrganizationLocation:'',
    educationOrganizationCertificates: [],
    educationOrganizationTrainingPrograms: [],
    educationOrganizationCourses: [],
    educationOrganizationMasterClasses:[],
    educationOrganizationEducators:[],
    educationOrganizationDateJoined:'',
    // End EducationalOrganization
    currTag:'',
     //Member
    Info: true,
    Task: false,
    Project: false,
    Education: false,
    Post: false,
    
    //partner
    PartnerInfo:true,
    PartnerProjects:false,
    PartnerTasks:false,
    PartnerEvents:false,

    //Educational Organization
    EducationInfo:true,
    Courses:false,
    MasterClasses:false,
    Educators:false,
    TrainingPrograms:false,
    Certificates:false,
    
    //CoWorking Spaces 
    CoworkingSpaceInfo:true,
    Rooms:false,
    //CA
    consultancyAgencyInfo:true,
    consultancyAgencyProject:false,
    condultancyAgencyTask:false,
    loaded:false,
    masterclasses:[],
    // Added Forms
    modalShowTask:false,
    modalShowProject:false,
    modalShowCourse:false,
    modalShowMasterclass:false,
    modalShowTrainingProgram:false,
    }
    //partner
    this.handleClickEvent=this.handleClickEvent.bind(this)
    this.handleClickPartnerInfo=this.handleClickPartnerInfo.bind(this)
    this.handleClickPartnerTasks=this.handleClickPartnerTasks.bind(this)
    this.handleClickPartnerProjects=this.handleClickPartnerProjects.bind(this)
     //member
    this.handleClickInfo = this.handleClickInfo.bind(this)
    this.handleClickTask = this.handleClickTask.bind(this)
    this.handleClickProject = this.handleClickProject.bind(this)
    this.handleClickEducation = this.handleClickEducation.bind(this)
    //Educational Organizations
    this.handleClickPost = this.handleClickPost.bind(this)
    this.handleClickEducationInfo = this.handleClickEducationInfo.bind(this)
    this.handleClickCourses = this.handleClickCourses.bind(this)
    this.handleClickMasterClasses = this.handleClickMasterClasses.bind(this)
    this.handleClickEducators = this.handleClickEducators.bind(this)
    this.handleClickTrainingPrograms = this.handleClickTrainingPrograms.bind(this)
    this.handleClickCertificates = this.handleClickCertificates.bind(this)
    this.beMember = this.beMember.bind(this)
    this.beCA = this.beCA.bind(this)
    this.beCoSpace = this.beCoSpace.bind(this)
    this.beEOrg = this.beEOrg.bind(this)
    this.bePartner = this.bePartner.bind(this)
    //CoWorking space
    this.handleClickCoWorkingSpaceInfo=this.handleClickCoWorkingSpaceInfo.bind(this)
    this.handleClickRoom=this.handleClickRoom.bind(this)   
    // CA
    this.handleClickCAInfo = this.handleClickCAInfo.bind(this)
    this.handleClickCATask = this.handleClickCATask.bind(this)
    this.handleClickCAProject = this.handleClickCAProject.bind(this)
  }
  componentDidMount(){
    const id=this.props.match.params.id
    this.setState({id:id})
    axios.get(`https://hakunamatatasite.herokuapp.com/api/users/${id}`)
      .then((res) =>  {
        this.setState({email:res.data.data.email})
        this.setState({dateOfBirth:res.data.data.dateOfBirth})        
        this.setState({age:res.data.data.age})
        this.setState({currTag:res.data.data.tags[0]}) 
        this.setState({tags:res.data.data.tags}) 
        this.setState({loaded:true}) 
        this.setState({profileName:res.data.data.displayedName})
        
        //Member
        this.setState({memberFullName:res.data.data.memberFullName})
        this.setState({memberWebName:res.data.data.memberWebName})
        this.setState({memberLocation:res.data.data.memberLocation})
        this.setState({memberDateJoined:res.data.data.memberDateJoined})
        this.setState({memberPhoneNumber:res.data.data.memberPhoneNumber})
        this.setState({isExpert:res.data.data.isExpert})
        this.setState({experienceLevel:res.data.data.experienceLevel})
        this.setState({memberRating:res.data.data.memberRating})
        this.setState({allRatedTasks:res.data.data.allRatedTasks})
        this.setState({allRatedReco:res.data.data.allRatedReco})
        this.setState({averageRecoRate:res.data.data.averageRecoRate})
        this.setState({memberHirePerHour:res.data.data.memberHirePerHour})
        this.setState({skills:res.data.data.skills})
        this.setState({memberCertificates:res.data.data.memberCertificates})
        this.setState({memberEvents:res.data.data.memberEvents})
        this.setState({memberWorksIn:res.data.data.memberWorksIn})

        this.setState({completedTasks:res.data.data.completedTasks})
        this.setState({acceptedInTasks:res.data.data.acceptedInTasks})
        this.setState({appliedInTasks:res.data.data.appliedInTasks})

        this.setState({completedProjects:res.data.data.completedProjects})
        this.setState({acceptedInProjects:res.data.data.acceptedInProjects})
        this.setState({appliedInProjects:res.data.data.appliedInProjects})

        this.setState({memberCourses:res.data.data.memberCourses})
        this.setState({memberCoursesAppliedIn:res.data.data.memberCoursesAppliedIn})
        this.setState({memberCoursesAcceptedIn:res.data.data.memberCoursesAcceptedIn})


        this.setState({memberMasterClassesAppliedIn:res.data.data.memberMasterClassesAppliedIn})
        this.setState({memberMasterClassesAcceptedIn:res.data.data.memberMasterClassesAcceptedIn})

        this.setState({courseRequests:res.data.data.courseRequests})
        this.setState({posts:res.data.data.posts})

        // Partner
        this.setState({partnerName:res.data.data.partnerName})
        this.setState({partnerPhoneNumber:res.data.data.partnerPhoneNumber})
        this.setState({partnerLocation:res.data.data.partnerLocation})
        this.setState({partnerDateJoined:res.data.data.partnerDateJoined})
        // this.setState({partnerPartners:res.data.data.partnerPartners})
        this.setState({fieldOfWork:res.data.data.fieldOfWork})

        this.setState({partnerEvents:res.data.data.partnerEvents})

        this.setState({partnerTasks:res.data.data.partnerTasks})
        this.setState({partnerProjects:res.data.data.partnerProjects})

        // this.setState({feedbackForm:res.data.data.feedbackForm})

        // CA
        this.setState({consultancyAgencyName:res.data.data.consultancyAgencyName})
        this.setState({consultancyAgencyManager:res.data.data.consultancyAgencyManager})
        this.setState({consultancyAgencyRate:res.data.data.consultancyAgencyRate})
        this.setState({consultancyAgencyLocation:res.data.data.consultancyAgencyLocation})
        this.setState({consultancyAgencyPhoneNumber:res.data.data.consultancyAgencyPhoneNumber})

        this.setState({consultancyAgencyPartners:res.data.data.consultancyAgencyPartners})
        this.setState({consultancyAgencyMembers:res.data.data.consultancyAgencyMembers})
        this.setState({consultancyAgencyEvents:res.data.data.consultancyAgencyEvents})
        this.setState({consultancyAgencyReports:res.data.data.consultancyAgencyReports})

        this.setState({consultancyAgencyAppliedInPorjects:res.data.data.consultancyAgencyAppliedInPorjects})
        this.setState({consultancyAgencyAcceptedInPorjects:res.data.data.consultancyAgencyAcceptedInPorjects})

        this.setState({consultancyAgencyAppliedInTasks:res.data.data.consultancyAgencyAppliedInTasks})
        this.setState({consultancyAgencyAcceptedInTasks:res.data.data.consultancyAgencyAcceptedInTasks})
        
        this.setState({consultancyAgencyRevenues:res.data.data.consultancyAgencyRevenues})
        this.setState({consultancyAgencyRevenuePerEmployee:res.data.data.consultancyAgencyRevenuePerEmployee})
        this.setState({consultancyAgencyFiscalYear:res.data.data.consultancyAgencyFiscalYear})
        this.setState({consultancyAgencyHeadquarters:res.data.data.consultancyAgencyHeadquarters})

        this.setState({consultancyAgencyOffers:res.data.data.consultancyAgencyOffers})
        this.setState({consultancyAgencyDateJoined:res.data.data.consultancyAgencyDateJoined})

        // CoworkingSpace 
        this.setState({coworkingSpaceName:res.data.data.coworkingSpaceName})
        this.setState({coworkingSpacePhoneNumber:res.data.data.coworkingSpacePhoneNumber})
        this.setState({coworkingSpaceLocation:res.data.data.coworkingSpaceLocation})
        this.setState({coworkingSpaceBusinessPlans:res.data.data.coworkingSpaceBusinessPlans})
        this.setState({coworkingSpaceFacilites:res.data.data.coworkingSpaceFacilites})
        this.setState({coworkingSpaceMaxNoRooms:res.data.data.coworkingSpaceMaxNoRooms})
        this.setState({coworkingSpaceDateJoined:res.data.data.coworkingSpaceDateJoined})

        this.setState({coworkingSpaceRooms:res.data.data.coworkingSpaceRooms})

        // EducationOrganization
        this.setState({educationOrganizationName:res.data.data.educationOrganizationName})
        this.setState({educationOrganizationPhoneNumber:res.data.data.educationOrganizationPhoneNumber})
        this.setState({educationOrganizationDateJoined:res.data.data.educationOrganizationDateJoined})

        this.setState({educationOrganizationLocation:res.data.data.educationOrganizationLocation})
        this.setState({educationOrganizationCertificates:res.data.data.educationOrganizationCertificates})
        this.setState({educationOrganizationTrainingPrograms:res.data.data.educationOrganizationTrainingPrograms})
        this.setState({educationOrganizationCourses:res.data.data.educationOrganizationCourses})
        this.setState({educationOrganizationMasterClasses:res.data.data.educationOrganizationMasterClasses})
        this.setState({educationOrganizationEducators:res.data.data.educationOrganizationEducators})

       console.log(res.data.data)
       this.setState({currTag:res.data.data.tags[0]}) 
        //console.log(this.state.currTag)
      }
    )
    axios
    .get(`https://hakunamatatasite.herokuapp.com/api/masterclasses`)
    .then(res => {
      this.setState({ masterclasses: res.data.data });
    })
  }
  handleClickInfo(){
  this.setState({Info:true})
  this.setState({Task:false})
  this.setState({Project:false})
  this.setState({Education:false})
  this.setState({Post:false})    
  }
  handleClickTask(){
    this.setState({Info:false})
    this.setState({Task:true})
    this.setState({Project:false})
    this.setState({Education:false})
    this.setState({Post:false})

  }
  handleClickProject(){
    this.setState({Info:false})
    this.setState({Task:false})
    this.setState({Project:true})
    this.setState({Education:false})
    this.setState({Post:false})

    }

  handleClickCAInfo(){
    this.setState({consultancyAgencyInfo:true})
    this.setState({consultancyAgencyProject:false})
    this.setState({condultancyAgencyTask:false})

    }
    handleClickCATask(){
this.setState({consultancyAgencyInfo:false})
    this.setState({consultancyAgencyProject:false})
    this.setState({condultancyAgencyTask:true})

    }
    handleClickCAProject(){
      this.setState({consultancyAgencyInfo:false})
      this.setState({consultancyAgencyProject:true})
      this.setState({condultancyAgencyTask:false})
  
    } 

  handleClickEducation(){
    this.setState({Info:false})
    this.setState({Task:false})
    this.setState({Project:false})
    this.setState({Education:true})
    this.setState({Post:false})

  }
  handleClickPost(){
    this.setState({Info:false})
    this.setState({Task:false})
    this.setState({Project:false})
    this.setState({Education:false})
    this.setState({Post:true})
  }
  handleClickCoWorkingSpaceInfo(){
    this.setState({CoworkingSpaceInfo:true})
    this.setState({Rooms:false})
  }
  handleClickRoom(){
    this.setState({CoworkingSpaceInfo:false})
    this.setState({Rooms:true})
  }
  handleClickEvent(){
    this.setState({PartnerInfo:false})
    this.setState({PartnerProjects:false})
    this.setState({PartnerTasks:false})
    this.setState({PartnerEvents:true})
  }
  handleClickPartnerInfo(){
    this.setState({PartnerInfo:true})
    this.setState({PartnerProjects:false})
    this.setState({PartnerTasks:false})
    this.setState({PartnerEvents:false})
  }
  handleClickPartnerTasks(){
    this.setState({PartnerInfo:false})
    this.setState({PartnerProjects:false})
    this.setState({PartnerTasks:true})
    this.setState({PartnerEvents:false})
  }
  handleClickPartnerProjects(){
    this.setState({PartnerInfo:false})
    this.setState({PartnerProjects:true})
    this.setState({PartnerTasks:false})
    this.setState({PartnerEvents:false})
  }
  handleClickEducationInfo(){
    this.setState({EducationInfo:true})
    this.setState({Courses:false})
    this.setState({MasterClasses:false})
    this.setState({Educators:false})  
    this.setState({TrainingPrograms:false})  
    this.setState({Certificates:false})  
  }
  handleClickCourses(){
    this.setState({EducationInfo:false})
    this.setState({Courses:true})
    this.setState({MasterClasses:false})
    this.setState({Educators:false})  
    this.setState({TrainingPrograms:false})  
    this.setState({Certificates:false}) 
  }
  handleClickMasterClasses(){
    this.setState({EducationInfo:false})
    this.setState({Courses:false})
    this.setState({MasterClasses:true})
    this.setState({Educators:false})  
    this.setState({TrainingPrograms:false})  
    this.setState({Certificates:false}) 

  }
  handleClickEducators(){
    this.setState({EducationInfo:false})
    this.setState({Courses:false})
    this.setState({MasterClasses:false})
    this.setState({Educators:true})  
    this.setState({TrainingPrograms:false})  
    this.setState({Certificates:false}) 
  }
  handleClickTrainingPrograms(){
    this.setState({EducationInfo:false})
    this.setState({Courses:false})
    this.setState({MasterClasses:false})
    this.setState({Educators:false})  
    this.setState({TrainingPrograms:true})  
    this.setState({Certificates:false}) 
  }
  handleClickCertificates(){
    this.setState({EducationInfo:false})
    this.setState({Courses:true})
    this.setState({MasterClasses:false})
    this.setState({Educators:false})  
    this.setState({TrainingPrograms:false})  
    this.setState({Certificates:true}) 
  }


  getLink( array,type){
    let returnedData=[]
    array.map((item)=>{
      returnedData.push(
        <Link to={`/${type}s/${item.id}`} style={{ color: "black" }}>
        {item.name}
        </Link>
    )
    })

 
  return  returnedData
  }
  getData(array){
    let returnedData=[]
    array.map((item)=>{
      returnedData.push(
        item.name
    )
    })
  return  returnedData
  }
  getFeedBack(array){
    let returnedData=[]
    array.map((item)=>{
      returnedData.push(
        item.feedback
    )
    })
  return  returnedData
  }
  // getFeedBack(array){
  //   let returnedData=[]
  //   array.map((item)=>{
  //     returnedData.push(
  //       item.feedback
  //   )
  //   })
  // return  returnedData
  // }
  getRow( array,index,type){
    let returnedData=[]
for(let x=index ;x<array.length&(x%3!=0|x==index);x++){
  returnedData.push(
    <Card>
    <Card.Body>
      <Card.Title>{array[x].name}</Card.Title>
      <div style={{
        position:'absolute',
        right:10
      }}>
      <Link to={`/${type}s/${array[x].id}`} style={{ color: "black" }}>
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
  getRowRoom( array,index,type){
    let returnedData=[]
    const id=this.props.match.params.id
for(let x=index ;x<array.length&(x%3!=0|x==index);x++){
  returnedData.push(
    <Card>
    <Card.Body>
      <Card.Title>{array[x].name}</Card.Title>
      <div style={{
        position:'absolute',
        right:10
      }}>
      <Link to={`coWorkingSpaces/${type}s/${id}/${array[x].id}`} style={{ color: "black" }}>
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


  /// you will find the Buttons here to add the Links
showData(){
let returnedData=[]
const id=this.props.match.params.id
if(this.state.currTag ==='Member' ){
//   returnedData.push( <Link to={`/updatedmember/${id}`} style={{ color: "black" }}>
//   update
//  </Link>)
 if(this.state.Task){
if(this.state.completedTasks.length>0){
  returnedData.push(<h1>Completed</h1>)
  for(let index=0;index<this.state.completedTasks.length;index=index+3){
  returnedData.push(<CardDeck>{this.getRow(this.state.completedTasks,index,'task')}</CardDeck>)
}
}
if(this.state.acceptedInTasks.length>0){
  returnedData.push(<h1>Accepted</h1>)
  for(let index=0;index<this.state.acceptedInTasks.length;index=index+3){
  returnedData.push(<CardDeck>{this.getRow(this.state.acceptedInTasks,index,'task')}</CardDeck>)
}
}
if(this.state.appliedInTasks.length>0){
  returnedData.push(<h1>Applied</h1>)
  for(let index=0;index<this.state.appliedInTasks.length;index=index+3){
  returnedData.push(<CardDeck>{this.getRow(this.state.appliedInTasks,index,'task')}</CardDeck>)
  returnedData.push(<br/>)
}
}
if(id==this.props.auth.user._id)
if(returnedData.length ==0){
  returnedData.push(<div><h1>Not Applied To Tasks Yet</h1> <Link push to={"https://hakunamatatasite.herokuapp.com/tasks"}> View some tasks</Link>
  </div>)
}

}
if( this.state.Project){
  if(this.state.completedProjects.length>0){
    returnedData.push(<h1>Completed</h1>)
    for(let index=0;index<this.state.completedProjects.length;index=index+3){
    returnedData.push(<CardDeck>{this.getRow(this.state.completedProjects,index,'project')}</CardDeck>)
  }
  }
  if(this.state.acceptedInProjects.length>0){
    returnedData.push(<h1>Accepted</h1>)
    for(let index=0;index<this.state.acceptedInProjects.length;index=index+3){
    returnedData.push(<CardDeck>{this.getRow(this.state.acceptedInProjects,index,'project')}</CardDeck>)
  }
  }
  
  if(this.state.appliedInProjects.length>0){
    returnedData.push(<h1>Applied</h1>)
    for(let index=0;index<this.state.appliedInProjects.length;index=index+3){
    returnedData.push(<CardDeck>{this.getRow(this.state.appliedInProjects,index,'project')}</CardDeck>)
    returnedData.push(<br/>)
  }
  }
  if(id==this.props.auth.user._id)
  if(returnedData.length ==0){
    returnedData.push(<div><h1>Not Applied To Projects Yet</h1> <Link push to={"https://hakunamatatasite.herokuapp.com/projects"}> View some projects</Link>
    </div>)
  }
}
if(this.state.Education){
    returnedData.push(<h1 style={{
      textAlign:'center'
    }}>Courses</h1>)
    if(this.state.memberCourses.length>0){
      returnedData.push(<h1>Completed </h1>)
      for(let index=0;index<this.state.memberCourses.length;index=index+3){
      returnedData.push(<CardDeck>{this.getRow(this.state.memberCourses,index,'course')}</CardDeck>)
    }
    }
    if(this.state.memberCoursesAcceptedIn.length>0){
      returnedData.push(<h1>Accepted</h1>)
      for(let index=0;index<this.state.memberCoursesAcceptedIn.length;index=index+3){
      returnedData.push(<CardDeck>{this.getRow(this.state.memberCoursesAcceptedIn,index,'course')}</CardDeck>)
    }
    }
    
    if(this.state.memberCoursesAppliedIn.length>0){
      returnedData.push(<h1>Applied</h1>)
      for(let index=0;index<this.state.memberCoursesAppliedIn.length;index=index+3){
      returnedData.push(<CardDeck>{this.getRow(this.state.memberCoursesAppliedIn,index,'course')}</CardDeck>)
      returnedData.push(<br/>)
    }
    }
    returnedData.push(<h1 style={{
      textAlign:'center'
    }}>Master Class</h1>)
    if(this.state.memberMasterClassesAcceptedIn.length>0){
      returnedData.push(<h1>Accepted</h1>)
      for(let index=0;index<this.state.memberMasterClassesAcceptedIn.length;index=index+3){
      returnedData.push(<CardDeck>{this.getRow(this.state.memberMasterClassesAcceptedIn,index,'masterClasse')}</CardDeck>)
    }
    }
    
    if(this.state.memberMasterClassesAppliedIn.length>0){
      returnedData.push(<h1>Applied</h1>)
      for(let index=0;index<this.state.memberMasterClassesAppliedIn.length;index=index+3){
      returnedData.push(<CardDeck>{this.getRow(this.state.memberMasterClassesAppliedIn,index,'masterClasse')}</CardDeck>)
      returnedData.push(<br/>)
    }
    }

}

if( this.state.Info){
    returnedData.push(<Card.Header style={{
      fontSize: "30px"
    }}>General Information </Card.Header>)
 if(this.state.memberFullName!=''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Full Name</b> {this.state.memberFullName} </Card.Text> )
    returnedData.push( <br></br>)
  }
  if(this.state.memberWebName!=''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>E Name</b> {this.state.memberWebName} </Card.Text> )
    returnedData.push( <br></br>)
  }
  if(this.state.memberLocation!=''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Location</b> {this.state.memberLocation} </Card.Text> )
    returnedData.push( <br></br>)
  }
  if(this.state.memberPhoneNumber!=''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Phone Number</b> {this.state.memberPhoneNumber} </Card.Text> )

    returnedData.push( <br></br>)
  }
  if(this.state.experienceLevel!=''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Experience Level</b> {this.state.experienceLevel} </Card.Text> )

    returnedData.push( <br></br>)
  }
  if(this.state.memberRating!=''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Tasks Rating</b> {this.state.memberRating} </Card.Text> )

    returnedData.push( <br></br>)
  }
  if(this.state.allRatedTasks.length>0){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Rated Tasks</b> {this.getData(this.state.allRatedTasks)} </Card.Text> )

    returnedData.push( <br></br>)
  }
  if(this.state.averageRecoRate!=''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Recommendation Rating</b> {this.state.averageRecoRate} </Card.Text> )

    returnedData.push( <br></br>)
  }
  if(this.state.allRatedReco.length>0){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Rated Recommendation</b> {this.getData(this.state.allRatedReco)} </Card.Text> )
    returnedData.push( <br></br>)
  }
  if(this.state.memberHirePerHour!=''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Hire Per Hour</b> {this.state.memberHirePerHour} </Card.Text> )

    returnedData.push( <br></br>)
  }
  if(this.state.memberCertificates.length>0){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b> Certificates </b> {this.getLink(this.state.memberCertificates,'certificate')} </Card.Text> )

    returnedData.push( <br></br>)
  }
  if(this.state.memberEvents.length>0){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b> Events </b> {this.getLink(this.state.memberEvents,'event')} </Card.Text> )

    returnedData.push( <br></br>)
  }
  if(this.state.memberWorksIn.length>0){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b> Works In </b> {this.getLink(this.state.memberWorksIn,'user')}  </Card.Text> )
    returnedData.push( <br></br>)
  }
  //   if(this.state.memberDateJoined.length!=0){
  //   returnedData.push( <Card.Text style={{
  //     fontSize: "20px"     
  //   }}> <b>Join Date</b>  {this.state.memberDateJoined} </Card.Text> )
  //   returnedData.push( <br></br>)
  // }


}}

if(this.state.currTag ==='Partner'){
//   returnedData.push(<Link to={`/updatedPartner/${id}`} style={{ color: "black" }}>
//   update
//  </Link>)
  if(this.state.PartnerInfo){
    returnedData.push(<Card.Header style={{
      fontSize: "30px"
    }}>General Information </Card.Header>)
 if(this.state.partnerName!==''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Full Name</b> {this.state.partnerName} </Card.Text> )
    returnedData.push( <br></br>)
  }
  if(this.state.partnerPhoneNumber!==''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Phone number</b> {this.state.partnerPhoneNumber} </Card.Text> )
    returnedData.push( <br></br>)
  }
  if(this.state.partnerLocation!==''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Location</b> {this.state.partnerLocation} </Card.Text> )
    returnedData.push( <br></br>)
  }
  if(this.state.partnerPartners!==''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>partners</b> {this.state.partnerPartners} </Card.Text> )

    returnedData.push( <br></br>)
  }
  if(this.state.fieldOfWork.length>0){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Field of work</b> {this.state.fieldOfWork} </Card.Text> )

    returnedData.push( <br></br>)
  }
  if(this.state.feedbackForm.length>0){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Feedback</b> {this.state.feedbackForm} </Card.Text> )

    returnedData.push( <br></br>)
  }



}


    if( this.state.PartnerTasks){
      if(id==this.props.auth.user._id)
      returnedData.push(<Button style={{ float: 'right',
      marginLeft: "-50%",
 
      marginRight: "1em"}} variant="info" onClick={()=>this.setState({ modalShowTask: true })}>Create Task</Button>)

      if(this.state.partnerTasks.length>0){
        returnedData.push(<h1>Tasks</h1>)
        for(let index=0;index<this.state.partnerTasks.length;index=index+3){
        returnedData.push(<CardDeck>{this.getRow(this.state.partnerTasks,index,'task')}</CardDeck>)
      }
      }else{
        if(returnedData.length ==0){
          returnedData.push(<div><h1>Not Created  Tasks Yet</h1> 
          </div>)
        }
      }
    }
    if( this.state.PartnerProjects){
      if(id==this.props.auth.user._id)
      returnedData.push(<Button style={{ float: 'right',
        marginLeft: "-50%",
    
        marginRight: "1em"}} variant="info" onClick={()=>this.setState({ modalShowProject: true })}>Create Project</Button>)

      if(this.state.partnerProjects.length>0){
        returnedData.push(<h1>Projects</h1>)
        for(let index=0;index<this.state.partnerProjects.length;index=index+3){
        returnedData.push(<CardDeck>{this.getRow(this.state.partnerProjects,index,'task')}</CardDeck>)
      }
      }else{
        if(returnedData.length ==0){
          returnedData.push(<div><h1>Not Created  Projects Yet</h1> 
          </div>)
        }
      }
    }
    
}
if(this.state.currTag==='EducationOrganization'){

  if(this.state.EducationInfo){
    returnedData.push(<Card.Header style={{
      fontSize: "30px"
    }}>General Information </Card.Header>)
 if(this.state.educationOrganizationName!==''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b> Name</b> {this.state.educationOrganizationName} </Card.Text> )
    returnedData.push( <br></br>)
  }
  if(this.state.educationOrganizationPhoneNumber!==''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Phone number</b> {this.state.educationOrganizationPhoneNumber} </Card.Text> )
    returnedData.push( <br></br>)
  }
  if(this.state.educationOrganizationLocation!==''){
    returnedData.push( <Card.Text style={{
      fontSize: "20px"
    }}> <b>Location</b> {this.state.educationOrganizationLocation} </Card.Text> )
    returnedData.push( <br></br>)
  } 
}
// if(this.state.Certificates){
//     if(this.state.educationOrganizationCertificates.length>0){
//       returnedData.push(<h1>Projects</h1>)
//       for(let index=0;index<this.state.educationOrganizationCertificates.length;index=index+3){
//       returnedData.push(<CardDeck>{this.getRow(this.state.educationOrganizationCertificates,index,'project')}</CardDeck>)
//     }
//     }}

if(this.state.Courses){
  if(id==this.props.auth.user._id)
  returnedData.push(<Button style={{ float: 'right',
  marginLeft: "-50%",
  marginRight: "1em"}} variant="info" onClick={()=>this.setState({ modalShowCourse: true })}>Create Course</Button>)

  if(this.state.educationOrganizationCourses.length>0){
    returnedData.push(<h1>Course</h1>)
    for(let index=0;index<this.state.educationOrganizationCourses.length;index=index+3){
    returnedData.push(<CardDeck>{this.getRow(this.state.educationOrganizationCourses,index,'course')}</CardDeck>)
  }
  }}

if(this.state.Educators){

  

  if(this.state.educationOrganizationEducators.length>0){
    returnedData.push(<h1>Educator</h1>)
    for(let index=0;index<this.state.educationOrganizationEducators.length;index=index+3){
    returnedData.push(<CardDeck>{this.getRow(this.state.educationOrganizationEducators,index,'educator')}</CardDeck>)
  }
  }}
if(this.state.MasterClasses){
  if(id==this.props.auth.user._id)
  returnedData.push(<Button style={{ float: 'right',
  marginLeft: "-50%",

  marginRight: "1em"}} variant="info" onClick={()=>this.setState({ modalShowMasterclass: true })}>Create Masterclass</Button>)

  if(this.state.educationOrganizationMasterClasses.length>0){
    returnedData.push(<h1> Master Classes </h1>)
    for(let index=0;index<this.state.educationOrganizationMasterClasses.length;index=index+3){
    returnedData.push(<CardDeck>{this.getRow(this.state.educationOrganizationMasterClasses,index,'masterClasse')}</CardDeck>)
  }
  }}
if(this.state.TrainingPrograms){
  if(id==this.props.auth.user._id)

  if(this.state.educationOrganizationTrainingPrograms.length>0){
    returnedData.push(<h1>Training Programs</h1>)
    for(let index=0;index<this.state.educationOrganizationTrainingPrograms.length;index=index+3){
    returnedData.push(<CardDeck>{this.getRow(this.state.educationOrganizationTrainingPrograms,index,'trainingProgram')}</CardDeck>)
  }
  }}
}
if(this.state.currTag==='CoworkingSpace'){
//   returnedData.push( <Link to={`/updatedCo/${id}`} style={{ color: "black" }}>
//   update
//  </Link>)
  if(this.state.CoworkingSpaceInfo){
    returnedData.push(<Card.Header style={{
      fontSize: "30px"
    }}>General Information </Card.Header>)
    if(this.state.coworkingSpaceName!==''){
      returnedData.push( <Card.Text style={{
        fontSize: "20px"
      }}> <b>Name</b> {this.state.coworkingSpaceName} </Card.Text> )
      returnedData.push( <br></br>)
    } 
    if(this.state.coworkingSpacePhoneNumber!==''){
      returnedData.push( <Card.Text style={{
        fontSize: "20px"
      }}> <b>Phone number</b> {this.state.coworkingSpacePhoneNumber} </Card.Text> )
      returnedData.push( <br></br>)
    } 
    if(this.state.coworkingSpaceLocation!==''){
      returnedData.push( <Card.Text style={{
        fontSize: "20px"
      }}> <b>Location</b> {this.state.coworkingSpaceLocation} </Card.Text> )
      returnedData.push( <br></br>)
    } 
    if(this.state.coworkingSpaceFacilites!==''){
      returnedData.push( <Card.Text style={{
        fontSize: "20px"
      }}> <b>Facilites</b> {this.state.coworkingSpaceFacilites} </Card.Text> )
      returnedData.push( <br></br>)
    } 
    if(this.state.coworkingSpaceMaxNoRooms!==''){
      returnedData.push( <Card.Text style={{
        fontSize: "20px"
      }}> <b>Number of rooms</b> {this.state.coworkingSpaceMaxNoRooms} </Card.Text> )
      returnedData.push( <br></br>)
    } 
  }
  if(this.state.Rooms){
    if(id==this.props.auth.user._id)
    returnedData.push(<Link to={`/createRoom/${id}` }><Button>Add Room</Button></Link>)
  if(this.state.coworkingSpaceRooms.length>0){
    
    returnedData.push(<h1>Rooms</h1>)
    for(let index=0;index<this.state.coworkingSpaceRooms.length;index=index+3){
    returnedData.push(<CardDeck>{this.getRowRoom(this.state.coworkingSpaceRooms,index,'room')}</CardDeck>)
  }
  }
}
}

if(this.state.currTag==='ConsultancyAgency'){
  if(this.state.consultancyAgencyInfo){
      if(this.state.consultancyAgencyName!==''){
        returnedData.push( <Card.Text style={{
          fontSize: "20px"
        }}> <b>Name</b> {this.state.consultancyAgencyName} </Card.Text> )
        returnedData.push( <br></br>)
      } 
      if(this.state.consultancyAgencyPhoneNumber!==''){
        returnedData.push( <Card.Text style={{
          fontSize: "20px"
        }}> <b>Phone number</b> {this.state.consultancyAgencyPhoneNumber} </Card.Text> )
        returnedData.push( <br></br>)
      } 
      if(this.state.consultancyAgencyLocation!==''){
        returnedData.push( <Card.Text style={{
          fontSize: "20px"
        }}> <b>Location</b> {this.state.consultancyAgencyLocation} </Card.Text> )
        returnedData.push( <br></br>)
      } 
    }
    if(this.state.consultancyAgencyProject){
      if(this.state.consultancyAgencyAcceptedInPorjects.length>0){
        returnedData.push(<h1>Accepted</h1>)
        for(let index=0;index<this.state.consultancyAgencyAcceptedInPorjects.length;index=index+3){
        returnedData.push(<CardDeck>{this.getRow(this.state.consultancyAgencyAcceptedInPorjects,index,'project')}</CardDeck>)
      }
      }
      if(this.state.consultancyAgencyAppliedInPorjects.length>0){
        returnedData.push(<h1>Applied</h1>)
        for(let index=0;index<this.state.consultancyAgencyAppliedInPorjects.length;index=index+3){
        returnedData.push(<CardDeck>{this.getRow(this.state.consultancyAgencyAppliedInPorjects,index,'project')}</CardDeck>)
        returnedData.push(<br/>)
      }
      }
      }
      if(this.state.condultancyAgencyTask){
          if(this.state.consultancyAgencyAcceptedInTasks.length>0){
            returnedData.push(<h1>Accepted</h1>)
            for(let index=0;index<this.state.consultancyAgencyAcceptedInTasks.length;index=index+3){
            returnedData.push(<CardDeck>{this.getRow(this.state.consultancyAgencyAcceptedInTasks,index,'task')}</CardDeck>)
          }
          }
          if(this.state.consultancyAgencyAppliedInTasks.length>0){
            returnedData.push(<h1>Applied</h1>)
            for(let index=0;index<this.state.consultancyAgencyAppliedInTasks.length;index=index+3){
            returnedData.push(<CardDeck>{this.getRow(this.state.consultancyAgencyAppliedInTasks,index,'task')}</CardDeck>)
            returnedData.push(<br/>)
          }
          }
          }  
  }

  



return returnedData;
}
getTimeline(){
  var shownData = [];
 
  if (this.state.loaded) {
    this.state.posts.map(post => {
      // console.log(post)

      shownData.unshift(
        <PlatformCard 
          displayedName={this.state.memberFullName}
          date={post.date}
          tag={ 'Post'}
          description={post.name}
          ownerId={this.state.id}
          objectId={post.id}
          tagColor='dark'
        

        />
      )
    });
    this.state.courseRequests.map(post => {
      // console.log(post)

      shownData.unshift(
        <PlatformCard 
        displayedName={this.state.memberFullName}
        date={post.date}
        tag={ 'CourseRequest'}
        description={post.name}
        ownerId={this.state.id}
        objectId={post.id}
        tagColor='dark'
        masterclasses={this.state.masterclasses }


        />
        
      )
        
    });
    let arr=[]
    this.state.consultancyAgencyReports.map(post => {
      shownData.push(
        <PlatformCard 
        displayedName={this.state.consultancyAgencyName}
        date={post.postDate}
        tag={ 'Report'}
        description={post.info}
        ownerId={this.state.id}
        tagColor='dark'


        />
        
      )
     
    });
    if(this.props.auth.user._id==this.props.match.params.id)
    shownData.unshift( <PostCard/>)
    return shownData;
  } else {
    return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>;
  }
}
getButtonActions(){
  let returnedData=[]

if(this.state.currTag ==='Member'){
    returnedData.push(
  <Button onClick={this.handleClickInfo} type="submit" variant='light' size='lg' style={{
    marginRight:'10px',
    width:'200px'
 }}  >
 <div style={{color:"#17a2b8"}}><b>Timeline</b></div></Button>)
 returnedData.push(
 <Button onClick={this.handleClickTask} type="submit" variant='light' size='lg' style={{
    marginRight:'10px',
    width:'200px'
 }} >
 <div style={{color:"#17a2b8"}}><b>Task</b></div></Button>)
 returnedData.push(
 <Button onClick={this.handleClickProject} type="submit" variant='light' size='lg' style={{
    marginRight:'10px',
    width:'200px'
 }} >
 <div style={{color:"#17a2b8"}}><b>Project</b></div></Button>)
 returnedData.push(
 <Button onClick={this.handleClickEducation} type="submit" variant='light' size='lg'style={{
    marginRight:'10px',
    width:'200px'
 }} >
 <div style={{color:"#17a2b8"}}><b>Education</b></div></Button>)

}
if(this.state.currTag ==='ConsultancyAgency'){
  returnedData.push(
<Button onClick={this.handleClickCAInfo} type="submit" variant='light' size='lg' style={{
  marginRight:'10px',
  width:'200px'
}}  >
<div style={{color:"#17a2b8"}}><b>Timeline</b></div></Button>)
returnedData.push(
<Button onClick={this.handleClickCATask} type="submit" variant='light' size='lg' style={{
  marginRight:'10px',
  width:'200px'
}} >
<div style={{color:"#17a2b8"}}><b>Task</b></div></Button>)
returnedData.push(
<Button onClick={this.handleClickCAProject} type="submit" variant='light' size='lg' style={{
  marginRight:'10px',
  width:'200px'
}} >
<div style={{color:"#17a2b8"}}><b>Project</b></div></Button>)
}
if(this.state.currTag==='CoworkingSpace'){
  returnedData.push(
    <Button onClick={this.handleClickCoWorkingSpaceInfo} type="submit" variant='light' size='lg' style={{
      marginRight:'10px',
      width:'200px'
   }}  >
  <div style={{color:"#17a2b8"}}><b>Timeline</b></div></Button>)
   returnedData.push(
    <Button onClick={this.handleClickRoom} type="submit" variant='light' size='lg' style={{
      marginRight:'10px',
      width:'200px'
   }}><div style={{color:"#17a2b8"}}><b>Room</b></div></Button>)

}


if(this.state.currTag ==='Partner'){
  returnedData.push(
<Button onClick={this.handleClickPartnerInfo} type="submit" variant='light' size='lg' style={{
  marginRight:'10px',
  width:'200px'
}}  >
<div style={{color:"#17a2b8"}}><b>Timeline</b></div></Button>)
returnedData.push(
<Button onClick={this.handleClickPartnerTasks} type="submit" variant='light' size='lg' style={{
  marginRight:'10px',
  width:'200px'
}} >
<div style={{color:"#17a2b8"}}><b>Task</b></div></Button>)
returnedData.push(
<Button onClick={this.handleClickPartnerProjects} type="submit" variant='light' size='lg' style={{
  marginRight:'10px',
  width:'200px'
}} >
<div style={{color:"#17a2b8"}}><b>Project</b></div></Button>)

}
if(this.state.currTag ==='EducationOrganization'){
  returnedData.push(
<Button onClick={this.handleClickEducationInfo} type="submit" variant='light' size='lg' style={{
  marginRight:'10px',
  width:'200px'
}}  >
<div style={{color:"#17a2b8"}}><b>Timeline</b></div></Button>)
// returnedData.push(
// <Button onClick={this.handleClickCertificates} type="submit" variant='light' size='lg' style={{
//   marginRight:'10px',
//   width:'200px'
// }} >Cerificate</Button>)
returnedData.push(
<Button onClick={this.handleClickMasterClasses} type="submit" variant='light' size='lg' style={{
  marginRight:'10px',
  width:'200px'
}} >
<div style={{color:"#17a2b8"}}><b>Master classes</b></div></Button>)
 returnedData.push(
<Button onClick={this.handleClickTrainingPrograms} type="submit" variant='light' size='lg'style={{
  marginRight:'10px',
  width:'200px'
}} >
<div style={{color:"#17a2b8"}}><b>Training Program</b></div></Button>)
  returnedData.push(
  <Button onClick={this.handleClickCourses} type="submit" variant='light' size='lg'style={{
    marginRight:'10px',
    width:'200px'
  }} >
  <div style={{color:"#17a2b8"}}><b>Courses</b></div></Button>)



}
returnedData.push(   <DropdownButton   variant='dark' size='lg' title="Switch" > {this.setTags()} </DropdownButton>)
return returnedData

}
beMember(){
  this.setState({currTag: 'Member'})
}
bePartner(){
  this.setState({currTag: 'Partner'})
}
beCA(){
  this.setState({currTag: 'ConsultancyAgency'})
}
beEOrg(){
  this.setState({currTag: 'EducationOrganization'})
}
beCoSpace(){
  this.setState({currTag: 'CoworkingSpace'})
}

setTags(){
  let returnedData=[]
  console.log(this.state.tags)
  if(this.state.tags.includes('Member')) returnedData.push( <Dropdown.Item as="Button" onClick={this.beMember}>Member</Dropdown.Item>)
  if(this.state.tags.includes('Partner')) returnedData.push(<Dropdown.Item as="Button" onClick={this.bePartner}>Partner</Dropdown.Item>  )
  if(this.state.tags.includes('ConsultancyAgency')) returnedData.push( <Dropdown.Item as="Button" onClick={this.beCA}>Consultancy Agency</Dropdown.Item>)
  if(this.state.tags.includes('EducationOrganization')) returnedData.push(<Dropdown.Item as="Button" onClick={this.beEOrg}>EducationOrganization</Dropdown.Item>  )
  if(this.state.tags.includes('CoworkingSpace')) returnedData.push(<Dropdown.Item as="Button" onClick={this.beCoSpace}>Coworking Space</Dropdown.Item>  )
return returnedData
}
getProfile=()=>{
 
  if((this.state.Info&& this.state.currTag =='Member') || (this.state.PartnerInfo&&this.state.currTag =='Partner')||(this.state.EducationInfo&&this.state.currTag =='EducationOrganization')||(this.state.CoworkingSpaceInfo&&this.state.currTag =='CoworkingSpace')||(this.state.consultancyAgencyInfo&&this.state.currTag =='ConsultancyAgency')){
 return(
  <Container style={{margin:70 ,marginTop:20}}>
  <Row>
   <Container style={{margin:0 ,width:'40%'}}>
    <Card style={{backgroundColor:'white'}}> 
      <div style={{padding:7}}>
{this.showData()} </div></Card>
</Container>
<Container style={{margin:0 ,width:'60%'}}>

    <Card style={{backgroundColor: "#2e2e2e" ,border:'none'}} >
{this.getTimeline()}</Card>

</Container>
</Row>
</Container>
 )
  }else{
 return(
    <Card style={{backgroundColor:'white' ,minHeight:'30hv',    height: "100%"  }}> 
      <div style={{padding:7}}>
{this.showData()} </div></Card>

 )
  }
}

  render() {
    let profileName = (this.state.profileName==''|| this.state.profileName== undefined ||this.state.profileName==null)? "Abdelrahman Badr":this.state.profileName;
    let modalClose = () => this.setState({ modalShowTask: false });
    let modalCloseProject = () => this.setState({ modalShowProject: false });
    let modalCloseMasterclass = () => this.setState({ modalShowMasterclass: false });
    let modalCloseCourse = () => this.setState({ modalShowCourse: false });
    
    return (
      <div>
        <div style={{ backgroundImage:`url(${cover})` ,marginBottom:0}}>
  <Media>
      <div className="mr-3" style={{ width:'100%', height:490}}></div>
    </Media>
    <Container style={{
  zIndex: 1 /* integer */}}>
    <Row>
    <Col xs={6} md={5}>
    </Col>
    <Col xs={6} md={4}>
      <Image    height={120}    src={ImageSrc} alt="Card image"  roundedCircle />
    </Col>
    </Row>
    <Container style={{textAlign:'center' ,border:'none'}}>
     <h3 style={{color:'white'}}>{profileName}</h3>
    
    </Container>

    </Container>
</div>
<Card style={{backgroundColor: "#2e2e2e",marginTop:0}}>
{/* <Card.Img src={cover} alt="Card image" /> */}
<Card  style={{marginLeft:60,marginTop:20,backgroundColor: "#2e2e2e" ,border:'none'}}>
    <ButtonGroup variant="tabs" defaultActiveKey="#first"  >
{ this.getButtonActions() }    
    </ButtonGroup>
  </Card>
  <Card.Body>
    {this.getProfile()}
  </Card.Body>
  <Chat   senderID={this.props.auth.user._id} recieverId={this.state.id}/>
</Card>
<Modal animation onHide={modalClose} show={this.state.modalShowTask} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                        <Modal.Header closeButton='true'>
                            <Modal.Title id="contained-modal-title-vcenter">
                                New Task
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TaskForm />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={modalClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal animation onHide={modalCloseProject} show={this.state.modalShowProject} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                        <Modal.Header closeButton='true'>
                            <Modal.Title id="contained-modal-title-vcenter">
                                New Project
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProjectForm />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={modalCloseProject}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal animation onHide={modalCloseMasterclass} show={this.state.modalShowMasterclass} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                        <Modal.Header closeButton='true'>
                            <Modal.Title id="contained-modal-title-vcenter">
                                New Masterclass
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <MasterClassForm />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={modalCloseMasterclass}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal animation onHide={modalCloseCourse} show={this.state.modalShowCourse} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                        <Modal.Header closeButton='true'>
                            <Modal.Title id="contained-modal-title-vcenter">
                                New Course
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CourseForm />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={modalCloseCourse}>Close</Button>
                        </Modal.Footer>
                    </Modal>
</div>
    );
  }
}
const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToProps,{})(MemberProfile);
// export default ;
