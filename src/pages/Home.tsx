import StartButton from "@/components/StartButton";
import Assesment from "../assets/assesment.svg";
import Tutorial from "../assets/tutorial.svg";

function Home() {
  return (
    <div className="h-screen bg-azulBackground">
      <div className="space-y-6 md:space-y-0 md:grid md:gap-x-6 md:grid-cols-8 md:p-10 sm:p-10 p-8">
        <div className="col-span-5 bg-white rounded-2xl shadow-md">
          <div className="grid gap-x-2 grid-cols-5 py-6 px-6">
            <div className="col-span-3 space-y-14">
              <p>
                <span className="font-extrabold text-[#2d2d2d]">
                  Boas vindas,
                </span>{" "}
                <span className="font-semibold text-[#2d2d2d]">
                  Camila Fontes!
                </span>
              </p>
              <p className="text-justify text-textoCor">
                Você tem uma autoavaliação pendente que precisa ser concluída
                até <b>23/05/2024</b>! Inicie agora, sua colaboração é essencial
                para o nosso progresso contínuo.
              </p>
              <a href="autoav-colab"><StartButton className={"bg-roxoPrincipal w-48 h-9 rounded-md text-white font-semibold hover:bg-[#6929fe] mt-14"}/></a>
            </div>
            <div className="col-span-2 ml-12 flex justify-end">
              <img src={Assesment} className="w-64 h-64" alt="Assesment Icon" />
            </div>
          </div>
        </div>
        <div className="col-start-6 col-span-4 bg-white rounded-2xl shadow-md relative">
          <div className="grid gap-x-2 grid-cols-7">
            <div className="col-span-4 py-6 px-6 space-y-11">
              <p className="font-extrabold text-[#2d2d2d]">
                Tutorial da Plataforma
              </p>
              <p className="text-textoCor">
                Explore todas as funcionalidades e compreenda como elas podem
                aprimorar sua experiência.
              </p>
              <StartButton className={"bg-[#f1f7ff] w-48 h-9 rounded-md text-roxoPrincipal font-semibold hover:bg-[#e7edf5]"} />
            </div>
            <div className="flex flex-col justify-center items-center col-span-3">
              <img src={Tutorial} className="w-60 h-60 absolute bottom-0 right-2 xl:w-72 xl:h-72" alt="Assesment Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
