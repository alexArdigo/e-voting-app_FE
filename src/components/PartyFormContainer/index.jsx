import React from 'react';
import FormInput from "../common/FormInput";
import FormTextareaInput from "../common/FormInput/FormTextareaInput";



const PartyFormContainer = ({form, handleChange}) => {

    return (
        <div>
          <FormInput input={form.name} handleChange={handleChange}/>
          <FormInput input={form.color} handleChange={handleChange}/>
          <FormInput input={form.imageURL} handleChange={handleChange}/>
          <FormTextareaInput input={form.description} handleChange={handleChange}/>
        </div>
    );
};

export default PartyFormContainer;