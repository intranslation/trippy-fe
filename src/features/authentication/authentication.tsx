import SignIn from "@/features/authentication/components/forms/sign-in";
import SignUp from "@/features/authentication/components/forms/sign-up";
import { useState } from "react";

export default function Authentication() {
  const [currentForm, setForm] = useState<"signIn" | "signUp">("signUp");

  return (
    <main className="flex h-screen">
      <section className="flex w-[60%] flex-col items-center justify-center bg-[#4318D1] p-6 px-12 text-white max-md:hidden">
        <div>
          <h1 className="text-5xl font-bold">
            Planeje suas viagens de forma inteligente
          </h1>

          <p className="my-6 w-full text-left text-lg">
            Crie roteiros personalizados organize suas atividades e gerencie
            seus gastos em um só lugar.
          </p>

          <ul className="mt-4 flex w-full flex-col gap-6">
            <Benefit
              title="Roteiros Personalizados"
              description="Crie itinerários detalhados para cada dia da sua viagem"
            />
            <Benefit
              title="Gestão de Gastos"
              description="Controle seu orçamento e despesas em tempo real"
            />
            <Benefit
              title="Compartilhamento"
              description="Planeje viagens em grupo com facilidade"
            />
          </ul>
        </div>
      </section>
      <section className="flex w-[40%] p-8 max-md:w-full">
        {currentForm === "signIn" && (
          <SignIn setForm={() => setForm("signUp")} />
        )}
        {currentForm === "signUp" && (
          <SignUp setForm={() => setForm("signIn")} />
        )}
      </section>
    </main>
  );
}

const Benefit = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <li className="flex items-center justify-start gap-4">
    <div className="min-h-14 min-w-14 rounded-full bg-zinc-200"></div>
    <div className="flex flex-col gap-2">
      <span className="font-semibold">{title}</span>
      <span>{description}</span>
    </div>
  </li>
);
