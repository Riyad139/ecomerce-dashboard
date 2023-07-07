"use client";

import { useStoreModal } from "@/hooks/store-hooks";
import StoreDialog from "./StoreDialog";

export default function Dialog() {
  const useStore = useStoreModal();
  console.log(useStore.isOpen);
  return (
    <StoreDialog
      isOpen={useStore.isOpen}
      onClose={useStore.onClose}
      title="Hello hello"
      description="hel;lo hello"
    />
  );
}
