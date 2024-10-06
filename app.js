const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const menu = `Bem vindo ao Suporte Técnico\n
1 - Problemas com Equipamento\n
2 - Link de Internet\n
3 - Problema com usuário de acesso\n
4 - Certificado / Token\n
5 - Problema no Sistema`;

// Inicializa o cliente do WhatsApp com LocalAuth para salvar a sessão
const client = new Client({
  authStrategy: new LocalAuth(), // Salva automaticamente a sessão local
});

// Função para verificar se o horário atual está dentro do intervalo permitido
const isWithinBusinessHours = () => {
  const now = new Date();
  const day = now.getDay(); // 0: Domingo, 1: Segunda, ..., 6: Sábado
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Verifica se é dia útil (segunda a sexta)
  if (day >= 1 && day <= 5) {
    return (hours === 7 && minutes >= 0) || (hours >= 8 && hours < 18);
  }
  // Verifica se é sábado
  else if (day === 6) {
    return (hours === 7 && minutes >= 0) || (hours < 13);
  }
  return false; // Fora do horário de funcionamento
};

// Quando o cliente estiver pronto
client.on("ready", () => {
  console.log("AUTO-BOT PRONTO!");
});

// Gera o QR Code no terminal se necessário
client.on("qr", (qr) => {
  console.log("QR Code recebido, escaneie com seu WhatsApp.");
  qrcode.generate(qr, { small: true });
});

// Lida com mensagens recebidas
client.on("message", (message) => {
  const receivedMessage = message.body.toLowerCase(); // Captura a mensagem recebida

  // Verifica se está dentro do horário de funcionamento
  if (!isWithinBusinessHours()) {
    message.reply("Desculpe, estamos fora do horário de atendimento. Favor retornar durante o horário comercial.");
    return;
  }

  // Verifica a escolha do usuário
  switch (receivedMessage) {
    case "1":
      message.reply('Você selecionou "Problemas com Equipamento". Por favor, descreva o problema.');
      break;
    case "2":
      message.reply('Você selecionou "Link de Internet". Verificando a conexão...');
      break;
    case "3":
      message.reply('Você selecionou "Problema com usuário de acesso". O que está acontecendo com o acesso?');
      break;
    case "4":
      message.reply('Você selecionou "Certificado / Token". Informe detalhes do problema.');
      break;
    case "5":
      message.reply('Você selecionou "Problema no Sistema". Detalhe o erro.');
      break;
    default:
      message.reply(menu);
  }
});

// Inicializa o cliente
client.initialize();