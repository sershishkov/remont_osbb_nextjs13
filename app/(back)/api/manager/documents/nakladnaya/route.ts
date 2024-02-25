import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/(back)/api/auth/[...nextauth]/options';
import DocumentNakladnaya from '@/lib/mongoose/models/manager/documents/Model__DocumentNakladnaya';

import Model__Contract from '@/lib/mongoose/models/manager/refdata/Model__Contract';
import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';
import Model__StoreHouse from '@/lib/mongoose/models/accountant/refData/Model__StoreHouse';
import Model__Product from '@/lib/mongoose/models/manager/refdata/Model__Product';
import Model__Unit from '@/lib/mongoose/models/manager/refdata/Model__Unit';

import { I_ProductInNakl } from '@/interfaces/refdata';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const POST = async (request: NextRequest) => {
  const {
    nakladnayaNumber,
    nakladnayaDate,
    contract,

    products,
    storeHouse,

    isActive,

    typeNakl,

    naklOurFirm,
    naklClient,
  } = await request.json();
  if (
    !nakladnayaNumber ||
    !contract ||
    !products ||
    (products && products.length === 0) ||
    !storeHouse
  ) {
    return new NextResponse(
      JSON.stringify({
        message: 'Please add all fields ',
      }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    // Check if already exists
    const already__Exists = await DocumentNakladnaya.findOne({
      nakladnayaNumber,
    });

    if (already__Exists) {
      return new NextResponse(
        JSON.stringify({
          message: 'This item already exists',
        }),
        {
          status: 400,
        }
      );
    }
    const session = await getServerSession(authOptions);

    const new__ITEM = await DocumentNakladnaya.create({
      nakladnayaNumber,
      nakladnayaDate,
      contract,

      products,
      storeHouse,

      isActive,
      creator: session?.user._id,
      typeNakl,

      naklOurFirm,
      naklClient,
    });

    if (!new__ITEM) {
      return new NextResponse(
        JSON.stringify({
          message: 'Не удалось создать накладную',
        }),
        {
          status: 400,
        }
      );
    }

    if (typeNakl === 'incoming') {
      updateRecomendPriceInProducts([...products]);
    }

    const responseObj = {
      message: 'Добавлено успешно',
      my_data: new__ITEM,
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') ?? '0');
  const pageSize = parseInt(url.searchParams.get('limit') ?? '0');
  const skip = (page - 1) * pageSize;

  const filterSTR = url.searchParams.get('filter') ?? '';

  const contract = url.searchParams.get('contract') ?? '';
  const naklOurFirm = url.searchParams.get('naklOurFirm') ?? '';
  const naklClient = url.searchParams.get('naklClient') ?? '';

  const naklDateStart = url.searchParams.get('naklDateStart') ?? '';
  const naklDateEnd = url.searchParams.get('naklDateEnd') ?? '';

  let filterObject = {};
  const andArr = [];

  if (filterSTR) {
    const myRegex = { $regex: filterSTR, $options: 'i' };

    const orObject = {
      $or: [
        {
          nakladnayaNumber: myRegex,
        },
      ],
    };

    andArr.push(orObject);
  }

  if (contract) {
    andArr.push({ contract: contract });
  }
  if (naklOurFirm) {
    andArr.push({ naklOurFirm: naklOurFirm });
  }
  if (naklClient) {
    andArr.push({ naklClient: naklClient });
  }

  if (naklDateStart && naklDateEnd) {
    andArr.push({
      nakladnayaDate: {
        $gte: new Date(naklDateStart),
        $lte: new Date(naklDateEnd),
      },
    });
  }

  if (andArr.length > 0) {
    filterObject = {
      $and: andArr,
    };
  }

  try {
    await connectToDB();

    const total: number = await DocumentNakladnaya.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await DocumentNakladnaya.find(filterObject)

      .limit(pageSize)
      .skip(skip)
      .sort({
        nakladnayaDate: -1,
      })
      .populate({
        path: 'contract',
        model: Model__Contract,
        select: 'contractNumber contractDescription',
        populate: [
          {
            path: 'ourFirm',
            model: Model__Client,
            select: 'clientShortName',
          },
          {
            path: 'client',
            model: Model__Client,
            select: 'clientShortName',
          },
        ],
      })
      .populate({
        path: 'products.product',
        model: Model__Product,
        select: 'productName',
        populate: [
          {
            path: 'unit',
            model: Model__Unit,
            select: 'unitName',
          },
        ],
      })
      .populate({
        path: 'storeHouse',
        model: Model__StoreHouse,
        select: 'storeHouseName',
      });

    if (!all__ITEMS) {
      return new NextResponse(
        JSON.stringify({
          message: 'На данный момент ничего в базе нет',
        }),

        {
          status: 400,
        }
      );
    }

    const responseObj = {
      message: 'Найдено успешно',
      my_data: {
        items: all__ITEMS,
        total,
        totalPages,
      },
    };
    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const updateRecomendPriceInProducts = async (
  products: I_ProductInNakl[]
) => {
  for (const row of products) {
    await Model__Product.findByIdAndUpdate(row.product, {
      priceBuyRecommend: row.price,
    });
  }
};
// @sonar-stop
// const saveProductsToStore = async (
//   products: any[],
//   typeNakl: string,
//   storeHouse: string,
//   res: Response
// ) => {
//   const currentStore = await Model__StoreHouse.findById(storeHouse);
//   const currProductsInStore = [...currentStore?.products!];
//   const productsInNakl = [...products];

//   if (typeNakl === 'incoming' || typeNakl === 'returnFromBuyer') {
//     productsInNakl.forEach(async (itemNakl) => {
//       const findIndexProductInStore = currProductsInStore?.findIndex(
//         (item) => item.product === itemNakl.product
//       );
// @sonar-stop
//       if (findIndexProductInStore === -1) {
//         currProductsInStore.push({
//           product: itemNakl.product,
//           amount: itemNakl.amount,
//           priceBuy_inStore: itemNakl.priceBuy,
//         });
//       } else {
//         const oldProduct = currProductsInStore[findIndexProductInStore];
//         const newProduct = {
//           product: itemNakl.product,
//           amount: itemNakl.amount + oldProduct.amount,
//           priceBuy_inStore:
//             (itemNakl.priceBuy * itemNakl.amount +
//               oldProduct.amount * oldProduct.priceBuy_inStore) /
//             (itemNakl.amount + oldProduct.amount),
//         };

//         currProductsInStore.splice(findIndexProductInStore, 1, newProduct);
//       }
//       if (typeNakl === 'incoming') {
//         await Model__Product.findByIdAndUpdate(itemNakl.product, {
//           priceBuy_recommend: itemNakl.priceBuy,
//         });
//       }
//     });
//   } else {
//     productsInNakl.forEach((itemNakl) => {
//       const findIndexProductInStore = currProductsInStore?.findIndex(
//         (item) => item.product === itemNakl.product
//       );
// @sonar-stop
//       if (findIndexProductInStore === -1) {
//         res.status(400);
//         throw new Error('Нет такого товара на складе');
//       } else {
//         const oldProduct = currProductsInStore[findIndexProductInStore];
//         const newProduct = {
//           product: itemNakl.product,
//           amount: oldProduct.amount - itemNakl.amount,
//           priceBuy_inStore: oldProduct.priceBuy_inStore,
//         };

//         currProductsInStore.splice(findIndexProductInStore, 1, newProduct);
//       }
//     });
//   }
//   await Model__StoreHouse.findByIdAndUpdate(storeHouse, {
//     products: currProductsInStore,
//   });
// };
// @sonar-stop
//////////////////////////////////////
// const updateProductsInStore = async (
//   old__DocumentNakladnaya: I_DocumentNakladnaya,
//   products: any[],
//   typeNakl: string,
//   storeHouse: string,
//   res: Response
// ) => {
//   // Сделать реверс старой накладной а затем вызвать saveProductsToStore с новыми данными
// };
