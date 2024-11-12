"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

// Tamanho do lote para enviar as transações em partes menores
const BATCH_SIZE = 15;

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  if (!hasPremiumPlan) {
    throw new Error("You need a premium plan to generate AI reports");
  }

  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Pegar as transações do mês recebido
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
    },
  });

  // Função para dividir as transações em lotes menores
  const transactionBatches = [];
  for (let i = 0; i < transactions.length; i += BATCH_SIZE) {
    transactionBatches.push(transactions.slice(i, i + BATCH_SIZE));
  }

  let reportContent = "";

  // Enviar cada lote para o OpenAI e concatenar os resultados
  for (const batch of transactionBatches) {
    const batchContent = batch
      .map(
        (transaction) =>
          `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
      )
      .join(";");

    const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas: ${batchContent}`;

    // Chamada para o OpenAI processar o lote
    const completion = await openAi.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
        },
        {
          role: "user",
          content,
        },
      ],
    });

    // Concatenar o resultado do lote no conteúdo final
    reportContent += completion.choices[0].message.content;
  }

  return reportContent;
};
