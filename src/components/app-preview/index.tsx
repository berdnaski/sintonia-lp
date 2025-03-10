import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Heart, Home, Settings, ImageIcon, User, MessageCircle, Calendar, ArrowRight } from 'lucide-react';

export function AppPreview() {
  const [activeTab, setActiveTab] = useState("sinais");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showNotification] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const metrics = [
    { icon: "😊", label: "Sintonia", value: 85, color: "#FF006F" },
    { icon: "🔔", label: "Conexão", value: 85, color: "#4A7BF7" },
    { icon: "💬", label: "Comunicação", value: 85, color: "#FF006F" },
    { icon: "💖", label: "Intensidade", value: 85, color: "#9747FF" },
  ];

  const tabs = [
    { id: "sinais", label: "Sinais", icon: Bell },
    { id: "perguntas", label: "Perguntas", icon: MessageCircle },
    { id: "acoes", label: "Ações", icon: ArrowRight },
    { id: "insights", label: "Insights", icon: Heart },
  ];

  const moods = [
    { emoji: "😊", label: "Feliz", color: "#FFD700" },
    { emoji: "😐", label: "Irritado", color: "#FF8A00" },
    { emoji: "😍", label: "Apaixonado", color: "#FF006F" },
    { emoji: "😢", label: "Triste", color: "#4A7BF7" },
    { emoji: "😫", label: "Cansado", color: "#9747FF" },
  ];

  const sidebarItems = [
    { icon: Home, label: "Início", active: false },
    { icon: Bell, label: "Sinais", active: true },
    { icon: Heart, label: "Saúde", active: false },
    { icon: ImageIcon, label: "Memórias", active: false },
    { icon: User, label: "Perfil", active: false },
    { icon: Settings, label: "Ajustes", active: false },
  ];
  
  const recentSignals = [
    {
      date: "02 de Março de 2025",
      title: "Menos mensagens ao longo do dia",
      description: "Percebi que estamos conversando menos por mensagem. Algo mudou?",
      mood: "😐"
    },
    {
      date: "28 de Fevereiro de 2025",
      title: "Jantar especial",
      description: "Preparei um jantar surpresa e adoramos o momento juntos!",
      mood: "😍"
    }
  ];

  const insightContent = (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-100">
        <h3 className="text-lg font-semibold text-[#FF006F] mb-2">Insight da Semana</h3>
        <p className="text-gray-700">Vocês têm mantido uma boa comunicação, mas notamos uma redução de 15% nas conversas diárias.</p>
        <div className="mt-4 flex items-center gap-2">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-[#FF006F] to-[#FF4D94]"
            />
          </div>
          <span className="text-sm font-medium text-gray-600">65%</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-medium text-blue-700">Comunicação</h4>
            <span className="text-xl">💬</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">72%</p>
          <div className="flex items-center gap-1 text-sm text-blue-600">
            <ArrowRight className="w-3 h-3" />
            <span>+5% esta semana</span>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-medium text-purple-700">Conexão</h4>
            <span className="text-xl">🔔</span>
          </div>
          <p className="text-2xl font-bold text-purple-700">85%</p>
          <div className="flex items-center gap-1 text-sm text-purple-600">
            <ArrowRight className="w-3 h-3" />
            <span>+12% este mês</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  const questionContent = (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Perguntas para Reflexão</h3>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <p className="text-gray-800 font-medium">Como você se sente sobre a comunicação no relacionamento?</p>
          <div className="mt-3 flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-all"
            >
              Satisfeito
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-all"
            >
              Poderia melhorar
            </motion.button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <p className="text-gray-800 font-medium">Vocês têm dedicado tempo de qualidade juntos?</p>
          <div className="mt-3 flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-all"
            >
              Sim, regularmente
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-all"
            >
              Precisamos melhorar
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
  
  const actionContent = (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Ações Recomendadas</h3>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-xl border border-pink-200 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Calendar className="w-5 h-5 text-[#FF006F]" />
            </div>
            <div>
              <h4 className="font-medium text-[#FF006F]">Planeje um encontro especial</h4>
              <p className="text-sm text-gray-700 mt-1">Dedique um tempo exclusivo para vocês dois sem distrações.</p>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#FF006F] rounded-full text-sm text-white hover:bg-[#E0005F] transition-all shadow-sm"
            >
              Agendar
            </motion.button>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-700">Melhore a comunicação</h4>
              <p className="text-sm text-gray-700 mt-1">Pratique a escuta ativa e compartilhe seus sentimentos.</p>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 rounded-full text-sm text-white hover:bg-blue-700 transition-all shadow-sm"
            >
              Dicas
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile version
  const MobileAppPreview = () => (
    <div className="w-full mx-auto bg-white rounded-xl shadow-[0_10px_25px_rgba(8,_112,_184,_0.1)] overflow-hidden border border-gray-100">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-[480px]"
      >
        {/* Header with app name */}
        <div className="bg-gradient-to-r from-[#FF006F] to-[#FF4D94] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-white" />
            <h2 className="text-white font-semibold text-lg">Sintonia</h2>
          </div>
          <div className="relative">
            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center text-[#FF006F] text-[10px] font-bold"
                >
                  1
                </motion.div>
              )}
            </AnimatePresence>
            <Bell className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
          {/* Top Stats */}
          <div className="grid grid-cols-2 gap-3 p-3">
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-xl">
                😊
              </div>
              <div>
                <p className="text-xs text-gray-500">Sintonia</p>
                <p className="text-lg font-bold text-[#FF006F]">85%</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">
                💬
              </div>
              <div>
                <p className="text-xs text-gray-500">Comunicação</p>
                <p className="text-lg font-bold text-[#4A7BF7]">85%</p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-900">
                Sinais do Relacionamento
              </h1>
            </div>

            {/* Simplified Tabs - Icons only */}
            <div className="flex justify-between mb-6 bg-white p-2 rounded-xl shadow-sm">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#FF006F] to-[#FF4D94] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>

            {/* Tab Content - Simplified */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                {activeTab === "sinais" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 mb-3">Como você está?</h3>
                      <div className="flex flex-wrap justify-center gap-3 mb-4">
                        {moods.map((mood) => (
                          <motion.button
                            key={mood.label}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedMood(mood.label)}
                            className={`p-3 rounded-xl transition-all ${
                              selectedMood === mood.label
                                ? "bg-gradient-to-r from-pink-50 to-pink-100 shadow-md border border-pink-200"
                                : "hover:bg-gray-100 border border-transparent"
                            }`}
                          >
                            <span className="text-2xl">{mood.emoji}</span>
                          </motion.button>
                        ))}
                      </div>

                      <textarea
                        value={typedText}
                        onChange={(e) => setTypedText(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#FF006F] focus:ring-1 focus:ring-[#FF006F] transition-all resize-none text-sm"
                        rows={2}
                        placeholder="Descreva como você está se sentindo..."
                      />
                      {isTyping && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex justify-end mt-1"
                        >
                          <span className="text-xs text-gray-500">Digitando...</span>
                        </motion.div>
                      )}

                      <div className="flex justify-end space-x-3 mt-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF006F] to-[#FF4D94] text-white text-sm"
                        >
                          Registrar
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Just show one recent signal for mobile */}
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 mb-3">Último Sinal</h3>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-pink-50 to-white p-3 rounded-xl border border-pink-100"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-gray-500">{recentSignals[0].date}</p>
                            <h4 className="font-medium text-gray-800 mt-1">{recentSignals[0].title}</h4>
                            <p className="text-xs text-gray-600 mt-1">{recentSignals[0].description}</p>
                          </div>
                          <span className="text-2xl">{recentSignals[0].mood}</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
                
                {activeTab === "insights" && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-100">
                      <h3 className="text-base font-semibold text-[#FF006F] mb-2">Insight da Semana</h3>
                      <p className="text-sm text-gray-700">Vocês têm mantido uma boa comunicação, mas notamos uma redução de 15% nas conversas diárias.</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-[#FF006F] to-[#FF4D94]"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-600">65%</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "perguntas" && (
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">Perguntas para Reflexão</h3>
                    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-sm text-gray-800 font-medium">Como você se sente sobre a comunicação no relacionamento?</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700"
                        >
                          Satisfeito
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700"
                        >
                          Poderia melhorar
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "acoes" && (
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">Ações Recomendadas</h3>
                    <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-3 rounded-xl border border-pink-200 shadow-sm">
                      <div className="flex items-start gap-2">
                        <div className="bg-white p-1.5 rounded-lg shadow-sm">
                          <Calendar className="w-4 h-4 text-[#FF006F]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-[#FF006F]">Planeje um encontro especial</h4>
                          <p className="text-xs text-gray-700 mt-1">Dedique um tempo exclusivo para vocês.</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 bg-[#FF006F] rounded-full text-xs text-white"
                        >
                          Agendar
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between bg-white border-t border-gray-100 px-2 py-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`p-2 rounded-lg flex flex-col items-center justify-center ${
                item.active ? "text-[#FF006F]" : "text-gray-500"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[9px] mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );

  // Desktop version
  const DesktopAppPreview = () => (
    <div className="w-full mx-auto bg-white rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] overflow-hidden border border-gray-100">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-row h-[600px]"
      >
        {/* Sidebar */}
        <div className="w-20 bg-white border-r border-gray-100 flex flex-col items-center justify-start py-8 space-y-8">
          {sidebarItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-xl transition-all group flex flex-col items-center ${
                item.active 
                  ? "bg-pink-50 text-[#FF006F]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[0px] opacity-0 group-hover:opacity-100 transition-all">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Top Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 gap-2"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50">
                  <span className="text-xl">{metric.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">{metric.label}</span>
                  <motion.div
                    className="flex items-center"
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="text-sm font-bold" style={{ color: metric.color }}>
                      {metric.value}%
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Content Area */}
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-gray-900"
              >
                Sinais do Relacionamento
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <AnimatePresence>
                  {showNotification && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    >
                      1
                    </motion.div>
                  )}
                </AnimatePresence>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-all">
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
              </motion.div>
            </div>

            <div className="flex space-x-2 mb-8 bg-white p-1 rounded-xl shadow-sm">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#FF006F] to-[#FF4D94] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                {activeTab === "sinais" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Registrar sinal</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Como você está se sentindo?
                          </label>
                           <div className="flex flex-wrap gap-3">
                            {moods.map((mood) => (
                              <motion.button
                                key={mood.label}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedMood(mood.label)}
                                className={`p-3 rounded-xl transition-all ${
                                  selectedMood === mood.label
                                    ? "bg-gradient-to-r from-pink-50 to-pink-100 shadow-md border border-pink-200"
                                    : "hover:bg-gray-100 border border-transparent"
                                }`}
                              >
                                <span className="text-2xl">{mood.emoji}</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <textarea
                            value={typedText}
                            onChange={(e) => setTypedText(e.target.value)}
                            className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#FF006F] focus:ring-1 focus:ring-[#FF006F] transition-all resize-none"
                            rows={3}
                            placeholder="Descreva como você está se sentindo..."
                          />
                          {isTyping && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex justify-end mt-1"
                            >
                              <span className="text-xs text-gray-500">Digitando...</span>
                            </motion.div>
                          )}
                        </div>

                        <div className="flex justify-end space-x-4">
                          <button className="px-6 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition-all">
                            Cancelar
                          </button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FF006F] to-[#FF4D94] text-white hover:shadow-lg transition-all"
                          >
                            Registrar
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Últimos Sinais</h3>
                      <div className="space-y-4">
                        {recentSignals.map((signal, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-r from-pink-50 to-white p-4 rounded-xl border border-pink-100 hover:shadow-md transition-all"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-xs text-gray-500">{signal.date}</p>
                                <h4 className="font-medium text-gray-800 mt-1">{signal.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{signal.description}</p>
                              </div>
                              <span className="text-2xl">{signal.mood}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "insights" && insightContent}
                {activeTab === "perguntas" && questionContent}
                {activeTab === "acoes" && actionContent}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return isMobile ? <MobileAppPreview /> : <DesktopAppPreview />;
}

export default AppPreview