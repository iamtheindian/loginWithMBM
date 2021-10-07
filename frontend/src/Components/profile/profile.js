import React, { Component } from "react";
import "./profile.css";
import APIManager from '../../APIManager';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name : '',
        email: '',
        roll_no: null,
        phone_no: null
      }
     
    }
  }
  
  componentDidMount = () => {
    const roll_no = localStorage.getItem('roll_no');
    if(!roll_no) {
      this.props.history.push('/login')
    }
    APIManager.getProfile(roll_no).then((resp) => {
      const data = resp.data.data
      this.setState({
        data
      })
    })
  }

  logout = () => {
    localStorage.clear();
    this.props.history.push('/login')
  }

  render() {
    const {name, email, roll_no, phone_no} = this.state;
    return (
      <section className="wrapper">
        <div className="main-content">
          <h1 id="profile_title">PROFILE</h1>
          <div className="profile_pic"></div>
          <p className="profile_name">
            <b className="bolds">{name}</b>
          </p>
          <div id="profile_content">
            <ul>
              <p className="profile_details">
                <b className="bolds">E-mail : </b>{email}
              </p>
            </ul>
            <ul>
              <p className="profile_details">
                <b className="bolds">Roll Number : </b>{roll_no}
              </p>
            </ul>
            <ul>
              <p className="profile_details">
                <b className="bolds">Phone Number : </b>{phone_no}
              </p>
            </ul>
          </div>
        </div>
        <button onClick={this.logout}>Logout</button>
      </section>
    );
  }
}

export default Profile;
