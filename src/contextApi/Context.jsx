import React, {  useState } from "react";
import { createContext } from "react";


export const addResponseContext=createContext()
export const editStudentContext=createContext()

function Context({children}) {
    const [addResponse,setAddResponse]=useState(" ")
    const [editResponse,seteEditResponse]=useState(" ")

    return(
        <>
        <addResponseContext.Provider value={{addResponse,setAddResponse}}>
            <editStudentContext.Provider value={{editResponse,seteEditResponse}}>
            {children}
            </editStudentContext.Provider>
        </addResponseContext.Provider>
        </>
    )


}

export default Context