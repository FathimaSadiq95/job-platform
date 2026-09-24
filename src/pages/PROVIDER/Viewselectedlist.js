import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
const Viewselectedlist=()=>
{
  const[seekerData, setseekerData ] = useState([]);
    useEffect(() => {
        const getService = async() => {
            try{
                const response = await axios.get('http://localhost:4000/Viewseeker');
                console.log('hujhhjhjhjh',response.data)
                setseekerData(response.data.data);
            }
            catch(error){
                console.error(error);
            }
        };
        getService();
    }, []);
   return(
  <>
  <Header/>
  <form id="form1" name="form1" method="post" action="">
  <table width="200" border="1">
    <tr>
      <th scope="col">#</th>
      <th scope="col">NAME</th>
      <th scope="col">DOB</th>
      <th scope="col">CV</th>
      <th scope="col">PHOTO</th>
      <th scope="col">LINK</th>
      <th scope="col">ABOUT</th>
      <th scope="col">EMAIL</th>
      <th scope="col">PHONE</th>
      <th scope="col">DATE</th>
      
    </tr>
    {
      seekerData.map((seeker, index) => ( 
      <tr>
      <td>&nbsp;{index+1}</td>
      <td>&nbsp;{seeker.name}</td>
      <td>&nbsp;{seeker.dateofbirth}</td>
      <td>&nbsp;{seeker.cv}</td>
      <td>&nbsp;{seeker.profilephoto}</td>
      <td>&nbsp;{seeker.link}</td>
      <td>&nbsp;{seeker.aboutyou}</td>
      <td>&nbsp;{seeker.email}</td>
      <td>&nbsp;{seeker.phone}</td>
      <td>&nbsp;{seeker.date}</td>
      
    </tr>))
    }
  </table>
</form>
<Footer/>
  </>
 ); 
}

export default Viewselectedlist;




