"use client";

import { SignInButton } from "@clerk/nextjs";
import { Button } from "../../_components/ui/button";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const LoginPageComponent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent,
    );
    setIsMobile(isMobileDevice);
  }, []);

  // Se for mobile, exibe a mensagem de erro
  if (isMobile) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold">
            A aplicação não está disponível para dispositivos móveis
          </h1>
          <p className="mt-4">
            Por favor, acesse a aplicação em um computador.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-2">
      {/* ESQUERDA */}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="Finance AI"
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      {/* DIREITA */}
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPageComponent;
