import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiPencil } from "react-icons/hi2";
import DropDown from "../assets/dropdown.svg";
import Up from "../assets/up.svg";
import { Card360Props } from "@/interfaces/Card360Props";
import { Textarea } from "@/components/ui/textarea";
import ToolTipInfo from "@/components/ToolTipInfo";
import { useState, useEffect, useCallback, useMemo } from "react";
import Grade from "./grade";

const Card360 = ({ collaborator, onRemove, onExpandToggle, isExpanded, onAv360FieldChange, onAv360StatusChange, av360Data, isFinished }: Card360Props) => {
    const [toImproveCharsLeft, setToImproveCharsLeft] = useState(300);
    const [toPraiseCharsLeft, setToPraiseCharsLeft] = useState(300);
    const [edit, setEdit] = useState(false);

    const assessmentData = useMemo(() => av360Data[collaborator.id]?.assessment || { toImprove: "", toPraise: "", behavior: 0, tecniques: 0 }, [av360Data, collaborator.id]);

    useEffect(() => {
        setToImproveCharsLeft(300 - (assessmentData.toImprove?.length || 0));
        setToPraiseCharsLeft(300 - (assessmentData.toPraise?.length || 0));
    }, [assessmentData.toImprove, assessmentData.toPraise]);

    const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
        const value = e.target.value;
        const maxLength = 300;

        if (value.length <= maxLength) {
            onAv360FieldChange(collaborator.id, field, value);
        }
    }, [onAv360FieldChange, collaborator.id]);

    const handleNotaChange = useCallback((field: 'behavior' | 'tecniques', value: number) => {
        onAv360FieldChange(collaborator.id, field, value);
    }, [onAv360FieldChange, collaborator.id]);

    const handleSaveButton = useCallback(() => {
        const { toImprove, toPraise, behavior, tecniques } = assessmentData;
        if (toImprove && toPraise && behavior && tecniques) {
            onAv360StatusChange(collaborator.id, true);
            setEdit(false);

            if (isExpanded) {
                onExpandToggle(collaborator.id);
            }
        } else {
            alert('Todos os campos devem ser preenchidos antes de salvar.');
        }
    }, [assessmentData, isExpanded, onAv360StatusChange, onExpandToggle, collaborator.id]);

    const handleEditClick = useCallback(() => {
        setEdit(true);
        onAv360StatusChange(collaborator.id, false);

        if (!isExpanded) {
            onExpandToggle(collaborator.id);
        }
    }, [isExpanded, onAv360StatusChange, onExpandToggle, collaborator.id]);

    return (
        <div className="mb-8 p-4 border rounded-lg bg-white">
            <div className="flex justify-between items-center relative">
                <div className="grid grid-cols-12 w-full">
                    <div className="flex items-center col-span-1 justify-center">
                        <Avatar>
                            <AvatarImage src={collaborator?.profilePhoto} />
                            <AvatarFallback>{collaborator?.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="col-span-1 col-start-2 text-nowrap">
                        <p className="font-medium text-[#455468]">{collaborator.name}</p>
                        <p className="font-regular text-[#5e718d]">{collaborator.position}</p>
                    </div>

                    <div className="col-span-2 col-start-3 flex items-center justify-center">
                        <div className={`flex items-center justify-center ${av360Data[collaborator.id]?.isFinished ? "bg-[#e3f6ed] text-[#11a75c]" : "bg-[#feffc2] text-[#9b7900]"} w-40 h-6 rounded-sm text-xs font-medium`}>
                            <p>{av360Data[collaborator.id]?.isFinished ? "Finalizado" : "Não finalizado"}</p>
                        </div>
                    </div>

                    {edit && !isFinished && (
                        <div className="flex items-center justify-center col-span-1 col-start-10 mr-6">
                            <button onClick={handleSaveButton} className="font-semibold text-[#5702ff] bg-[#F1F7FF] w-32 h-10 rounded-md hover:bg-[#D9E7FF]">
                                Salvar
                            </button>
                        </div>
                    )}

                    {!isFinished && (
                        <div className="flex items-center space-x-2 col-span-1 col-start-11">
                            <button onClick={handleEditClick} className="flex items-center text-[#5702ff]">
                                <HiPencil className="text-[#5702ff] mr-2" />
                                Editar
                            </button>
                        </div>
                    )}

                    {!isFinished && (
                        <div className="flex items-center col-span-1 col-start-12">
                            <button onClick={() => onRemove(collaborator)} className="text-[#f96464]">
                                Excluir
                            </button>
                        </div>
                    )}
                </div>

                <button onClick={() => onExpandToggle(collaborator.id)} className={`flex justify-center items-center bg-white shadow-xl w-10 h-10 overflow-visible rounded-full absolute ${isExpanded ? 'right-1/2 top-52' : 'right-1/2 top-11'}`}>
                    <img className="h-4 w-4" src={isExpanded ? Up : DropDown} alt="Ícone indicando expansão para baixo" />
                </button>
            </div>

            {isExpanded && (
                <div>
                    <div className="grid grid-cols-12 gap-12 mt-4 px-10">
                        <div className="col-span-4 relative">
                            <div className="flex items-center">
                                <label htmlFor={`toImprove-${collaborator.id}`} className="text-[#455468] font-semibold">Pontos a melhorar</label>
                                <ToolTipInfo text="Áreas onde a pessoa pode se desenvolver, incluindo sugestões para aprimorar habilidades técnicas e comportamentais." />
                            </div>
                            <Textarea
                                id={`toImprove-${collaborator.id}`}
                                name={`toImprove-${collaborator.id}`}
                                className="h-28"
                                placeholder="Digite os pontos a melhorar"
                                value={assessmentData.toImprove}
                                onChange={(e) => handleTextareaChange(e, 'toImprove')}
                                readOnly={!edit}
                            />
                            <p className="text-[#bfbfbf] text-xs text-right">{toImproveCharsLeft}/300</p>
                        </div>
                        <div className="col-span-4">
                            <div className="flex items-center">
                                <label htmlFor={`toPraise-${collaborator.id}`} className="text-[#455468] font-semibold">Pontos a elogiar</label>
                                <ToolTipInfo text="Reconhecer as áreas onde a pessoa se destaca. Inclui elogios sobre suas habilidades, realizações específicas, ou contribuições significativas." />
                            </div>
                            <Textarea
                                id={`toPraise-${collaborator.id}`}
                                name={`toPraise-${collaborator.id}`}
                                className="h-28"
                                placeholder="Digite os pontos a elogiar"
                                value={assessmentData.toPraise}
                                onChange={(e) => handleTextareaChange(e, 'toPraise')}
                                readOnly={!edit}
                            />

                            <p className="text-[#bfbfbf] text-xs text-right">{toPraiseCharsLeft}/300</p>
                        </div>
                        <div className="col-span-4 space-y-11">
                            <div>
                                <div className="flex items-center">
                                    <p className="text-[#455468] font-semibold">Aspectos comportamentais</p>
                                    <ToolTipInfo text="Habilidades interpessoais que não são técnicas, como comunicação, trabalho em equipe, resolução de conflitos, adaptabilidade, entre outros." />
                                </div>

                                <div className="flex items-center">
                                    <p className="mr-2">Nota:</p>
                                    <Grade
                                        grade={assessmentData.behavior}
                                        editFunction={(value: number) => handleNotaChange('behavior', value)}
                                        edit={edit}
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
                                    <Grade
                                        grade={assessmentData.tecniques}
                                        editFunction={(value: number) => handleNotaChange('tecniques', value)}
                                        edit={edit}
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
