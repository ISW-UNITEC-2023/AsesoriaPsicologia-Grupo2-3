export const formatMoney = (dinero) => {
    if (dinero !== null && dinero !== undefined) {
        return dinero.toLocaleString("es-HN", {
            style: "currency",
            currency: "HNL",
        });
    }
    console.log("dinero", dinero);
    // Maneja el caso en que dinero sea null o undefined, por ejemplo, puedes devolver un valor predeterminado o un mensaje de error.
    return "Monto no disponible";
};
