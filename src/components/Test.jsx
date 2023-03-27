import React, {useState} from 'react';
import "./Todo.css";
import img from "../assets/note.png";
import { MdDeleteForever } from "react-icons/md";

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

const Test = () => {

    const [inputData, setInputData] = useState("");
const [addItem, setAddItem] = useState(getLocalItems());


const onChangeHandlerinput = (event) => {
    setInputData(event.target.value);
}

//ADD ITEM
const onCickHandlerAddItem = () =>{
    if(inputData === ""){

    }else{
        setAddItem([inputData, ...addItem])
    }
    setInputData("");
   
}

// DELETE ITEM 
const onClickHandlerDeleteItem = (id) => {
   const updatedItems = addItem.filter((e,idx)=>{
        return id !== idx
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

    return(
        <div className="main">
        <div className="sub-main">
            <img className="notes-img" src={img} alt="notes-img"/>
            <p className="sub-main-content">Add Your List Here 💜📍</p>
            <div className="add-item">
                <input value={inputData} onChange={onChangeHandlerinput} className="input-field" type="text" placeholder="Write something ✍️...."/>
                <span className="plus" onClick={onCickHandlerAddItem} >➕</span>
            </div>

            <div >
                
                      
                       {addItem.map((ele,idx)=>{
                            return(
                                <div  className="show-items" key={idx}>
                                <p className="name each-item" >{ele}</p>
                                <div onClick={()=>onClickHandlerDeleteItem(idx)} className="delete each-item" ><MdDeleteForever/></div> 
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

export default Test;