import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";

export type Message = {
  error: {
    [key: string]: string;
    default: string;
  };
  success?: {
    [key: string]: string;
  };
};

export function useResponseMessages () {
  const toastError = (error: unknown, messages: Message) => {
    if (isAxiosError(error)) {
      const code = error.response?.data.code as string;

      if (code in messages.error) {
        toast.error(messages.error[code]);
        return
      }

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
