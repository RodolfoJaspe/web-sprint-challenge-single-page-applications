import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from 'axios'


export default function Pizza (){

   const getEmptyState = ()=>({
    name:"",
    size:"10inch",
    sauce:"red",
    toppings:[],
    Meats:[],
    instructions:""
   }) 

const [formState, setFormState] = useState(
  getEmptyState()
);

const [errors, setErrors] = useState({
    name:"",
    sauce:"",
    size:""
});

const [buttonDisabled, setButtonDisabled] = useState(true);

const formSubmit =(e)=>{
    e.preventDefault();
    console.log("submitted!");
axios
  .post("https://reqres.in/api/pizza", formState)
  .then(res => {
    setFormState(getEmptyState())
    console.log('success', formState)      
  })
  .catch(err => console.log(err.res));
};

const formSchema = yup.object().shape({
    name: yup
    .string()
    .required("give me a name")
    .min(2, "name must be at least 2 characters long"),
    toppings: yup
    .string(),
    size: yup
    .string()
    .required("Size is required"),
    Meats: yup
    .string(),
    instructions: yup
    .string(),
    sauce:yup
    .string()
    .required("give me a sauce")

})

useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        console.log(formState)
      setButtonDisabled(!valid);
    });
  }, [formState]);

const validate = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
          console.log(err.message)
        setErrors({
          ...errors,
          [e.target.name]: err.message
        });
      });
}

  const textBoxChanges = (e) => {
    e.persist();
    validate(e)

    setFormState({
      ...formState,
      [e.target.name]: e.target.name === "sauce"?e.target.id: e.target.value
    });
  };

  const checkBoxChanges = (e, addOns) => {
    e.persist();
    validate(e)
    const Index =  addOns.indexOf(e.target.id)

    if(Index === -1){
        addOns.push(e.target.id)
    } else {
        addOns.splice(Index, 1)
    }
    
    setFormState({
    ...formState,
    [e.target.name]: addOns
    });
    console.log(formState)
};
  

    return (
        (
            <form onSubmit={formSubmit}>  
                <img alt="pizza"src='https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'/>

            <h3>Your Name</h3>
            <label htmlFor='name'>
            {errors.name.length > 0 ? (<p className="error">{errors.name}</p>) : null}
                <input name='name' id='name' type='text' placeholder="your name here" onChange={textBoxChanges}/>

            </label>
            

            <h2>Choice of Size</h2>
            <label htmlFor="size">
            {errors.size.length > 0 ? (<p className="error">{errors.size}</p>) : null}
                <select name="size" id="size" onChange={textBoxChanges}  value={formState.size}>
                    <option value="10inch" >10 Inch</option>
                    <option value="14inch">14 Inch</option>
                    <option value="18inch">18 Inch</option>
                    <option value="24inch">24 Inch</option>
                </select>
            </label>

            <h2>Choice of Sauce</h2>
            {errors.sauce.length > 0 ? (<p className="error">{errors.sauce}</p>) : null}
            <label htmlFor="red">Original Red
                <input name="sauce" id="red" type="radio" onChange={textBoxChanges} checked={formState.sauce === "red"}/>
            </label>
            <label htmlFor="garlic">Garlic Ranch
                <input name="sauce" id="garlic" type="radio" onChange={textBoxChanges} checked={formState.sauce === "garlic"}/>
            </label>
            <label htmlFor="bbq">BBQ Sauce
                <input name="sauce" id="bbq" type="radio" onChange={textBoxChanges} checked={formState.sauce === "bbq"}/>
            </label>
            <label htmlFor="alfredo">Spinach Alfredo
                <input name="sauce" id="alfredo" type="radio" onChange={textBoxChanges} checked={formState.sauce === "alfredo"}/>
            </label>

            <h2>Add Toppings</h2>
            <label htmlFor ="toppings">
                <input name="toppings" id="Pepperoni" type="checkbox" checked={formState.toppings.indexOf("Pepperoni") !== -1} onChange={e => checkBoxChanges(e, [...formState.toppings])}/>Pepperoni
                <input name="toppings" id="Sausage" type="checkbox" checked={formState.toppings.indexOf("Sausage") !== -1} onChange={e => checkBoxChanges(e, [...formState.toppings])}/>Sausage
                <input name="toppings" id="Onions" type="checkbox" checked={formState.toppings.indexOf("Onions") !== -1} onChange={e => checkBoxChanges(e, [...formState.toppings])}/>Onions
                <input name="toppings" id="Grilled Chicken" type="checkbox" checked={formState.toppings.indexOf("Grilled Chicken") !== -1} onChange={e => checkBoxChanges(e, [...formState.toppings])}/>Grilled Chicken
            </label>      
            <h2>Meats</h2>   
            <label htmlFor ="Meats" onChange={e => checkBoxChanges(e, [...formState.Meats])}>
                <input name="Meats" id="lamb" type="checkbox"/>Lamb
                <input name="Meats" id="chicken" type="checkbox"/>Chicken
                <input name="Meats" id="hotdog" type="checkbox"/>Hotdog  
            </label> 
            <label htmlFor="instructions" >Instructions
                <input name="instructions" id="instructions" type="textarea"  placeholder="Anything else you'd like to add?"onChange={textBoxChanges}/>
            </label>
            <button disabled={buttonDisabled} type="submit">Add to Order!</button>
            <pre>{JSON.stringify(formState, null, 2)}</pre>
            </form>
          
        )
        
    )
}