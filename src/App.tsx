import Drawer from "./components/Dialog";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ItemList from "./components/ItemList";

export default function App() {
  return (
    <>
      <Header />
      <Drawer />
      <main>
        <ItemList />
      </main>
      <Footer />
    </>
  );
}
