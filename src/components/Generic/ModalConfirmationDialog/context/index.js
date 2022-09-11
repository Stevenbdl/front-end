import { useState } from "react";

export const useDeleteDialog = ({ value }) => {
  const [currentValue, setCurrentValue] = useState(value);


  return { currentValue, setCurrentValue };
}