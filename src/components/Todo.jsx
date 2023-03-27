import React, {useState, useEffect} from 'react';
import img from '../assets/note.png';
import {RiDeleteBinLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import './Todo.css';

//TO GET DATA FROM LOCAL STORAGE 
const getLocalItems = () => {
    let list = localStorage.getItem("lists");
    console.log(list);
    if(list){
        return JSON.parse( localStorage.getItem("lists"));//Yeh jo data hoga voh mil raha hoga in the form of string but we want array toh hum JSON.parse it will convert our data into original format.
    }else{
        return[];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState("");
const [addItem, setAddItem] = useState(getLocalItems());
const [toggleSubmit, setToggleSubmit] = useState(true);
const [isEditItem, setIsEditItem] = useState(null);


const onChangeHandlerinput = (event) => {
    setInputData(event.target.value);
}

//ADD ITEM
const onCickHandlerAddItem = () =>{
    if(inputData === ""){
alert("Please fill the data!!!")
    }else if(inputData && !toggleSubmit){
        setAddItem(
            addItem.map((ele)=>{
                if(ele.id === isEditItem){
        return {...ele, name: inputData}
                }
                return ele;
            })
        )
        setToggleSubmit(true);
        setInputData("");
        setIsEditItem(null);
    }
    else{
        const allInputData = {id: new Date().getTime().toString(), name:inputData}
        setAddItem([allInputData, ...addItem])
    }
    setInputData("");
   
}

// DELETE ITEM 
const onClickHandlerDeleteItem = (index) => {
   const updatedItems = addItem.filter((ele)=>{
        return index !== ele.id;
    })
    setAddItem(updatedItems);
}

//DELETE ALL ITEM
const onClickDeleteAllItem = () =>  {
    setAddItem([]);
}

//ADD DATA TO LOCAL STORAGE
//LOCAL Storage me DATA always STORE in STRING FORMAT
useEffect(()=>{
    localStorage.setItem("lists", JSON.stringify(addItem));
},[addItem])

//EDIT ITEM
//WHEN user Clock on EDIT BUTTON
//1: get the id and name of the data which user clicked to edit
//2: set the toggle mode to change the submit button into edit button
//3: Now update the value of the setInput with the new updated value to edit
//4: To pass the current element Id to nem state variable for refernce
const onClickHandlerEditItem = (id) => {
    let newEditItem = addItem.find((ele)=>{
        return ele.id === id;
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
}
    return(
        <div className="main">
        <div className="sub-main">
            <img className="notes-img" src={img} alt="notes-img"/>
            <p className="sub-main-content">Add Your List Here 💜📍</p>
            <div className="add-item">
                <input value={inputData} onChange={onChangeHandlerinput} className="input-field" type="text" placeholder="Write something ✍️...."/>
                {toggleSubmit? <span className="plus" onClick={onCickHandlerAddItem } >➕</span> : <div onClick={onCickHandlerAddItem } className="plus edit each-item margin" ><FaEdit/></div> }
              
            </div>

            <div >
                
                      
                       {addItem.map((ele)=>{
                            return(
                                <div  className="show-items" key={ele.id}>
                                <p className="name each-item" >{ele.name}</p>
                                <div className="todo-btn">
                                <div onClick={()=>onClickHandlerEditItem(ele.id)} className="edit each-item" ><FaEdit/></div> 
                                
                                <div onClick={()=>onClickHandlerDeleteItem(ele.id)} className="delete each-item" ><RiDeleteBinLine/></div> 
                                </div>
                                
                                </div>
                            )
                        })}
                  

                  {/* DELETE ALL ITEM      */}
                 <button className="delete-all-btn" onClick={onClickDeleteAllItem}>Delete All Items</button>
              
                    
            </div>
        </div>

    </div>
   
    )
}

export default Todo;