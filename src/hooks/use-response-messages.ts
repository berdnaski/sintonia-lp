import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";

export type InviteMessages = {
  error: {
    [key: string]: string;
    default: string;
  };
  success: {
    [key: string]: string;
  };
};

export function useResponseMessages () {
  const toastError = (error: unknown, messages: InviteMessages) => {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data.message as string;

      if (errorMessage in messages.error) {
        toast.error(messages.error[errorMessage]);
        return;
      }
    }

    toast.error(messages.error.default);
  }

  return {
    toastError
  }
}
