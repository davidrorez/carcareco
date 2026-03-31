'use server'

import { DescriptionItem } from '@/_components/DescriptionItem';
import { httpGet } from '@/_lib/server/query-api' 
import Main from '../../_components/Main';  
import DisplayOptionsMenu from '@/_components/DisplayOptionsMenu'; 
import { ISparepartData } from '../model';
import { CardHeader } from '@/_components/Card';
 

 
export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) { 
    const id = (await params).id;
    const data = await httpGet('spareparts/' + id);
    const sparepart = await data.json() as ISparepartData; 
 
    return (

        <Main header={
            <CardHeader  > 
                     <h3 className="px-1 text-base font-semibold text-gray-900">Artículo de Inventario</h3> 
                    <DisplayOptionsMenu id={id} pageName='inventory'></DisplayOptionsMenu> 
            </CardHeader>}>  
            <dl className="divide-y divide-gray-100">
                    <DescriptionItem label='Código' value={sparepart.code}></DescriptionItem> 
                    <DescriptionItem label='Nombre' value={sparepart.name}></DescriptionItem>   
                    <DescriptionItem label='Cantidad' value={sparepart.quantity}></DescriptionItem>  
                    <DescriptionItem label='Precio' value={sparepart.price}></DescriptionItem> 
                    <DescriptionItem label='Ubicación' value={sparepart.storageName}></DescriptionItem> 
                    <DescriptionItem label='Acerca de' value={sparepart.description}></DescriptionItem> 
                </dl>
        </Main>
    )
  
}