import { useToast } from "@/hooks/use-toast";

export const showSuccess = (message: string) => {
  const { addToast } = useToast();
  addToast({
    title: "Success",
    description: message,
    duration: 3000,
  });
};

export const showError = (message: string) => {
  const { addToast } = useToast();
  addToast({
    title: "Error",
    description: message,
    duration: 3000,
    action: null,
  });
};

export const showInfo = (message: string) => {
  const { addToast } = useToast();
  addToast({
    title: "Info",
    description: message,
    duration: 3000,
  });
};