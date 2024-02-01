'use client';
import React, { useState, useEffect, useLayoutEffect } from 'react';

import { item__get_one, get__all } from '@/lib/actions/refdata.actions';
import AktToPrint from '@/components/documents/formsToPrint/AktToPrint';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import {
  I_Contract,
  I_Client,
  I_ThirdPartyServiceInAkt,
  I_ServiceWorkInAkt,
  I_WorkRows,
} from '@/interfaces/refdata';

const currentURL = '/manager/documents/akt-of-work';
const initState = {
  aktOfWorkNumber: '',
  aktOfWorkDate: new Date(),
  typeAkt: '',
  aktSum: 0,
};

function AktOfWorkPrint({ params }: Readonly<paramsProps>) {
  const { id } = params;
  const [formData, setFormData] = useState(initState);
  const [tableRows, setTableRows] = useState<I_WorkRows[]>([]);
  const [arr__Clients, setArr__Clients] = useState<I_Client[]>([]);
  const [arr__Contracts, setArr__Contracts] = useState<I_Contract[]>([]);

  const [localOurFirmObj, setLocalOurFirmObj] = useState<I_Client>();
  const [localClientObj, setLocalClientObj] = useState<I_Client>();
  const [localContractObj, setLocalContractObj] = useState<I_Contract>();

  useEffect(() => {
    const myGetAll = async () => {
      const clients = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/client'
      );
      const contracts = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/contract'
      );

      setArr__Clients(clients.items);
      setArr__Contracts(contracts.items);
    };
    myGetAll();
  }, []);

  const { aktOfWorkNumber, aktOfWorkDate, typeAkt, aktSum } = formData;

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);
        if (item) {
          const localOurFirm = arr__Clients.find(
            (client) => client._id === item.contract.ourFirm._id
          );
          const localClient = arr__Clients.find(
            (client) => client._id === item.contract.client._id
          );
          const localContract = arr__Contracts.find(
            (contract) => contract._id === item.contract._id
          );
          const localContactType =
            //@ts-ignore
            localContract?.contractType?.contractTypeName;

          setFormData((prevState) => ({
            ...prevState,
            aktOfWorkNumber: item.aktOfWorkNumber,
            aktOfWorkDate: new Date(item.aktOfWorkDate!),
            typeAkt: item.typeAkt,
            aktSum: Number(item.totalSums.totalAktSum),
          }));
          setLocalOurFirmObj(localOurFirm);
          setLocalClientObj(localClient);
          setLocalContractObj(localContract);

          if (localContactType === 'Сумма Кошторис') {
            let allThirdString = '';
            let allServString = '';
            item.thirdPartyServices?.forEach(
              (inner_item: I_ThirdPartyServiceInAkt) => {
                allThirdString += `${
                  //@ts-ignore
                  //@ts-ignore
                  inner_item?.thirdPartyService?.thirdPartyServiceName!
                } ${inner_item?.extraInformation!} ${inner_item?.amount!.toString()} ${
                  //@ts-ignore
                  inner_item?.thirdPartyService?.unit!.unitName
                }, `;
              }
            );
            item.serviceWorks?.forEach((inner_item: I_ServiceWorkInAkt) => {
              allServString += `${
                //@ts-ignore
                inner_item?.serviceWork?.serviceWorkName!
              } ${inner_item?.extraInformation!} ${inner_item?.amount!.toString()} ${
                //@ts-ignore
                inner_item?.serviceWork?.unit!.unitName
              }, `;
            });

            const newRow = {
              row_id: ' row_id',
              //@ts-ignore
              workName: `${allThirdString} ${allServString}`,
              extraInformation: '',
              //@ts-ignore
              unit: 'послуга',
              amount: '1',
              price: item.totalSums.totalAktSum,
              rowSum: item.totalSums.totalAktSum,
            };
            setTableRows([newRow]);
          } else {
            const arrToSetRowsThird = item.thirdPartyServices?.map(
              (inner_item: I_ThirdPartyServiceInAkt) => {
                return {
                  row_id: inner_item._id!.toString(),
                  //@ts-ignore
                  workName:
                    //@ts-ignore
                    inner_item?.thirdPartyService?.thirdPartyServiceName!,
                  extraInformation: inner_item?.extraInformation!,
                  //@ts-ignore
                  unit: inner_item?.thirdPartyService?.unit!.unitName,
                  amount: inner_item?.amount!.toString(),
                  price: inner_item?.price!.toFixed(2),
                  rowSum: (inner_item?.amount! * inner_item?.price!).toFixed(2),
                };
              }
            );
            const arrToSetRowsServ = item.serviceWorks?.map(
              (inner_item: I_ServiceWorkInAkt) => {
                return {
                  row_id: inner_item._id!.toString(),
                  //@ts-ignore
                  workName:
                    //@ts-ignore
                    inner_item?.serviceWork?.serviceWorkName!,
                  extraInformation: inner_item?.extraInformation!,
                  //@ts-ignore
                  unit: inner_item?.serviceWork?.unit!.unitName,
                  amount: inner_item?.amount!.toString(),
                  price: inner_item?.price!.toFixed(2),
                  rowSum: (inner_item?.amount! * inner_item?.price!).toFixed(2),
                };
              }
            );
            setTableRows([...arrToSetRowsThird, ...arrToSetRowsServ]);
          }
        }
      };
      myGetOne();
    }
  }, [arr__Clients, arr__Contracts, id]);

  return (
    <AktToPrint
      aktOfWorkNumber={aktOfWorkNumber}
      aktOfWorkDate={aktOfWorkDate}
      ourFirmObj={localOurFirmObj!}
      clientObj={localClientObj!}
      contractObj={localContractObj!}
      typeAkt={typeAkt}
      aktSum={aktSum}
      tableRows={tableRows}
    />
  );
}

export default AktOfWorkPrint;
