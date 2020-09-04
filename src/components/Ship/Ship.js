import React from 'react';
import { useForm } from "react-hook-form";
import "./Ship.css";
import { auth } from 'firebase';
import { useAuth } from '../Login/useAuth';

const Ship = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  const auth = useAuth();
  

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
    
      <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name"/>
      {errors.name && <span className="error">Name is required</span>}
      <input name="email" defaultValue={auth.user.email}  ref={register({ required: true })} placeholder="Email" />
      {errors.email && <span className="error">Email is required</span>}
      <input name="addressLine1" ref={register({ required: true })} placeholder="Address"/>
      {errors.addressLine1 && <span>Address is required</span>}
      <input name="addressLine2" ref={register()}placeholder="Address" />
      {errors.addressLine2 && <span className="error">Address is required</span>}
      <input name="city" ref={register({ required: true })}placeholder="City" />
      {errors.city && <span className="error">City is required</span>}
      <input name="country" ref={register({ required: true })}placeholder="Country" />
      {errors.country && <span className="error">Country is required</span>}
      <input name="zipcode" ref={register({ required: true })}placeholder="Zipcode" />
      {errors.zipcode && <span className="error">Zipcode is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Ship;