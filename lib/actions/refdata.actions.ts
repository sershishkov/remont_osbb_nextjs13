import { toast } from 'react-toastify';

const errorToMessage = (newError: any) => {
  const message =
    newError?.response?.data?.message ||
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
  // dataObject: MyRequestParams,
  dataObject: any,
  currentURL: string
) => {
  try {
    let queryString = '';
    const sizeObject = Object.keys(dataObject).length;
    if (sizeObject > 0) {
      queryString = '/?';
    }

    for (const field in dataObject) {
      queryString += `${field}=${dataObject[field]}&`;
    }

    const res = await fetch(`/api${currentURL}${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const myData = await res.json();
    if (!res.ok || !myData.my_data) {
      throw new Error(myData.message);
    }
    return myData.my_data;
  } catch (error: any) {
    const message = errorToMessage(error);
    toast.error(`${message}`);
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
    const myData = await res.json();
    if (!res.ok) {
      throw new Error(myData.message);
    } else {
      toast.success(myData.message);
    }
  } catch (error: any) {
    const message = errorToMessage(error);
    toast.error(`${message}`);
  }
};
