import { Av360 } from "@/interfaces/Av360";
import { User } from "@/interfaces/User";
import { getAllCollaborators, getReceivedAv360 } from "@/services/restServices";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import EqCard360 from "./eqCard360";

function EqAv360() {
   const [loading, setLoading] = useState(true);
   const [av360Data, setAv360Data] = useState<{ [key: number]: Av360 }>({});
   const [evaluators, setEvaluators] = useState<User[]>([]);
   const [expandedEvaluators, setExpandedEvaluators] = useState<{ [key: number]: boolean }>({});

   useEffect(() => {
      const fetchAv360Data = async () => {
         setLoading(true);

         const queryParams = new URLSearchParams(location.search);
         const idCycleEqParam = queryParams.get("idCycleEqParam");
         const colabId = queryParams.get("colabId");

         try {
            const response = await getReceivedAv360(Number(colabId), Number(idCycleEqParam));
            const av360DataMap = response!.reduce((acc: { [key: number]: Av360 }, item: any) => {
               acc[item.evaluatorId] = {
                  evaluatorId: item.evaluatorId,
                  evaluatedId: item.evaluatedId,
                  cycleId: item.cycleId,
                  isFinished: item.isFinished,
                  assessment: {
                     idReview: item.PeerReviewScores.id,
                     behavior: item.PeerReviewScores.behavior,
                     tecniques: item.PeerReviewScores.tecniques,
                     toImprove: item.PeerReviewScores.toImprove,
                     toPraise: item.PeerReviewScores.toPraise
                  }
               };
               return acc;
            }, {});
            setAv360Data(av360DataMap);
         } finally {
            setLoading(false);
         }
      };

      fetchAv360Data();
   }, []);

   useEffect(() => {
      const fetchCollaborators = async () => {
         const collaborators = await getAllCollaborators();
         const filteredCollaborators = collaborators.filter((collaborator: User) => av360Data.hasOwnProperty(collaborator.id));
         setEvaluators(filteredCollaborators);
      };

      fetchCollaborators();
   }, [av360Data]);

   const toggleExpand = (id: number) => {
      setExpandedEvaluators(prevState => ({
         ...prevState,
         [id]: !prevState[id]
      }));
   };

   if (loading) {
      return <div className="h-screen flex justify-center items-center"><Oval color="blue" height="80" width="80" /></div>;
   }

   return (
      <div className="ml-4 mt-4 space-y-4">
         <h1 className="text-xl font-medium">
            Listagem de avaliação dos colaboradores avaliadores
         </h1>

         <div>
            {evaluators.map(evaluator => (
               <EqCard360
                  key={evaluator.id}
                  evaluator={evaluator}
                  onExpandToggle={toggleExpand}
                  isExpanded={expandedEvaluators[evaluator.id] || false}
                  av360Data={av360Data}
               />
            ))}
         </div>
      </div>
   );
}

export default EqAv360;