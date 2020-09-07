import React,{Component} from 'react'
import thankloop from '../assets/thankloop-white-logo.svg'
import rightarrow from '../assets/right-arrow.png'
import 'swiper/swiper-bundle.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Swiper, { Navigation, Pagination } from 'swiper';
import fire from '../assets/fire.jpg'
// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

// init Swiper:

export default class Swipper extends Component{
 
render(){

   
  return(
   
	
		<div className="card">
			<div className="left">
			<div className="ava"><img src={fire}/></div>
				<h1 className="name">	Nick Canon</h1>
        
				<span className="status">Firefighter</span>
  
			</div>
			<div className="right">
			<span className="descr">
				Nick is a firefighter and has started a new initiative for young boys and girls to come visit the fire station every week to teach how to protect themselves and their family.
				</span>
				<button className="follow_btn">
				<img src={thankloop} alt="Place Holder" />
				
				<span>Thank Nick</span>
				</button>
				
			</div>
			<button className="next">
			<img src={rightarrow}/>
		
				</button>
		</div>


   
  )
}
}