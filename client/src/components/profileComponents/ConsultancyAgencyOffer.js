import React, { Component } from 'react'

export class ConsultancyAgencyOffer extends Component {
    getStyle = () =>{
        return{
            background : '#242424',
            pading : '10px',
             testAlign:'left'
        }
          }
           
            render() {
            return (
              <div style={this.getStyle()}>
                <p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{this.props.offer}
                
                </p>
               
              </div>
            )
          }
        }
        


export default ConsultancyAgencyOffer