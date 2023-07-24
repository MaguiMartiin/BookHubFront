const validacion = ({ name, description, price, author, gender }) => {
    let errors = {};
    if (!name) {
        errors.name = "Required name";
    }
    if (!description) {
        errors.description = "Required description";
    }
    if (!price) {
        errors.price = "Required price";
    }
    if (!author) {
        errors.author = "Required author"
    }
    if (!gender) {
        errors.gender = "Required gender"
    }
    return errors;
}
export default validacion;