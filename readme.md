
# WhatsApp Support Bot

WhatsApp Support Bot é um bot em Node.js que permite a automatização de atendimentos de suporte técnico via WhatsApp.

## Instalação

Use o gerenciador de pacotes [npm](https://www.npmjs.com/) para instalar as dependências.

```bash
npm install whatsapp-web.js qrcode-terminal
```

## Uso

```javascript
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const menu = `Bem vindo ao Suporte Técnico\n
1 - Problemas com Equipamento\n
2 - Link de Internet\n
3 - Problema com usuário de acesso\n
4 - Certificado / Token\n
5 - Problema no Sistema de Captura`;

// Inicializa o cliente do WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(), // Salva a sessão local
});

client.on("ready", () => {
  console.log("AUTO-BOT PRONTO!");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("message", (message) => {
  if (!isWithinBusinessHours()) {
    message.reply("Estamos fora do horário de atendimento.");
    return;
  }

  switch (message.body.toLowerCase()) {
    case "1":
      message.reply('Você selecionou "Problemas com Equipamento".');
      break;
    case "2":
      message.reply('Você selecionou "Link de Internet".');
      break;
    default:
      message.reply(menu);
  }
});

client.initialize();
```
