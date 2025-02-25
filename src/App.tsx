import React, { useEffect } from 'react';
import './App.css';
import {z, ZodType} from 'zod';
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

//To work with zod and useForm install below libraries
//npm add zod react-hook-form @hookform/resolvers

type UserFormData = {
  firstName: string,
  lastName:string,
  email: string,
  age: number,
  password: string,
  confirmPassword: string
}

function App() {
  const userSchema: ZodType<UserFormData> = z.object({
    firstName: z.string().nonempty("First name is required").min(2, "First name must be at least 2 characters").max(10),
    lastName:z.string().nonempty("Last name is required").min(2).max(10),
    email: z.string().nonempty("Email is required").email(),
    age: z.number().min(18).max(50),
    password: z.string().nonempty("Password is required").min(5, "Password must be at least 5 characters").max(10),
    confirmPassword: z.string().nonempty("Confirm password is required").min(5).max(10),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "PAssword do not match",
    path: ["confirmPassword"]
  })

  const {register, handleSubmit,trigger, reset, formState: {errors}} 
                  = useForm<UserFormData>({resolver: zodResolver(userSchema)});

  const submitData = (data: UserFormData ) =>{
    console.log("Post Data", data)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      //Edit the form
      const userData = { 
        firstName: "John Doe",
        lastName: "klp",
        email: "john@example.com", 
        age: 25,
        password: "klpnaidu",
        confirmPassword: "klpnaidu"
      };

      // Prefill form fields
      reset(userData);
    };

    fetchUserData();
  }, [reset]);
  
  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <label>First Name:</label>
        <input type='text' {...register("firstName")} onBlur={() => trigger("firstName")}/>
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <label>Last Name:</label>
        <input type='text' {...register("lastName")} onBlur={() => trigger("lastName")}/>
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <label>Email:</label>
        <input type='email' {...register("email")} onBlur={() => trigger("email")}/>
        {errors.email && <span>{errors.email.message}</span>}
        <label>Age:</label>
        <input type='number' {...register("age", {valueAsNumber: true})} onBlur={() => trigger("age")}/>
        {errors.age && <span>{errors.age.message}</span>}
        <label>Password:</label>
        <input type='password' {...register("password")} onBlur={() => trigger("password")}/>
        {errors.password && <span>{errors.password.message}</span>}
        <label>Confirm Password:</label>
        <input type='password' {...register("confirmPassword")} onBlur={() => trigger("confirmPassword")}/>
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

        <input type='submit'></input>
      </form>
    </div>
  );
}

export default App;
