import Hero from "../components/Herosection";
import PatioOverview from "../components/PatioOverview";
import PatioCustomization from "../components/PatioCustomization";
import Ideas from "../components/Ideas";
import GetAQuote from "../components/GetAQuote";
function Home() {
  return (
    <>
      <Hero />
      <PatioOverview />
      <PatioCustomization />
      <Ideas />
      <GetAQuote />
    </>
  );
}

export default Home;
