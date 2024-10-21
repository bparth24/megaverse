import axios from 'axios';

/**
 * Handles an error by logging the error message.
 * 
 * @param error - The error to handle.
 * @param message - The message to log along with the error.
 */
export const handleError = (error: any, message: string): void => {
  if (axios.isAxiosError(error)) {
    console.error(`${message}: ${error.response?.data}`);
  } else {
    console.error(`${message}: ${error.message}`);
  }
};