import { toast } from 'react-toastify';
import { MyRequestParams } from '@/interfaces/CommonInterfaces';

const errorToMessage = (newError: any) => {
  const message =
    (newError?.response &&
      newError.response.data &&
      newError.response.data.message) ||
    newError.message ||
    newError.toString();

  return message;
};

export const item__add = async (
  dataObject: any,
  currentURL: string,
  route: any
) => {
  try {
    const res = await fetch(`/api${currentURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
      cache: 'no-store',
    });
    const myData = await res.json();

    if (!res.ok || !myData.my_data) {
      throw new Error(myData.message);
    }

    toast.success(`${myData.message}`);

    setTimeout(() => {
      route.back();
    }, 2000);
  } catch (error: any) {
    const message = errorToMessage(error);
    toast.error(`${message}`);
  }
};

export const item__edit = async (
  dataObject: any,
  currentURL: string,
  route: any
) => {
  const { _id } = dataObject;
  delete dataObject._id;

  try {
    const res = await fetch(`/api${currentURL}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
      cache: 'no-store',
    });
    const myData = await res.json();

    if (!res.ok || !myData.my_data) {
      throw new Error(myData.message);
    }

    toast.success(`${myData.message}`);

    setTimeout(() => {
      route.back();
    }, 2000);
  } catch (error: any) {
    const message = errorToMessage(error);
    toast.error(`${message}`);
  }
};

export const get__all = async (
  dataObject: MyRequestParams,
  currentURL: string
) => {
  try {
    const res = await fetch(
      `/api${currentURL}/?page=${dataObject?.page}&limit=${dataObject?.limit}&filter=${dataObject?.filter}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const myData = await res.json();
    return myData.my_data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const item__get_one = async (dataObject: any, currentURL: string) => {
  const { _id } = dataObject;
  try {
    const res = await fetch(`/api${currentURL}/${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

      cache: 'no-store',
    });
    const myData = await res.json();
    if (!res.ok) {
      throw new Error(myData.message);
    }

    return myData.my_data;
  } catch (error: any) {
    const message = errorToMessage(error);
    toast.error(`${message}`);
  }
};

export const delete__one = async (_id: string, currentURL: string) => {
  try {
    const res = await fetch(`/api${currentURL}/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Removal is not possible');
    }
    const myData = await res.json();
    toast.success(myData.message);
  } catch (error: any) {
    const message = errorToMessage(error);
    toast.error(`${message}`);
  }
};
