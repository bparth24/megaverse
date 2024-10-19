import axios from 'axios';

export const handleError = (error: any, message: string): void => {
  if (axios.isAxiosError(error)) {
    console.error(`${message}: ${error.response?.data}`);
  } else {
    console.error(`${message}: ${error.message}`);
  }
};