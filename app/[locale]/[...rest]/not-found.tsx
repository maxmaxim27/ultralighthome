import NotFound from "../not-found";

// Stesso 404 del segmento di lingua, ma con il boundary un livello piu' in
// basso: cosi' il layout fratello (e il suo <title> tradotto) resta dentro
// l'albero renderizzato invece di essere scartato insieme alla pagina.
export default NotFound;
