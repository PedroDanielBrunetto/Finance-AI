import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import AcquirePlanButton from "./components/acquire-plan-button";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar />
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Assinatura</h1>
        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-semibold text-6xl">0</span>
                <div className="text-2xl text-muted-foreground">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Apenas 10 transações por mês (7/10)</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatório de IA</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-semibold text-6xl">19</span>
                <div className="text-2xl text-muted-foreground">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatório de IA</p>
              </div>
            </CardContent>
            <AcquirePlanButton />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
