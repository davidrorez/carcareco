'use client'

import { useRouter } from 'next/navigation';
import FormTextArea from '@/_components/FormTextArea';
import PrimaryButton from '@/_components/PrimaryButton';
import SecondaryButton from '@/_components/SecondaryButton';
import { IWorkData, IMechanic } from '../model';
import FormInput from '@/_components/FormInput';
import WorkInputMechanics from './WorkInputMechanics';


export default function WorkInput({
    work,
    mechanics,
}: {
    work?: IWorkData | undefined,
    mechanics: IMechanic[]
}) {

    const router = useRouter()
   
    // const [isOffer, setIsOffer] = useState(false);

    // const [onlyClientVehicles, setOnlyClientVehicles] = useState(!work ? true : false);

    // const [clientVehicles, setClientVehicles] = useState<IVehicleData[]>([]);
    // const [selectedClientVehicleId, setSelectedClientVehicleId] = useState(work?.vehicleId ?? '');
    // const [clientUndisclosed, setClientUndisclosed] = useState(!work ? false : !work.clientId);
    /*
    const populateClientVehicles = (clientId: string) => {
        query({
            url: 'vehicles/client/' + clientId,
            method: 'GET',
            onSuccess: (result: IVehicleData[]) => {
                if (result) {
                    setClientVehicles(result);
                }
                else {
                    console.log(result);
                    return [];
                }
            },
            onFailure: ({ url, status, text }) => {
                console.log(url);
                console.log(text);
                console.log(status);
            }
        });
    }
    */

    return (
        <>
            <div className="space-y-12 ">
                <div className="border-b  border-gray-900/10 pb-12">

                    <div className="grid grid grid-flow-row grid-cols-1  gap-4">
                        {/*!work && <div>
                            <FormLabel name='startWith' label='Empezar con'></FormLabel>
                            <Field className="flex mt-2 items-center">
                                <FormSwitch
                                    name='isOffer'
                                    checked={isOffer}
                                    onChange={(value) => {
                                        setIsOffer(value);
                                    }}></FormSwitch>

                                <Label as="span" className="ml-3 text-sm">
                                    Cotización
                                </Label>
                            </Field>
                        </div>*/}

                        <div className=" ">
                            <FormInput
                                name='clientName'
                                defaultValue={work?.clientName}
                                label='Nombre cliente'
                            /> 

                        </div>
                        <div className=" ">
                            <FormInput
                                name='clientPhone'
                                defaultValue={work?.clientPhone}
                                label='Número de teléfono'
                            /> 

                        </div>
                        <div className='  ' >
                            <FormInput
                                name='vehicleInfo'
                                defaultValue={work?.vehicleInfo}
                                label='Vehículo'
                            />
                        </div>

                        <div className='  ' >
                            <FormInput
                                name='vehiclePlate'
                                defaultValue={work?.vehiclePlate}
                                label='Placa del vehículo'
                            />
                        </div>

                       <WorkInputMechanics mechanics={mechanics} work={work}></WorkInputMechanics>
                        <div className=" ">
                            <FormTextArea name='about' rows={8} label='Detalles' defaultValue={work?.notes}>
                            </FormTextArea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <SecondaryButton onClick={() => router.back()}>Cancelar</SecondaryButton>
                <PrimaryButton onClick={() => { }}>Guardar</PrimaryButton>
            </div>
        </>
    )
}
