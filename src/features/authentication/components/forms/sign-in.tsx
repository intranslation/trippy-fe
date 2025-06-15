import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "../../api/authenticate";

export default function SignIn({ setForm }: { setForm: () => void }) {
  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("email");
    const password = formData.get("password");

    mutate({ username, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-auto flex w-full flex-col gap-4"
    >
      <span className="text-2xl font-bold">Bem-vindo de volta!</span>
      <span className="mt-2 mb-8">Comece a viajar novamente</span>

      <fieldset className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm">
          E-mail
        </label>
        <Input type="text" placeholder="Seu e-mail" name="email" />
      </fieldset>
      <fieldset>
        <label htmlFor="email">Senha</label>
        <Input type="password" placeholder="Sua senha" name="password" />
      </fieldset>

      <Button variant="default" type="submit" disabled={isPending}>
        Acessar
      </Button>
      <Button variant="secondary" onClick={setForm} disabled={isPending}>
        Não tenho uma conta
      </Button>
    </form>
  );
}
