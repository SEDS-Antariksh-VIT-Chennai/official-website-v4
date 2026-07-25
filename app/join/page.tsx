import JoinUsSection from "@/components/JoinUsSection";
import NavWheel from "@/components/NavWheel";
import { getFormConfig } from "@/src/actions/admin";

export default async function JoinPage() {
  const config = await getFormConfig();

  return (
    <main className="min-h-screen w-full bg-background pt-20">
      <NavWheel />
      <JoinUsSection config={config} />
    </main>
  );
}
