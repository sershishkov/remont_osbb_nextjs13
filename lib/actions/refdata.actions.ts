import { toast } from 'react-toastify';

interface getObject {
  page: string;
  limit: string;
  filter: string;
}

export const get__all = async (dataObject: getObject, currentURL: string) => {
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

export const delete__one = async (_id: string, currentURL: string) => {
  try {
    const res = await fetch(`/api${currentURL}/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const myData = await res.json();
    toast.success(myData.message);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const item__add = async (dataObject: any, currentURL: string) => {
  try {
    const res = await fetch(`${currentURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
      cache: 'no-store',
    });
    const myData = await res.json();
    if (!res.ok) {
      throw new Error(myData.message);
    }

    return myData;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(`${message}`);
  }
};

export const item__get_one = async (dataObject: any, currentURL: string) => {
  const { _id } = dataObject;
  try {
    const res = await fetch(`${currentURL}/${_id}`, {
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
    console.log('myData.my_data', myData.my_data);
    return myData.my_data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(`${message}`);
  }
};

export const item__edit = async (dataObject: any, currentURL: string) => {
  const { _id } = dataObject;
  delete dataObject._id;

  try {
    const res = await fetch(`${currentURL}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
      cache: 'no-store',
    });
    const myData = await res.json();
    if (!res.ok) {
      throw new Error(myData.message);
    }

    return myData;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(`${message}`);
  }
};
