import { Link } from "@/router";
import { PageLayout } from "@/components/PageLayout";

export function NotFoundPage() {
  return (
    <PageLayout>
      <div className="center-screen">
        <div className="message-panel">
          <h1 className="message-title-large">404</h1>
          <h2 className="message-title">Page not found</h2>
          <p className="message-copy">The page you're looking for doesn't exist or has been moved.</p>
          <div className="message-actions">
            <Link to="/" className="message-button">Go home</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
