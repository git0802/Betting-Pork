import { toast } from "react-toastify";

const toastErrorMessage = (error: any) => {
  const errors: any = error.response?.data?.errors;
  let messageError: string = '';
  if (errors) {
    Object.keys(errors).map((key, index) => {
      if (errors?.[key] && typeof errors[key] === 'string') {
        if (index === 0)
          messageError = errors[key]
        else
          messageError = `${messageError}\n${errors[key]}`
      } else {
        if (index === 0)
          messageError = errors?.[key]?.[0]
        else
          messageError = `${messageError}\n${errors?.[key]?.[0]}`
      }
    })
    if (messageError) {
      toast.error(messageError, {
        bodyStyle: {
          whiteSpace: 'pre-wrap'
        }
      });
    }
  }
}

export default toastErrorMessage;