import { useEffect } from "react";
import Header from "../components/Header";
import '../styles/homepage.css';

function HomePage() {
    useEffect(() => {
        if (!document.querySelector('script[src="/scripts/HomePageBackgroundEffects.js"]')) {
            const script = document.createElement('script');
            script.src = '/scripts/HomePageBackgroundEffects.js';
            script.async = true;
            document.body.appendChild(script);
        }

        return () => {
            // opcional: se quiser remover ao desmontar
            // document.querySelector('script[src="/scripts/HomePageBackgroundEffects.js"]')?.remove();
        };
    }, []);
    return (
        <>
            <Header />
            <div className="universe-container d-flex justify-content-center align-items-center">
                <div className="d-flex p-5 justify-content-around">
                    <img src="/logo512.png" width={300} height={300} alt="img home page" />
                    <div className="text-light my-auto gap-5 w-50 d-flex flex-column">
                        <h2 className="mx-auto fs-4 fw-lighter">Gerencie seus trabalhos com facilidade</h2>
                        <h2 className="mx-auto fs-4 text-center fw-lighter">Usando nossa ferramenta para controlar seus trabalhos você nunca mais terá problemas.</h2>
                        <h1 className="mx-auto fw-light">SpaceTask</h1>
                    </div>
                </div>
                <div className="stars-container" id="starsContainer"></div>
            </div>
            <main className="w-100">
                <button>Quero Utilizar</button>
                <div>
                    <h1>E aí, vai utilizar nossa <a style={{ color: "#702A98" }}>ferramenta?</a></h1>
                    <h1>Veja as vantagens</h1>
                    <ul>
                        <li>Organização e facilidade de acesso.</li>
                        <li>Usabilidade e comprometimento com o usuário.</li>
                        <li>Suporte sempre disponível e pronto para ação.</li>
                    </ul>
                </div>
            </main>
        </>
    )
}

export default HomePage