'use server'

import {  httpPost, httpDelete } from "@/_lib/server/query-api";
import {  pushToast } from "@/_lib/server/pushToast"; 


export async function removeEmployee(
    id : string,
    ) {
        
      const body = [id]; 
      await httpDelete({
        url:"employees",
        body:body
      })
      pushToast(`Mecánico eliminado con éxito.`) 
}


export async function addEmployee(
  newName : string,
  ) {
     
    const locationResponse = await httpPost({
      url:"employees",
      body:{
        firstName:newName,
        lastName:''
      }
    })

    const newLocationId = await locationResponse.json();

    pushToast(`Nuevo mecánico agregado con éxito.`) 

    return newLocationId;
}
