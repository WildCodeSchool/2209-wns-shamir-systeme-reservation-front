import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

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

// check si composé de chiffres
export const regexNumber = /[0-9]/g;

// check si composé de chiffres avec décimale
export const regexFloat = /[0-9,\.]/g;

// check si composé de lettres
export const regexAlpha = /[a-zA-Z]/g;

// transforme une date string type datetime en date jj/mm/AAAA
export const readableDate = (stringDate: string) => {
    const date = new Date(stringDate);
    return date.toLocaleDateString('fr-FR')
}

// transforme une date ( type Date) en string jj/mm/AAAA
export const formatDate = (date: Date ): string | undefined=> {
  let dateInitiale = new Date(date);
  /// Extraire le jour, le mois et l'année avec la méthode split()
  let jour = dateInitiale.getDate().toString().padStart(2, "0");
  let mois = (dateInitiale.getMonth() + 1).toString().padStart(2, "0");
  let annee = dateInitiale.getFullYear().toString();
  // Concaténer les éléments dans une chaîne de caractères dans le format "jj/mm/aaaa"
  let dateString = jour + "/" + mois + "/" + annee;
  return dateString;
};

// récupère le nombre de jours entre 2 dates string en incluant le jour de fin
export const getPeriod = (from: string, to: string) => {
    const dateFrom = new Date(from).getTime();
    const dateTo = new Date(to).getTime();
    const diff = 1 + ((dateTo - dateFrom) / (1000*3600*24))
    return diff
}

// modèle de toast alerte
export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
