'use client';
import React, { useState, useEffect, useLayoutEffect } from 'react';

import { item__get_one, get__all } from '@/lib/actions/refdata.actions';
import NakladnToPrint from '@/components/documents/formsToPrint/NakladnToPrint';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import { I_Contract, I_Client, I_ProductInNakl } from '@/interfaces/refdata';

const currentURL = '/manager/documents/nakladnaya';
const initState = {
  nakladnayaNumber: '',
  nakladnayaDate: new Date(),
  typeNakl: '',
  naklSum: 0,
  tableRows: [],
};

function NakladnayaPrint({ params }: Readonly<paramsProps>) {
  const { id } = params;
  const [formData, setFormData] = useState(initState);
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

  const {
    nakladnayaNumber,
    nakladnayaDate,

    typeNakl,
    naklSum,
    tableRows,
  } = formData;

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);
        if (item) {
          const arrToSetRows = item.products?.map(
            (inner_item: I_ProductInNakl) => {
              //@ts-ignore
              // console.log(inner_item.product.unit.uniteName);
              return {
                row_id: inner_item._id!.toString(),
                //@ts-ignore
                product: inner_item.product.productName,
                //@ts-ignore
                unit: inner_item.product.unit.unitName,

                amount: inner_item?.amount.toString(),
                price: inner_item?.price.toFixed(2),
                rowSum: (inner_item?.amount * inner_item?.price).toFixed(2),
              };
            }
          );
          const localOurFirm = arr__Clients.find(
            (client) => client._id === item.contract.ourFirm._id
          );
          const localClient = arr__Clients.find(
            (client) => client._id === item.contract.client._id
          );
          const localContract = arr__Contracts.find(
            (contract) => contract._id === item.contract._id
          );
          setFormData((prevState) => ({
            ...prevState,
            nakladnayaNumber: item.nakladnayaNumber,
            nakladnayaDate: new Date(item.nakladnayaDate!),
            ourFirmObj: localOurFirmObj!,
            clientObj: localClientObj!,
            contractObj: localContractObj!,
            naklSum: Number(item.totalNaklSum),
            typeNakl: item.typeNakl,
            tableRows: arrToSetRows,
          }));
          setLocalOurFirmObj(localOurFirm);
          setLocalClientObj(localClient);
          setLocalContractObj(localContract);
        }
      };
      myGetOne();
    }
  }, [arr__Clients, arr__Contracts, id]);

  return (
    <NakladnToPrint
      nakladnayaNumber={nakladnayaNumber}
      nakladnayaDate={nakladnayaDate}
      ourFirmObj={localOurFirmObj!}
      clientObj={localClientObj!}
      contractObj={localContractObj!}
      typeNakl={typeNakl}
      naklSum={naklSum}
      tableRows={tableRows}
    />
  );
}

export default NakladnayaPrint;
