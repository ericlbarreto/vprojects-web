
interface BolinhaNumProps{
    num:string
}

function BolinhaNum({num}:BolinhaNumProps) {
  return <div className="text-roxoPrincipal font-bold rounded-full shadow m-4 w-8 h-8 text-center pt-1">{num}</div>
}

export default BolinhaNum;
