import { Helmet } from "react-helmet-async";

export default function FrontendHealth() {
  return (
    <>
      <Helmet>
        <title>Frontend Health</title>
      </Helmet>
      <div>Frontend is healthy.</div>
    </>
  );
}
