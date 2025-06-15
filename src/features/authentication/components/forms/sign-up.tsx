import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp({ setForm }: { setForm: () => void }) {
  return (
    <form action="" className="mx-auto my-auto flex w-full flex-col gap-4">
      <span className="text-2xl font-bold">Cria sua conta já!</span>
      <span className="mt-2 mb-8">
        Em poucos segundos você já vai estar usando o trippy
      </span>

      <fieldset className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm">
          E-mail
        </label>
        <Input type="text" placeholder="Digite seu melhor e-mail" />
      </fieldset>
      <fieldset>
        <label htmlFor="email">Senha</label>
        <Input type="password" placeholder="Crie uma senha" />
      </fieldset>
      <fieldset>
        <label htmlFor="email">Confirme sua senha</label>
        <Input type="password" placeholder="Sua senha novamente" />
      </fieldset>

      <Button variant="default" type="submit">
        Criar conta
      </Button>
      <Button variant="secondary" onClick={setForm}>
        Já tenho uma conta
      </Button>
    </form>
  );
}
