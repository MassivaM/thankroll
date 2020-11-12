import React,{Component} from 'react'
import thankloop from '../assets/thankloop-white-logo.svg'
import rightarrow from '../assets/right-arrow.png'
import 'swiper/swiper-bundle.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Swiper, { Navigation, Pagination } from 'swiper';
import fire from '../assets/fire.jpg'
import profiles from '../assets/data/profiles/profiles.js'
// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

// init Swiper:

export default class Swipper extends React.Component{
 
	constructor(props){
		super(props)
		this.state={
			name:"",
			firstName:"",
			profession:"",
			image:"fire.jpg",
			description: "",
			email:""
		};
	}
componentDidMount(){
	var value= Math.random(profiles.length - 1)
	var position = Math.round(value)
	var positionarray = []
	positionarray.push(position)
	this.setState({name: profiles[position].name, firstName: profiles[position].firstName, profession: profiles[position].profession, description: profiles[position].description, image : profiles[position].image})
}
setList(){
	var listprofiles = []
	for(var i =0; i<profiles.length; i++){
		listprofiles.push(profiles[i])
	}
	
}
changeProfile(){
	
}
render(){

   
  return(
   
	
		<div className="card">
			<div className="left">
			<div className="ava"><img src={require('../assets/'+this.state.image)}/></div>
				<h1 className="name">	{this.state.name}</h1>
        
				<span className="status">{this.state.profession}</span>
  
			</div>
			<div className="right">
			<span className="descr">
				{this.state.description}
				</span>
				<button className="follow_btn">
				<img src={thankloop} alt="Place Holder" />
				
				<span>Thank {this.state.firstName}</span>
				</button>
				
			</div>
			<button className="next">
			<img src={rightarrow}/>
		
				</button>
		</div>


   
  )
}
}