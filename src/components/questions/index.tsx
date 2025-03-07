import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, Clock, CreditCard, MessageCircle, Shield } from "lucide-react";

const questions = [
  {
    question: "Como funciona a IA do Sintonia?",
    answer: "O Sintonia utiliza inteligência artificial avançada para analisar padrões de comunicação e comportamento no seu relacionamento. Nossa IA identifica sinais sutis e fornece insights personalizados para ajudar você a fortalecer sua conexão com seu parceiro(a)."
  },
  {
    question: "Como o Sintonia pode ajudar meu relacionamento?",
    answer: "O Sintonia oferece alertas preventivos, análises comportamentais e sugestões práticas para melhorar a comunicação. Identificamos padrões antes que se tornem problemas, ajudando você a manter seu relacionamento saudável e forte."
  },
  {
    question: "É seguro compartilhar informações no Sintonia?",
    answer: "Absolutamente! Priorizamos sua privacidade com criptografia de ponta a ponta e seguimos rigorosos protocolos de segurança. Suas informações pessoais são tratadas com máxima confidencialidade e nunca são compartilhadas com terceiros."
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "Muitos casais relatam melhorias na comunicação já nas primeiras semanas de uso. Com o uso consistente do Sintonia, você pode esperar mudanças positivas significativas em 1-2 meses, com benefícios crescentes ao longo do tempo."
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer: "Sim! Você tem total flexibilidade para cancelar sua assinatura quando desejar, sem taxas ou compromissos de longo prazo. Oferecemos também 15 dias de teste grátis para você experimentar todos os benefícios."
  }
];

export function Questions() {
  return (
    <section className="w-full mt-[8rem]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start justify-between max-w-7xl mx-auto gap-16">
          <div className="lg:w-5/12 lg:sticky lg:top-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#6D243F] mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-600 text-lg mb-12">
              Tire suas dúvidas sobre o Sintonia e descubra como podemos ajudar seu relacionamento
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#FF006F]/10 shadow-sm">
                <Shield className="w-8 h-8 text-[#FF006F] mb-4" />
                <h3 className="font-semibold text-[#292929] mb-2">Segurança</h3>
                <p className="text-sm text-gray-600">Seus dados protegidos com criptografia de ponta a ponta</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#FF006F]/10 shadow-sm">
                <MessageCircle className="w-8 h-8 text-[#FF006F] mb-4" />
                <h3 className="font-semibold text-[#292929] mb-2">Suporte</h3>
                <p className="text-sm text-gray-600">Atendimento personalizado para suas dúvidas</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#FF006F]/10 shadow-sm">
                <Clock className="w-8 h-8 text-[#FF006F] mb-4" />
                <h3 className="font-semibold text-[#292929] mb-2">Teste Grátis</h3>
                <p className="text-sm text-gray-600">15 dias para experimentar todos os recursos</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#FF006F]/10 shadow-sm">
                <CreditCard className="w-8 h-8 text-[#FF006F] mb-4" />
                <h3 className="font-semibold text-[#292929] mb-2">Flexível</h3>
                <p className="text-sm text-gray-600">Cancele sua assinatura quando quiser</p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-[#FF006F]/5 to-[#FFF2F8] p-6 rounded-2xl">
              <p className="text-[#6D243F] font-medium mb-3">Ainda tem dúvidas?</p>
              <button className="text-[#FF006F] font-medium hover:text-[#6D243F] transition-colors">
                Entre em contato com nosso suporte →
              </button>
            </div>
          </div>
          
          <div className="lg:w-6/12">
            <Accordion.Root type="single" collapsible className="space-y-3">
              {questions.map((item, index) => (
                <Accordion.Item
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl border border-[#FF006F]/10 shadow-sm overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-[#FFF2F8] transition-colors">
                      <span className="text-lg font-medium text-[#292929] pr-6">
                        {item.question}
                      </span>
                      <ChevronDownIcon className="h-5 w-5 text-[#FF006F] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden">
                    <div className="px-6 py-4 text-gray-600 border-t border-[#FF006F]/5">
                      {item.answer}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </div>
    </section>
  );
}