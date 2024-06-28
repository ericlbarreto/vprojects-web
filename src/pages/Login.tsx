import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/v-projects_logo.svg";
import StartButton from "@/components/StartButton";
import { useAuth } from "@/contexts/authContext";

function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        const serverUrl = "http://localhost:3000/api/auth/login";

        try {
            const response = await fetch(serverUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                login(data.user, data.accessToken);
                if (data.user.role === "SOCIO") {
                    navigate("/homeSocio");
                } else {

                    navigate("/");
                }
            } else {
                setHasError(true);
                setError("E-mail ou senha incorreto(a)");
            }
        } catch (error) {
            console.error("Erro ao enviar dados de login", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-16">
            <div>
                <img src={Logo} className="w-60 h-20" alt="Logo V-Projects" />
            </div>
            <div className="bg-buttonBlueBackground w-96 h-92 p-12 rounded-2xl border border-[#c3b1ff]">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-[#4435fe]">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border rounded-md shadow py-2 px-3 focus:outline-none focus:border-[#4435fe]"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onClick={() => setHasError(false)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="senha" className="text-[#4435fe]">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            className="w-full border rounded-md shadow py-2 px-3 focus:outline-none focus:border-[#4435fe]"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onClick={() => setHasError(false)}
                        />
                    </div>
                    {hasError && <div className="text-red-500 mb-4 text-xs">{error}</div>}
                    <div className="mb-6 text-blue-500">
                        <a href="#" className="underline text-[#959595] italic">Esqueci a senha</a>
                    </div>
                    <div className="flex justify-center">
                        <StartButton className={"bg-[#4435fe] hover:bg-blue-600 text-white font-semibold rounded-md shadow py-2 px-4 w-1/2"} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
