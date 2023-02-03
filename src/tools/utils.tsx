import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// renvoie en haut de la page à chaque navigation
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return null;
}

// check caractères spéciaux
export const regexInput = /[<>/;]/g;

// check si uniquement composé de chiffres
export const regexNumber = /[0-9]/g;

// check si uniquement composé de lettres
export const regexAlpha = /[a-zA-Z]/g;

// transforme une date string type datetime en date jj/mm/AAAA
export const readableDate = (stringDate: string) => {
    const date = new Date(stringDate);
    return date.toLocaleDateString('fr-FR')
}
