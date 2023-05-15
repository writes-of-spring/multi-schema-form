import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useForm } from "react-hook-form";
import { MySchema } from "./schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
type FormTypes = z.infer<typeof MySchema>;
function App() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: {
      name: "",
      email: "",
    },
    resolver: zodResolver(MySchema),
  });

  const saveChanges = () => {
    setValue("status", "Save");
    handleSubmit((data) => {
      console.log("You wish to save changes with", data);
    })();
  };

  const submitForm = () => {
    // we still get type saftety here, try changing the status to something else
    setValue("status", "Submit");
    handleSubmit((data) => {
      console.log("You wish to submit the form with", data);
    })();
    // see above function closes itself ()
  };

  return (
    <>
      <div className="App">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" {...register("name")} />
            <p>{errors.name?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="age">Text</label>
            <input {...register("email")} />
          </div>
          <button type="button" onClick={saveChanges}>
            Save
          </button>
          <button onClick={submitForm}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
