import { ImInstagram, ImTwitter, ImFacebook, ImLinkedin } from "react-icons/im"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="w-full mt-[8rem] py-16 px-6 bg-[#FFF2F5] border-t">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Sintonia Logo" className="h-10 w-10 rounded-full" />
                <span className="text-2xl font-semibold text-[#6D243F]">Sintonia</span>
              </div>
              <p className="text-gray-600 max-w-xs">
                Fortalecendo relacionamentos através da tecnologia e da conexão emocional.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="text-[#6D243F] border-[#FF006F]/20 hover:bg-[#FF006F] hover:text-white transition-all"
                >
                  Contato
                </Button>
                <Button
                  variant="outline"
                  className="text-[#6D243F] border-[#FF006F]/20 hover:bg-[#FF006F] hover:text-white transition-all"
                >
                  Site
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#6D243F]">Links Rápidos</h3>
              <ul className="space-y-3">
                <li>
                  <a href="" className="text-gray-600 hover:text-[#FF006F] transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="" className="text-gray-600 hover:text-[#FF006F] transition-colors">
                    Planos & Preços
                  </a>
                </li>
                <li>
                  <a href="" className="text-gray-600 hover:text-[#FF006F] transition-colors">
                    Documentação
                  </a>
                </li>
                <li>
                  <a href="" className="text-gray-600 hover:text-[#FF006F] transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#6D243F]">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="" className="text-gray-600 hover:text-[#FF006F] transition-colors">
                    Termos de Serviço
                  </a>
                </li>
                <li>
                  <a href="" className="text-gray-600 hover:text-[#FF006F] transition-colors">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="" className="text-gray-600 hover:text-[#FF006F] transition-colors">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="" className="text-gray-600 hover:text-[#FF006F] transition-colors">
                    Licenças
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#6D243F]">Conecte-se</h3>
              <ul className="flex gap-4">
                <li>
                  <a
                    href="#"
                    className="flex hover:cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-[#FF006F]/10 text-[#FF006F] hover:bg-[#FF006F] hover:text-white transition-all"
                  >
                    <ImInstagram size={20} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex hover:cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-[#FF006F]/10 text-[#FF006F] hover:bg-[#FF006F] hover:text-white transition-all"
                  >
                    <ImTwitter size={20} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex hover:cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-[#FF006F]/10 text-[#FF006F] hover:bg-[#FF006F] hover:text-white transition-all"
                  >
                    <ImFacebook size={20} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex hover:cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-[#FF006F]/10 text-[#FF006F] hover:bg-[#FF006F] hover:text-white transition-all"
                  >
                    <ImLinkedin size={20} />
                  </a>
                </li>
              </ul>
              <div className="pt-4">
                <p className="text-gray-600">Contato:</p>
                <a href="mailto:suporte@lithiumtch.com.br" className="text-[#FF006F] hover:cursor-pointer hover:text-[#6D243F] transition-colors">
                suporte@lithiumtch.com.br
                </a>
              </div>
            </div>
          </div>

          <div className="border-[#B42A76]/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Sintonia. Todos os direitos reservados.
              </p>
              <p className="text-sm text-gray-500">Feito com ❤️ para casais</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

