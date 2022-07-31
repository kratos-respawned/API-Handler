import { useState } from "react";
import Spinner from "./Spinner";

export default function useSpinHook() {
  const [loading, setLoading] = useState(false);
  return [
    loading ? <Spinner /> : null,
    () => setLoading(true),
    () => setLoading(false),
  ];
}
