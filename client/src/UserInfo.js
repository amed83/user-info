import React, { Component } from 'react';
import axios from 'axios';
import './userInfo.css'

class UserInfo extends Component{
    
    state={
            name:'',
            email:'',
            phone:'',
            users:[],
            error:false
    }
    componentDidMount(){
        axios.get('/users')
        .then(users=>{
            if(users.data.length>0){
                this.setState({users:users.data})
            }
        })
    }
    
    handleChange(e){
        //check if the user is typing a number
        if(e.target.name==='phone'){
         if(isNaN(e.target.value)){
            this.setState({error:true}) 
           }else {
            this.setState({error:false}) 
          }
        }
     
        this.setState({[e.target.name]:e.target.value})
    }
    
    handleSubmit(e){
        e.preventDefault()
        let data = this.state
        axios.post('/newUser',data)
        .then(()=>axios.get('/users'))
        .then(users=> this.setState({
                        users:users.data,
                        name:'',
                        email:'',
                        phone:''
                        })
                    )
    }
    
    deleteUser(e){
        const id = e.target.id 
        axios.delete(`/deleteUser/${id}`)
        .then(()=>axios.get('/users'))
        .then(users=>this.setState({users:users.data}))
    }
    
    render(){
        let usersList;
        const {users} = this.state
        if(users.length>0){
            usersList=users.map((user,index)=>{
                return(
                    <ul className='userBox'key={index}>
                        <li><b>Name:</b>  {user.name}</li>
                        <li><b>Email:</b> {user.email}</li>
                        <li><b>Phone:</b> {user.phone}</li>
                        <button id={user._id}
                       onClick={this.deleteUser.bind(this)}>Delete User</button>
                    </ul>
                ) 
            })    
        }
        return(
            <div className='usersContainer'>
                <div className='formContainer'>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input 
                            value={this.state.name}
                            onChange={this.handleChange.bind(this)}
                            name='name'
                            placeholder='name' type="text"/>
                        <input
                            value={this.state.email}
                            onChange={this.handleChange.bind(this)}
                            name='email'
                            placeholder='email' type="text"/>
                         <input 
                            value={this.state.phone}
                            onChange={this.handleChange.bind(this)}
                            name='phone'
                            placeholder='phone number' type="text"/>
                        {this.state.error && <p>Please insert a Number!!!!</p>}
                        <button type='submit'> Save</button>
                    </form>
                </div>
                {usersList}
            </div>
            
        )
    }
}

export default UserInfo