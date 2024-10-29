import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";

function TopicDescription() {

  const {userCourseInput,setUserCourseInput} = useContext(UserInputContext);
  const handleInputChange=(filedName,value)=>{
    setUserCourseInput(prev=>({
      ...prev,
      [filedName]:value
    }))

  }

  return (
    <div className="mx-20 lg:mx-44">
      {/* topic input  */}
      <div className="mt-6">
        <label>
          Write the Topic for Which you want to generate a course(e.g.,Python
          Course,Yoga,etc)
        </label>
        <Input placeholder={"Topic"} 
        className="h-14 text-xl"
        defaultValue={userCourseInput?.topic}
        onChange={(e)=>handleInputChange('topic',e.target.value)}/>
      </div>
      {/* text area  */}
        
      <div className="mt-6">
        <label>
         Tell us more about your course,What you want to include in the course(Optional)
        </label>
        <Textarea placeholder={'Course Description'} 
        defaultValue={userCourseInput?.description}        
        onChange={(e)=>handleInputChange('description',e.target.value)}/>
      </div>
        

    </div>
  );
}

export default TopicDescription;
