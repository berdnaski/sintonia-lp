import { Button } from "../ui/button";

export function Header() {
  return (
    <div className="border-b border-[#636060]">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto h-[90px] border-zinc-300">
      <h1 className="sm:px-8 xl:px-0 font-black text-3xl">Sintonia</h1>

      <div className="flex flex-row items-center justify-center">
        <ul className="flex flex-row gap-12">
          <li className="text-xl font-semibold hover:cursor-pointer hover:text-zinc-900">Benefícios</li>
          <li className="text-xl font-semibold hover:cursor-pointer hover:text-zinc-900">Planos</li>
          <li className="text-xl font-semibold hover:cursor-pointer hover:text-zinc-900">Contatos</li>
        </ul>
      </div>

      <div className="gap-4 flex">
        <Button className="bg-[#FF708B] hover:bg-[#FA6B86] px-8 text-xl font-normal hover:cursor-pointer rounded-full">Entrar</Button>
        <Button className="text-xl text-[#FF708B] font-normal bg-transparent border-1 rounded-full border-[#FF708B] hover:bg-transparent hover:cursor-pointer">Cadastrar</Button>
      </div>
    </div>
    </div>
  )
}
