import { useRouter } from "@/router";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { ServicesPage } from "@/pages/ServicesPage";
import { ProgrammePage } from "@/pages/ProgrammePage";
import { InsightsPage } from "@/pages/InsightsPage";
import { ScannerPage } from "@/pages/ScannerPage";
import { SuccessStoriesPage } from "@/pages/SuccessStoriesPage";
import { UseCasesPage } from "@/pages/UseCasesPage";
import { ContactPage } from "@/pages/ContactPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

const ROUTES = {
  "/": HomePage,
  "/about": AboutPage,
  "/services": ServicesPage,
  "/programme": ProgrammePage,
  "/insights": InsightsPage,
  "/scanner": ScannerPage,
  "/success-stories": SuccessStoriesPage,
  "/use-cases": UseCasesPage,
  "/contact": ContactPage,
};

export function App() {
  const { path } = useRouter();
  const Page = ROUTES[path] ?? NotFoundPage;
  return <Page />;
}
