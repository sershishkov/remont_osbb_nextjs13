'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { item__get_one, get__all } from '@/lib/actions/refdata.actions';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import KoshtorisToPrint from '@/components/documents/formsToPrint/KoshtorisToPrint';
import {
  I_Contract,
  I_Client,
  I_ThirdPartyServiceInAkt,
  I_ServiceWorkInAkt,
  I_WorkRows,
  I_LProduct,
  I_ProductInNakl,
  I_DocumentNakladnaya,
  I_DocumentAktOfWork,
} from '@/interfaces/refdata';

const currentURL = '/manager/refdata/contract';

const initState = {
  naklSum: 0,
  aktSum: 0,
};

export default function KoshtorisPrint({ params }: Readonly<paramsProps>) {
  const searchParam = useSearchParams();
  const mode = searchParam.get('mode');

  const { id } = params;
  const [formData, setFormData] = useState(initState);
  const [tableAktRows, setTableAktRows] = useState<I_WorkRows[]>([]);
  const [tableNaklRows, setTableNaklRows] = useState<I_LProduct[]>([]);
  const [currentOurFirm, setCurrentOurFirm] = useState<I_Client>();
  const [currentClient, setCurrentClient] = useState<I_Client>();
  const [currentContract, setCurrentContract] = useState<I_Contract>();

  const { naklSum, aktSum } = formData;

  useEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const localContract: I_Contract = await item__get_one(
          { _id: id },
          currentURL
        );

        const localOurFirm: I_Client = await item__get_one(
          //@ts-ignore
          { _id: localContract.ourFirm._id },
          '/manager/refdata/client'
        );

        const localClient: I_Client = await item__get_one(
          //@ts-ignore
          { _id: localContract.client._id },
          '/manager/refdata/client'
        );
        const localArrOfRelNakl = await get__all(
          {
            page: '0',
            limit: '0',
            filter: '',
            contract: id,
          },
          `/manager/documents/nakladnaya`
        );
        const localArrOfRelAkt = await get__all(
          {
            page: '0',
            limit: '0',
            filter: '',
            contract: id,
          },
          `/manager/documents/akt-of-work`
        );

        const currentNakl: I_DocumentNakladnaya = localArrOfRelNakl?.items[0];
        const currentAkt: I_DocumentAktOfWork = localArrOfRelAkt?.items[0];
        setCurrentOurFirm(localOurFirm);
        setCurrentClient(localClient);
        setCurrentContract(localContract);

        const tempNaklSum = currentNakl?.totalNaklSum
          ? Number(currentNakl?.totalNaklSum)
          : 0;

        const tempAktSum = currentAkt?.totalSums?.totalAktSum
          ? Number(currentAkt?.totalSums?.totalAktSum)
          : 0;

        setFormData((prevState) => ({
          ...prevState,

          naklSum: tempNaklSum,
          aktSum: tempAktSum,
        }));

        const arrToSetRowsThird = currentAkt?.thirdPartyServices?.map(
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
        const arrToSetRowsServ = currentAkt?.serviceWorks?.map(
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
        setTableAktRows([...arrToSetRowsThird, ...arrToSetRowsServ]);

        const arrToSetRows = currentNakl?.products?.map(
          (inner_item: I_ProductInNakl) => {
            //@ts-ignore
            // console.log(inner_item.product.unit.uniteName);
            return {
              row_id: inner_item._id!.toString(),
              //@ts-ignore
              product: inner_item.product.productName,
              //@ts-ignore
              unit: inner_item.product.unit.unitName,
              extraInformation: inner_item?.extraInformation!,
              amount: inner_item?.amount.toString(),
              price: inner_item?.price.toFixed(2),
              rowSum: (inner_item?.amount * inner_item?.price).toFixed(2),
            };
          }
        );

        setTableNaklRows(arrToSetRows);
      };

      myGetOne();
    }
  }, [id]);

  return (
    <KoshtorisToPrint
      tableAktRows={tableAktRows}
      tableNaklRows={tableNaklRows}
      currentOurFirm={currentOurFirm!}
      currentClient={currentClient!}
      currentContract={currentContract!}
      naklSum={naklSum}
      aktSum={aktSum}
      mode={mode ?? ''}
    />
  );
}
