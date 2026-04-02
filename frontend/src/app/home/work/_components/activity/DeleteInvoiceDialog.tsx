'use client'

import BaseDialog, { BaseDialogHandle } from "@/_components/BaseDialog"; 
import {   IWorkData  } from "../../model";  
import { deleteInvoice } from "../../actions/deleteInvoice";

export default function DeleteInvoiceDialog({
    work, 
    dialogRef
}:{
    work: IWorkData, 
    dialogRef: React.RefObject<BaseDialogHandle | null>, 
}){ 
     
    return (
        <BaseDialog ref={dialogRef}
                title="Eliminar factura"
                description="Seguro que quieres eliminarlo? Esta acción no se puede deshacer."
                center={false}
                yesButtonText="OK"
                onConfirm={async () => {

                    const result =  deleteInvoice(work.id) 
                     result.finally(()=>{
                        dialogRef.current?.close();
                     }) 
                     await result; 
                }}> 
                    <div className="space-y-12"> 
                    </div> 
            </BaseDialog>
    )
}