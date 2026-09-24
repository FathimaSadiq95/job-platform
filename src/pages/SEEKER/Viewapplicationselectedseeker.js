import { useState,useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const Viewapplicationselectedseeker=()=>
{
  const[applicationData, setapplicationData ] = useState([]);
              useEffect(() => {
                  const getService = async() => {
                      try{
                        const seekerId = localStorage.getItem('uid');
                        if (!seekerId) {
                          setapplicationData([]);
                          return;
                        }

                        const response = await axios.get(`http://localhost:4000/Viewapplicationseeker/${seekerId}`);
                          console.log('application',response.data.data)
                          setapplicationData(response.data.data);
                      }
                      catch(error){
                          console.error(error);
                      }
                  };
                  getService();
              }, []); 
  return(<>
  <Header/>
  <form id="next" name="form1" method="post" action="">
  <table width="200" border="1">
    <tr>
      <th scope="col">#</th>
      <th scope="col">post</th>
      <th scope="col">about</th>
      <th scope="col">requirements</th>
      <th scope="col">name</th>
      <th scope="col">organization</th>
      <th scope="col">images</th>
      <th scope="col">LOCATION</th>
      <th scope="col">WEBSITE</th>
      <th scope="col">email</th>
      <th scope="col">phone</th>
      <th scope="col">salary</th>
      
    </tr>
    {
      applicationData.map((application,index)=>(
      <tr>
      <td>&nbsp;{index+1}</td>
      <td>&nbsp;{application.jobdata.post}</td>
      <td>&nbsp;{application.jobdata.about}</td>
      <td>&nbsp;{application.jobdata.requirements}</td>
      <td>&nbsp;{application.pdata.name}</td>
      <td>&nbsp;{application.pdata.organisation}</td>
      <td>&nbsp;{application.pdata.images}</td>
      <td>&nbsp;{application.pdata.location}</td>
      <td>&nbsp;{application.pdata.website}</td>
      <td>&nbsp;{application.pdata.email}</td>
      <td>&nbsp;{application.pdata.phone}</td>
      <td>&nbsp;{application.jobdata.salary}</td>
    </tr>
))}
  </table>
</form>
<Footer/>
  </>);
}

export default Viewapplicationselectedseeker;



