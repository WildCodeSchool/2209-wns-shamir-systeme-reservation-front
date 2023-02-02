export const regexInput = /[<>/;]/g;

export const regexNumber = /[0-9]/g;

export const regexAlpha = /[a-zA-Z]/g;

export const readableDate = (stringDate: string) => {
    const date = new Date(stringDate);
    return date.toLocaleDateString('fr-FR')
}
