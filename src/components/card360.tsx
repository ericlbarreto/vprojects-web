import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiPencil } from "react-icons/hi2";
import DropDown from "../assets/dropdown.svg";
import Up from "../assets/up.svg";
import { Card360Props } from "@/interfaces/Card360Props";
import { Textarea } from "@/components/ui/textarea";
import ToolTipInfo from "@/components/ToolTipInfo";
import NotaQuadrada from "./notaQuadrada";
import { useState } from "react";

const Card360 = ({ collaborator, onRemove, onExpandToggle, isExpanded, onAv360FieldChange, av360Data }: Card360Props) => {
    const [toImproveCharsLeft, setToImproveCharsLeft] = useState(300);
    const [toPraiseCharsLeft, setToPraiseCharsLeft] = useState(300);

    const assessmentData = av360Data[collaborator.id]?.assessment || { toImprove: "", toPraise: "", behavior: 0, tecniques: 0 };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
        const value = e.target.value;
        const maxLength = 300;

        if (value.length <= maxLength) {
            onAv360FieldChange(collaborator.id, field, value);

            if (field === 'toImprove') {
                setToImproveCharsLeft(maxLength - value.length);
            } else if (field === 'toPraise') {
                setToPraiseCharsLeft(maxLength - value.length);
            }
        }
    };

    const handleNotaChange = (field: 'behavior' | 'tecniques', value: number) => {
        onAv360FieldChange(collaborator.id, field, value);
    };

    return (
        <div className="mb-8 p-4 border rounded-lg bg-white">
            <div className="flex justify-between items-center relative">
                <div className="grid grid-cols-12 w-full">
                    <div className="flex items-center col-span-1 justify-center">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="col-span-1 col-start-2">
                        <p className="font-medium text-[#455468]">{collaborator.name}</p>
                        <p className="font-regular text-[#5e718d]">{collaborator.position}</p>
                    </div>

                    <div className="col-span-2 col-start-3 flex items-center justify-center">
                        <div className="flex items-center justify-center bg-[#feffc2] w-40 h-6 rounded-sm text-xs text-[#9b7900] font-medium">
                            <p>Não finalizado</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 col-span-1 col-start-11">
                        <button className="flex items-center text-[#5702ff]">
                            <HiPencil className="text-[#5702ff] mr-2" />
                            Editar
                        </button>
                    </div>

                    <div className="flex items-center col-span-1 col-start-12">
                        <button onClick={() => onRemove(collaborator)} className="text-[#f96464]">
                            Excluir
                        </button>
                    </div>
                </div>

                <button onClick={() => onExpandToggle(collaborator.id)} className={`flex justify-center items-center bg-white shadow-xl w-10 h-10 overflow-visible rounded-full absolute ${isExpanded ? 'right-1/2 top-60' : 'right-1/2 top-11'}`}>
                    <img className="h-4 w-4" src={isExpanded ? Up : DropDown} alt="Ícone indicando expansão para baixo" />
                </button>
            </div>

            {isExpanded && (
                <div>
                    <div className="grid grid-cols-12 gap-12 mt-4 px-10">
                        <div className="col-span-4 relative">
                            <div className="flex items-center">
                                <p className="text-[#455468] font-semibold">Pontos a melhorar</p>
                                <ToolTipInfo text="Áreas onde a pessoa pode se desenvolver, incluindo sugestões para aprimorar habilidades técnicas e comportamentais." />
                            </div>
                            <Textarea
                                className="h-28"
                                placeholder="Digite os pontos a melhorar"
                                value={assessmentData.toImprove}
                                onChange={(e) => handleInputChange(e, 'toImprove')}
                            />
                            <p className="text-[#bfbfbf] text-xs text-right">{toImproveCharsLeft}/300</p>
                        </div>
                        <div className="col-span-4">
                            <div className="flex items-center">
                                <p className="text-[#455468] font-semibold">Pontos a elogiar</p>
                                <ToolTipInfo text="Reconhecer as áreas onde a pessoa se destaca. Inclui elogios sobre suas habilidades, realizações específicas, ou contribuições significativas." />
                            </div>
                            <Textarea
                                className="h-28"
                                placeholder="Digite os pontos a elogiar"
                                value={assessmentData.toPraise}
                                onChange={(e) => handleInputChange(e, 'toPraise')}
                            />
                            <p className="text-[#bfbfbf] text-xs text-right">{toPraiseCharsLeft}/300</p>
                        </div>
                        <div className="col-span-4 space-y-11">
                            <div>
                                <div className="flex items-center">
                                    <p className="text-[#455468] font-semibold">Aspectos comportamentais</p>
                                    <ToolTipInfo text="Habilidades interpessoais que não são técnicas, como comunicação, trabalho em equipe, resolução de conflitos, adaptabilidade, entre outros. " />
                                </div>

                                <div className="flex items-center">
                                    <p className="mr-2">Nota:</p>
                                    <NotaQuadrada
                                        isStatic={0}
                                        nota={assessmentData.behavior}
                                        funcaoNota={(value: number) => handleNotaChange('behavior', value)}
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
                                    <NotaQuadrada
                                        isStatic={0}
                                        nota={assessmentData.tecniques}
                                        funcaoNota={(value: number) => handleNotaChange('tecniques', value)}
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

export default Card360;
