import { toast } from 'react-toastify';

export const userProfile__update = async (dataObject: any) => {
  try {
    const res = await fetch(`/api/user/profile/updatedetails`, {
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
