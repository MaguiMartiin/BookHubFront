import React from "react";
import { Magui, Yonatan, Ricardo, Franco, Gabriel } from "../SobreNosotros/Nostros";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import Footer from "../../components/Footer/Footer";

const miembros = [
    {
        nombre: "Franco Farid Silva Flores",
        img: Franco,
        linkedin: "https://www.linkedin.com/in/franco-silva-389b69265/",
        github: "https://github.com/Franco22s",
    },
    {
        nombre: "Ricardo Dionel Díaz",
        img: Ricardo,
        linkedin: "https://www.linkedin.com/in/ricardo-dionel-diaz-1b6802236",
        github: "https://github.com/Dionel22",
    },
    {
        nombre: "Gabriel Yopasa Angulo",
        img: Gabriel,
        linkedin: "https://www.linkedin.com/in/gabriel-yopasa-angulo-208665265/",
        github: "https://github.com/GaboYopasa",
    },
    {
        nombre: "Magali Alejandra Martin",
        img: Magui,
        linkedin: "https://www.linkedin.com/in/magali-alejandra-martin/",
        github: "https://github.com/MaguiMartiin",
    },
    {
        nombre: "Yonatan Llanto Aquino",
        img: Yonatan,
        linkedin: "https://www.linkedin.com/in/yonatanllanto/",
        github: "https://github.com/YonatanLLa",
    }
];

const SobreNosotros = () => {
    return (
        <div className="flex flex-col items-center pt-[8rem] justify-center ">
            <div className="flex flex-col justify-center items-center w-full max-w-screen-xl">
                <h1 className="text-blanco font-primary text-4xl mb-8">Sobre nosotros</h1>
                <div className="grid grid-cols-1 gap-[5rem] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-5 justify-items-center">
                    {miembros.map((miembro, index) => (
                        <div key={index} className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                            <div className="h-96 w-72">
                                <img
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                                    src={miembro.img}
                                    alt={miembro.nombre}
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70" />
                            <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                <h1 className="font-dmserif text-3xl font-bold text-white mb-16">{miembro.nombre}</h1>
                                <div className="flex gap-4 py-8">
                                    <a href={miembro.linkedin} target="_blank" className="flex flex-col items-center">
                                        <FiLinkedin className="stroke-white transition duration-300 ease-in-out" size={32} />
                                        <span className="text-white transition duration-300 ease-in-out">Linkedin</span>
                                    </a>
                                    <a href={miembro.github} target="_blank" className="flex flex-col items-center">
                                        <FiGithub className="stroke-white" size={32} />
                                        <span className="text-white">Github</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full mt-[5rem]">
                <Footer/>
            </div>
                    
        </div>
    );
}

export default SobreNosotros;
