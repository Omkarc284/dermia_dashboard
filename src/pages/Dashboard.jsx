import React from 'react'
import axios from 'axios'
import "./Dashboard.css"
import {useNavigate} from 'react-router-dom'


const Dashboard = () => {
 
  const [token, setToken] = React.useState(JSON.parse(window.sessionStorage.getItem('token')))
  const [username,setUsername] = React.useState(JSON.parse( window.sessionStorage.getItem('username')))
  
  const [date, setDate] = React.useState(new Date())
  const [data, setData] = React.useState([])
  // if(!token){
  //   {return <Login setToken={setToken}/>}
  // }
  React.useEffect(() => {
    let isMount = true;
    axios.post('http://localhost:3120/appointments/by_date', {date}).then((response)=>{
      setData(response.data.appointments);
      
    }) 
    
    return () => {
      isMount = false;
    };
  }, [date]);
  const navigate = useNavigate()
  const getDateDefault = () => {
    const d = new Date(date)
    return d.toISOString().split("T")[0]
  }
  const handleDelete = async(item, i) =>{

    if (confirm(` Delete appointment for ${item.patient.name} - ${item._id} ?`)){
      await axios.delete(`http://localhost:3120/appointments/${item._id}`).then((response)=>{
        if (response.status === 200){
          setData(current =>
            current.filter(appointment => {
              // 👇️ remove object that has id equal to 2
              return appointment._id !== item._id;
            }),
          );
          alert("Appointment Deleted Successfully!")
        }else{
          alert("Couldn't delete Appointment! Try refreshing the page or check network")
        }
      }) 
    }
  }
   
  const handleLogout = async() =>{
    const auth = `Bearer `+ token;
    await axios.post('http://localhost:3120/admin/logout',{},{
      headers: {
          'Authorization': auth,
          'Content-Type': 'application/json'
      }
    }).then(data => {
      window.sessionStorage.removeItem('token');
      setToken();
      navigate(`/`)
    }).catch(err =>{
      console.log(err)
    })
    
  }
  
  return (
    <>
      <div className="container">
        <h1>Appointments</h1>
        <div className="inputDiv">
          <div className="usernameDiv">
            <label>Username: </label>
            <div className='username'>{username}</div>
          </div>
          <div className="rightDiv">
            <div className="dateDiv">
              <label>Select Date:</label>
              <input style={{backgroundColor:"#D9D9D9", border: "None", fontSize: '16px', marginLeft: '12px', textAlign: 'center'}} type="date" name="date" id="date" defaultValue={getDateDefault()} onChange={(e)=>{setDate(e.target.value)}}/>
            </div>
            <div className="logoutDiv">
              <button className='logoutbutton' onClick={() =>{handleLogout()}}>Logout</button>
            </div>
          </div>
          
        </div>
        <div className="rect">
          <table className="table" >
            <thead>
              <tr style={{position:'relative',display:'grid', gridTemplateColumns: '10rem 20rem 10rem 10rem 10rem 10rem', gridAutoFlow:'row', gridGap: '1rem'}}>
                <th scope='col'>NAME</th>
                <th scope='col'>EMAIL</th>
                <th scope='col'>CONTACT</th>
                <th scope='col'>BRANCH</th>
                <th scope='col'>TIME</th>
                <th scope='col'>ACTIONS</th>
              </tr>
            </thead>
            <tbody className="innerRect" style={{position:'relative',display:'grid', gridGap: '1rem', gridAutoRows: 15}} >
            {
              data && data.length > 0 ?
              
              data.map((item, i)=>(
                <tr key={i} style={{position:'relative',display:'grid', gridTemplateColumns: '10rem 20rem 10rem 10rem 10rem 10rem', gridGap: '1rem'}}>
                  <td>{item.patient.name}</td>
                  <td>{item.patient.email}</td>
                  <td>{item.patient.phoneNumber}</td>
                  <td>{item.branch}</td>
                  <td>{item.timeSlot}</td>
                  <td style={{color: 'red', cursor: 'pointer'}} onClick={()=>handleDelete(item , i)}><u>Delete</u></td>
                </tr>
                
              ))
              :
              (
                <tr className='exception'>
                  <td>
                    No appointments for the day!
                  </td>
                  
                </tr>
              )
            }     
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Dashboard