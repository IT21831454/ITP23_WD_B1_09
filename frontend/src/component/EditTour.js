import "../App.css";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ToursAndRoutePlanning from "./ToursAndRoutePlanningNav";

function EditTour(){
    const {id} = useParams();
    const [tourName, setTourName] = useState("");
    const [origin, setOrigin] = useState("");
    const [distance, setDistance] = useState("");
    const [destination, setDestination] = useState("");
    const [cost, setCost] = useState("");
    const [additionalExpenses, setAdditionalExpenses] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [fileName, setFileName] = useState("");

    const onChangeFile = e => {
        setFileName(e.target.files[0]);

    }

    useEffect(() => {
        
        axios.get("http://localhost:8090/tour/getTour/"+id).then((res) => {
            console.log(res);
            setTourName(res.data.tourName)
            setOrigin(res.data.origin)
            setDestination(res.data.destination)
            setDistance(res.data.distance)
            setCost(res.data.cost)
            setAdditionalExpenses(res.data.additionalExpenses)
            setTotalCost(res.data.totalCost)
            setDate(res.data.date)
            setDescription(res.data.description)

        }).catch((err) => {
            alert(err.message);
        })

    },[])

    const update = (e) =>{
        e.preventDefault();

        const formData = new FormData();

        formData.append("tourName", tourName);
        formData.append("origin", origin);
        formData.append("destination", destination);
        formData.append("distance", distance);
        formData.append("cost", cost);
        formData.append("additionalExpenses", additionalExpenses);
        formData.append("totalCost", totalCost);
        formData.append("date", date);
        formData.append("description", description);
        formData.append("image", fileName);

        axios.put("http://localhost:8090/tour/updateTour/"+id, formData).then(() => {
            alert("Tour Updated");

            window.location = "/getTours"

        }).catch((err) => {
            alert(err);

        })

    }

    //handle validation
    const errTourPrint = (tourName) => {
        if(/\d/.test(tourName)){
            document.getElementById("tourNameError").innerHTML ="*tour name should not contain numbers"
            document.getElementById("tourName").style.boxShadow= "2px solid red"
           
        }else if(tourName.length < 5){
            document.getElementById("tourNameError").innerHTML = "*tour name must be more than 5 characters"
            document.getElementById("tourName").style.border = "2px solid red"
            
        }else{
            document.getElementById("tourNameError").innerHTML = `<i class="fa-solid fa-check fa-xl" style="color: #008000;"></i>`
            document.getElementById("tourName").style.border = "2px solid green"
        }
    }

    const errOriginPrint = (origin) => {
        if(/\d/.test(origin)){
            document.getElementById("originError").innerHTML ="*origin should not contain numbers"
            document.getElementById("origin").style.boxShadow= "2px solid red"
           
        }else if(origin.length < 5){
            document.getElementById("originError").innerHTML = "*origin must be more than 5 characters"
            document.getElementById("origin").style.border = "2px solid red"
            
        }else{
            document.getElementById("originError").innerHTML = `<i class="fa-solid fa-check fa-xl" style="color: #008000;"></i>`
            document.getElementById("origin").style.border = "2px solid green"
        }
    }

    const errDestinationPrint = (destination) => {
        if(/\d/.test(destination)){
            document.getElementById("destinationError").innerHTML ="*destination should not contain numbers"
            document.getElementById("destination").style.boxShadow= "2px solid red"
           
        }else if(destination.length < 5){
            document.getElementById("destinationError").innerHTML = "*destination must be more than 5 characters"
            document.getElementById("destination").style.border = "2px solid red"
            
        }else{
            document.getElementById("destinationError").innerHTML = `<i class="fa-solid fa-check fa-xl" style="color: #008000;"></i>`
            document.getElementById("destination").style.border = "2px solid green"
        }
    }

    const errDistancePrint = (distance) => {
        if(/[^0-9.]|(?<=\..*)\./g.test(distance)){
            document.getElementById("distanceError").innerHTML ="*distance should only contain numbers"
            document.getElementById("distance").style.border= "2px solid red"

        }else if(!(distance)){
            document.getElementById("distanceError").innerHTML ="*distance should only contain numbers"
            document.getElementById("distance").style.border= "2px solid red"

        }else{
            document.getElementById("distanceError").innerHTML = `<i class="fa-solid fa-check fa-xl" style="color: #008000;"></i>`
            document.getElementById("distance").style.border = "2px solid green"
        }
    }

    const errAdditionalExpensesPrint = (additionalExpenses) => {
        if(/[^0-9.]|(?<=\..*)\./g.test(additionalExpenses)){
            document.getElementById("additionalExpensesError").innerHTML ="*expenses should only contain numbers"
            document.getElementById("additionalExpenses").style.border= "2px solid red"

        }else if(!(additionalExpenses)){
            document.getElementById("additionalExpensesError").innerHTML ="*expenses should only contain numbers"
            document.getElementById("additionalExpenses").style.border= "2px solid red"

        }else{
            document.getElementById("additionalExpensesError").innerHTML = `<i class="fa-solid fa-check fa-xl" style="color: #008000;"></i>`
            document.getElementById("additionalExpenses").style.border = "2px solid green"

        }
    }

    const errDate = (date) => {
        if(!(date)){
            document.getElementById("dateError").innerHTML ="*date required"
            document.getElementById("date").style.border= "2px solid red"
            document.getElementById("date").min = new Date().getFullYear() + "-" +  parseInt(new Date().getMonth() + 1 ) + "-" + new Date().getDate()

        }else{
            document.getElementById("dateError").innerHTML = `<i class="fa-solid fa-check fa-xl" style="color: #008000;"></i>`
            document.getElementById("date").min = new Date().getFullYear() + "-" +  parseInt(new Date().getMonth() + 1 ) + "-" + new Date().getDate()
            document.getElementById("date").style.border = "2px solid green"

        }
    }

    const errDescription = (description) => {
        if(!(description)){
            document.getElementById("descriptionError").innerHTML ="*description required"
            document.getElementById("description").style.border= "2px solid red"

        }else{
            document.getElementById("descriptionError").innerHTML = `<i class="fa-solid fa-check fa-xl" style="color: #008000;"></i>`
            document.getElementById("description").style.border = "2px solid green"

        }
    }

    const errImage = (image) => {
        if(!(image)){
            document.getElementById("imageError").innerHTML ="*image required"
            document.getElementById("image").style.border= "2px solid red"

        }else{
            document.getElementById("imageError").innerHTML = `<i class="fa-solid fa-check fa-xl" style="color: #008000;"></i>`
            document.getElementById("image").style.border = "2px solid green"

        }
    }

    return (
        <>
        <ToursAndRoutePlanning/>
        <form onSubmit={update} style={{fontSize:"18px", display: "flex", alignItems: "center", justifyContent: "space-around"}}>
            <div className="container" style={{ height : "auto",width: "30%", marginLeft: "18%", marginTop: "50px"}}>
            <h4 style={{marginTop: "-40px"}} className="fw-bold"><u>Edit Tour</u></h4>
                <div>
                    <label for="tourName" className="form-label px-1 d-flex align-items-center justify-content-between">Tour Name<div className="" id="tourNameError" style={{color: "red", fontSize: "15px", float:"right"}}></div></label>
                    <input type="text" class="form-control" id="tourName" name="tourName" placeholder="Enter tour name" pattern="[A-Za-z._%+\-\s]{5,}" value={tourName} required 
                    onChange={(e) => {
                        setTourName(e.target.value);

                    }} 
                    
                    onKeyUp={(e) =>{
                        errTourPrint(e.target.value);

                    }}/>
                </div>
                <div>
                    <label for="origin" class="form-label form-label px-1 d-flex align-items-center justify-content-between">Origin<div className="" id="originError" style={{color: "red", fontSize: "15px", float:"right"}}></div></label>
                    <input type="text" class="form-control" id="origin" name="origin" placeholder="Enter origin" pattern="[A-Za-z._%+\-\s]{5,}" value={origin} required 
                    onChange={(e) => {
                        setOrigin(e.target.value);

                    }} 
                    
                    onKeyUp={(e) => {
                        errOriginPrint(e.target.value);

                    }}/>
                </div>
                <div>
                    <label for="destination" class="form-label form-label px-1 d-flex align-items-center justify-content-between">Destination<div className="" id="destinationError" style={{color: "red", fontSize: "15px", float:"right"}}></div></label>
                    <input type="text" class="form-control" id="destination" name="destination" placeholder="Enter destination" pattern="[A-Za-z._%+\-\s]{5,}" value={destination} required 
                    onChange={(e) => {
                        setDestination(e.target.value);

                    }} 
                    
                    onKeyUp={(e) =>{
                        errDestinationPrint(e.target.value);

                    }}/>
                </div>
                <div>
                    <label for="distance" class="form-label form-label px-1 d-flex align-items-center justify-content-between">Distance<div className="" id="distanceError" style={{color: "red", fontSize: "15px", float:"right"}}></div></label>
                    <input type="text" name="distance" class="form-control" id="distance" placeholder="Enter distance" pattern="^\d+(?:\.\d{1,2})?$" value={distance} step="0.01" required 
                    onChange={(e) => {
                        setDistance(e.target.value);

                    }} 
                    
                    onKeyUp={(e) =>{
                        errDistancePrint(e.target.value);

                    }}/>
                </div>
                <div>
                    <label for="cost" class="form-label">Cost (Rs.)</label>
                    <input type="text" name="cost" class="form-control" value={distance ? parseFloat(distance) * 100 : .0} id="cost" disabled placeholder="Enter cost" pattern="^\d+(?:\.\d{1,2})?$" step="0.01" required onMouseOver={(e) => {
                        setCost(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="additionalExpenses" class="form-label form-label px-1 d-flex align-items-center justify-content-between">Add.Expenses (Rs.)<div className="" id="additionalExpensesError" style={{color: "red", fontSize: "15px", float:"right"}}></div></label>
                    <input type="text" name="additionalExpenses" class="form-control" id="additionalExpenses" placeholder="Enter additional expenses" pattern="^\d+(?:\.\d{1,2})?$" value={additionalExpenses} step="0.01" required 
                    onChange={(e) => {
                        setAdditionalExpenses(e.target.value);

                    }}
                    
                    onKeyUp={(e) =>{
                        errAdditionalExpensesPrint(e.target.value);

                    }}/>
                </div>
            </div>
            <div className="container" style={{width: "30%", marginRight: "18%", height: "auto"}}>
                <div style={{ marginTop: "30px", marginBottom: "8px" }}>
                    <label for="totalCost" class="form-label">Total Cost (Rs.)</label>
                    <input type="text" class="form-control" value={cost && additionalExpenses ? parseFloat(cost) + parseFloat(additionalExpenses) : .0} disabled id="result" required onMouseOver={(e) => {
                        setTotalCost(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="date" class="form-label form-label px-1 d-flex align-items-center justify-content-between">Tour Date<div className="" id="dateError" style={{color: "red", fontSize: "15px", float:"right"}}></div></label>
                    <input type="date" id="date" name="date" class="form-control"  value={date} required min=""
                    onChange={(e) => {
                        setDate(e.target.value);

                    }} 
                    
                    onSelect={(e) =>{
                        errDate(e.target.value);

                    }}/>
                </div>
                <div>
                    <label for="description" class="form-label form-label px-1 d-flex align-items-center justify-content-between">Description<div className="" id="descriptionError" style={{color: "red", fontSize: "15px", float:"right"}}></div></label>
                    <textarea id="description" name="description" class="form-control"  rows="5" cols="100" pattern="[a-z0-9._%+\-]{,500}" value={description} required placeholder="Enter description here...." 
                    onChange={(e) => {
                        setDescription(e.target.value);

                    }} 
                    onKeyUp={(e) =>{
                        errDescription(e.target.value);

                    }}/>
                </div>
                <div>
                    <label for="image" class="form-label form-label px-1 d-flex align-items-center justify-content-between" style={{marginTop: "15px"}}>Upload Image<div className="" id="imageError" style={{color: "red", fontSize: "15px", float:"right"}}></div></label>
                    <input type="file" id="image" name="image" filename="file" class="form-control" required 
                    onChange={onChangeFile} 
                    
                    onMouseLeave={(e) =>{
                        errImage(e.target.value);

                    }}/>
                </div>
                <button id="submit" type="submit" class="btn btn-dark"><strong>Add</strong></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button id="reset" type="reset" class="btn btn-danger"><strong>Reset</strong></button>
            </div>
        </form>
        </>
    )
   

}

export default EditTour;