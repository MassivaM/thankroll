import React , {Component, useState} from 'react'
import title from '../assets/thankloop-title.svg'

import titlelogo from '../assets/thankloop-white-logo.svg'
import Intro from '../components/Intro.js'


import Person from '../components/Person.js';
import data from '../data.json';

export default class Home extends Component {

  
   render(){
        return (

          <body>
           
          <Intro visible={this.visible}/>
          
       
            
          </body>
          )

  
    

}
}
