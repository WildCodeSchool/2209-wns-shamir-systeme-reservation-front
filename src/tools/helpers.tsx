import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GET_USER } from "./queries";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return null;
}

