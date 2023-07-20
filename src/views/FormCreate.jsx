import React, { useState } from "react";

const FormRegistro = () => {
    const [form, setForm] = useState({
        name: "",
        lastName: "",
        email: "",
        passwordKey: "",
    })

    return (
        <div>
            <h1>Registro</h1>
            <form>
                <label htmlFor="name"></label>
                <input type="text" />

                <label htmlFor="surname"></label>
                <input type="text" />

                <label htmlFor="email"></label>
                <input type="text" />

                <label htmlFor="password"></label>
                <input type="text" />
            </form>
        </div>
    )

}

export default FormRegistro