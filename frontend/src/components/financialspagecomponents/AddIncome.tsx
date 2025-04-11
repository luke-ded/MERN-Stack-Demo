//import app from "../pages/App.module.css";
//import { useNavigate } from 'react-router-dom';
import {useState} from 'react'


interface ChildProps {
    triggerRerender: () => void;
}

const AddIncome: React.FC<ChildProps> = ({ triggerRerender }) => {

    const [isRecurring, setRecurring] = useState(false);
    const [isButtonClicked, setButton] = useState(false);

    function setYes(){
        setRecurring(true);
        setButton(true);
    }

    function setNo(){
        setRecurring(false);
        setButton(true);
    }

    async function addIncome(event: any): Promise<void>{

        const valAmount = (document.getElementById("IncNum") as HTMLInputElement).value;
        const userName = (document.getElementById("IncNames") as HTMLInputElement).value;
        const date = (document.getElementById("Incdate") as HTMLInputElement).value;
        const alertMessage = document.getElementById("alertmessage");

        if (alertMessage) {
            if (date.length == 0 || userName.length == 0 || valAmount.length == 0 || isButtonClicked == false){
                alertMessage.innerText = "Please Complete all the fields";
                alertMessage.style.visibility = "visible";
                return;
            } 
        }
        
       
        const token = localStorage.getItem('token');

        
        
        const Amount = parseInt(valAmount);
        const IfRecurring = isRecurring;
        const [month, day, year] = date.split("/");
        const InitialTime = {Month: parseInt(month), Day: parseInt(day), Year: parseInt(year)};

        event.preventDefault();
        var obj = {Name: userName, Amount: Amount, IfRecurring: IfRecurring, InitialTime: InitialTime};
        var js = JSON.stringify(obj);

        try {
            const response = await fetch('http://salvagefinancial.xyz:5000/api/AddIncome',
            {method:'POST',body:js,headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}});
            var res = JSON.parse(await response.text());

            
            if (res.Result == "Could not add income"){
                
                if (alertMessage){
                    alertMessage.innerText = "Unsuccesfully Added";
                    alertMessage.style.visibility = "visible";
                }

            } else if (res.Result == "Could not find user to add income"){
                
                if (alertMessage) {
                    alertMessage.innerText = "Unsuccesfully Added";
                    alertMessage.style.visibility = "visible";
                }

            } else if (res.Result == "Added income to user"){

                
                if (alertMessage){
                    alertMessage.innerText = "Succesfully Added";
                    alertMessage.style.visibility = "visible";

                    await updateInfo();
                    triggerRerender();
                }

            } else {

                if (alertMessage) {
                    alertMessage.innerText = "Unsuccesfully Added";
                    alertMessage.style.visibility = "visible";
                }

            }

            

        } catch (error: any){
            alert(error.toString());
            return;
        }
    }

    async function updateInfo() : Promise<void>
      {
        var token = localStorage.getItem('token');

        try
        {
          const response = await fetch('http://salvagefinancial.xyz:5000/api/ShowAllInfo',
          {method:'POST', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}});
          var res = JSON.parse(await response.text());
          if( res.Result == "invalid token")
          {
            console.log("FAILED IN SETINFO FUNCTION");
          }
          else
          {
            //console.log(JSON.stringify(res));
            localStorage.setItem('user_data', JSON.stringify(res));
          }
        }
        catch(error:any)
        {
            alert(error.toString());
            return;
        }
      }

    return(

        <div id = "finances">
            <div id = "income">
                <div className="flex h-[10%] items-center justify-center border-b border-[#6d91e8]">
                    <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]">Add Income</span>
                </div>

                <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Name</h5>
                <input className="h-1/2 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = "Name" id = "IncNames"></input>

                <br></br>
                
                <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Amount</h5>
                <input className="h-1/2 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = "Amount" id = "IncNum"></input>

                <br></br>
                

                <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Date</h5>
                <input className="h-1/2 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = "MM/DD/YYYY" id = "Incdate"></input>

                <div className="flex items-center justify-between ml-[10%] mt-2 w-8/10">
                    <h5 className="self-start text-lg text-left text-[0.95rem]">Is The Income Recurring?</h5> 
                    <div>
                        <label>
                            <input type="radio" name="radio" onClick = {setYes}></input>
                        Yes </label>
                        

                        <label>
                            <input type="radio" name="radio" onClick = {setNo}></input>
                        No </label>  
                    </div>
                </div>

                <div className="fixed top-[82%] w-[100%] flex items-center justify-between">
                    <h5 className="ml-[10%] text-[#ff6384]" id="alertmessage"></h5>
                    <button id = "AddIncome" className = "rounded-sm inline-block h-fit w-fit mr-[10%] p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick = {addIncome} >Add Income</button>
                </div>
            </div>
            
        </div>

    );
}


export default AddIncome;