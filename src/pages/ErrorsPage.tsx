import Logo from '../assets/v-projects_logo.svg'

export function UnauthorizedPage() {
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl font-bold text-roxoPrincipal">403 | Você não tem permissão pra acessar essa página</h1>
        </div>
    )
}

export function NotFoundPage() {
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl font-bold text-roxoPrincipal">404 | Página não encontrada</h1>
        </div>
    )
}