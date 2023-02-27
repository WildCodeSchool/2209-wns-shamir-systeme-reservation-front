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

// récupère le nombre de jours entre 2 dates string
export const getPeriod = (from: string, to: string) => {
    const dateFrom = new Date(from).getTime();
    const dateTo = new Date(to).getTime();
    const diff = 1 + ((dateTo - dateFrom) / (1000*3600*24))
    return diff
}
