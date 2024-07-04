import { EqCard360Props } from "@/interfaces/EqCard360Props";
import DropDown from "../assets/dropdown.svg";
import Up from "../assets/up.svg";
import ToolTipInfo from "./ToolTipInfo";
import { Textarea } from "./ui/textarea";
import { useMemo } from "react";
import Eq360Grade from "./eq360grade";

const EqCard360 = ({ av360Data, evaluator, onExpandToggle, isExpanded }: EqCard360Props) => {
    const assessmentData = useMemo(() => av360Data[evaluator.id]?.assessment || { toImprove: "", toPraise: "", behavior: 0, tecniques: 0 }, [av360Data, evaluator.id]);

    return (
        <div className="mb-8 p-4 border rounded-lg bg-white">
            <div className="flex justify-between items-center relative">
                <div className="grid grid-cols-12 w-full">
                    <div className="flex items-center col-span-1 justify-center">
                        <img className="rounded-full size-10" src={evaluator?.profilePhoto} alt="Evaluator profile photo" />
                    </div>

                    <div className="col-start-2">
                        <p className="font-medium text-[#455468]">{evaluator.name}</p>
                        <p className="font-regular text-[#5e718d]">{evaluator.position}</p>
                    </div>
                </div>

                <button onClick={() => onExpandToggle(evaluator.id)} className={`flex justify-center items-center bg-white shadow-xl w-10 h-10 overflow-visible rounded-full absolute ${isExpanded ? 'right-1/2 top-52' : 'right-1/2 top-11'}`}>
                    <img className="h-4 w-4" src={isExpanded ? Up : DropDown} alt="Ícone indicando expansão para baixo" />
                </button>
            </div>

            {isExpanded && (
                <div>
                    <div className="grid grid-cols-12 gap-12 mt-4 px-10">
                        <div className="col-span-4 relative">
                            <div className="flex items-center">
                                <label htmlFor={`toImprove-${evaluator.id}`} className="text-[#455468] font-semibold">Pontos a melhorar</label>
                                <ToolTipInfo text="Áreas onde a pessoa pode se desenvolver, incluindo sugestões para aprimorar habilidades técnicas e comportamentais." />
                            </div>
                            <Textarea
                                id={`toImprove-${evaluator.id}`}
                                name={`toImprove-${evaluator.id}`}
                                className="h-28"
                                placeholder="Digite os pontos a melhorar"
                                value={assessmentData.toImprove}
                                readOnly={true}
                            />
                            <p className="text-[#bfbfbf] text-xs text-right">{assessmentData.toImprove?.length || 0}/300</p>
                        </div>
                        <div className="col-span-4">
                            <div className="flex items-center">
                                <label htmlFor={`toPraise-${evaluator.id}`} className="text-[#455468] font-semibold">Pontos a elogiar</label>
                                <ToolTipInfo text="Reconhecer as áreas onde a pessoa se destaca. Inclui elogios sobre suas habilidades, realizações específicas, ou contribuições significativas." />
                            </div>
                            <Textarea
                                id={`toPraise-${evaluator.id}`}
                                name={`toPraise-${evaluator.id}`}
                                className="h-28"
                                placeholder="Digite os pontos a elogiar"
                                value={assessmentData.toPraise}
                                readOnly={true}
                            />

                            <p className="text-[#bfbfbf] text-xs text-right">{assessmentData.toPraise?.length || 0}/300</p>
                        </div>
                        <div className="col-span-4 space-y-11">
                            <div>
                                <div className="flex items-center">
                                    <p className="text-[#455468] font-semibold">Aspectos comportamentais</p>
                                    <ToolTipInfo text="Habilidades interpessoais que não são técnicas, como comunicação, trabalho em equipe, resolução de conflitos, adaptabilidade, entre outros." />
                                </div>

                                <div className="flex items-center">
                                    <p className="mr-2">Nota:</p>
                                    <Eq360Grade
                                        grade={assessmentData.behavior}
                                    />

                                </div>
                            </div>

                            <div>
                                <div className="flex items-center">
                                    <p className="text-[#455468] font-semibold">Aspectos técnicos</p>
                                    <ToolTipInfo text="Proficiência em ferramentas, técnicas, metodologias, softwares, e conhecimentos especializados." />
                                </div>

                                <div className="flex items-center">
                                    <p className="mr-2">Nota:</p>
                                    <Eq360Grade
                                        grade={assessmentData.tecniques}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default EqCard360;