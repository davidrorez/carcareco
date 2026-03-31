'use server'

import InventoryInput from '../_components/InventoryInput';
import { createOrUpdate } from '../createOrUpdate';
import Main from '../../_components/Main';
import { httpGet } from '@/_lib/server/query-api';
import { ILocation } from '../model';
import { CardHeader } from '@/_components/Card'; 

export default async function Page() { 
    
    const data = await httpGet('storages');
    const locations = await data.json() as ILocation[]; 
    
    return (
        <Main header={<CardHeader title='Crear artículo de Inventario' description='Ingresa detalles' ></CardHeader>}>
                <form action={createOrUpdate}>
                    <input type="hidden" name='id' ></input>
                    <InventoryInput allLocations={locations} ></InventoryInput>
                </form> 
        </Main> 
    )
}
