import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
const Viewfeedback=()=>
{
   const[feedbackData, setfeedbackData ] = useState([]);
          useEffect(() => {
              const getService = async() => {
                  try{
                      const response = await axios.get('http://localhost:4000/Viewfeedbackprovider');
                      console.log('feedbackview',response.data.data)
                      setfeedbackData(response.data.data);
                  }
                  catch(error){
                      console.error(error);
                  }
              };
              getService();
          }, []); 
  return(<>
  <Header/>
  <form id="form1" name="form1" method="post" action="">
  <table width="200" border="1">
    <tr>
      <th scope="col">#</th>
      <th scope="col">FEED-BACK</th>
      <th scope="col">DATE</th>
      <th scope="col">NAME</th>
      <th scope="col">POST</th>
      <th scope="col">ORG</th>
      <th scope="col">EMAIL</th>
      <th scope="col">PHONE</th>
      <th scope="col">PHOTO</th>
    </tr>
      {
      feedbackData.map((feedback,index)=>( <tr>
      <td>&nbsp;{index+1}</td>
      <td>&nbsp;{feedback.feed_back}</td>
      <td>&nbsp;{feedback.date}</td>
      <td>&nbsp;{feedback.pdata.name}</td>
      <td>&nbsp;{feedback.pdata.position}</td>
      <td>&nbsp;{feedback.pdata.organisation}</td>
      <td>&nbsp;{feedback.pdata.email}</td>
      <td>&nbsp;{feedback.pdata.phone}</td>
      <td>&nbsp;{feedback.pdata.profile_photo}</td>
    </tr>))
    }
  </table>
</form>
<Footer/>
  </>);
}

export default Viewfeedback;



