function BolinhaNum({ num, className }: BolinhaNumProps) {
  return (
    <div className={`flex items-center justify-center text-roxoPrincipal font-bold rounded-full shadow w-12 h-12 text-center${className}`}>
      <span>{num}</span>
    </div>
  )
}

export default BolinhaNum;
