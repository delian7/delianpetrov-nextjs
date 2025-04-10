import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/Header";
import LandingSection from "../components/LandingSection";
import ProjectsSection from "../components/ProjectsSection";
// import { Route, Routes, BrowserRouter } from 'react-router';
import ContactMeSection from "../components/ContactMeSection";
import Timeline from "../components/Timeline";
import Footer from "../components/Footer";
import { AlertProvider } from "../context/alertContext";
import Alert from "../components/Alert";
// import RedirectPage from "./components/RedirectPage";
// import SeastatusModalContent from "./components/SeastatusModalContent";
import { ModalProvider } from "../context/modalContext";
import { ScrollProvider } from '../context/ScrollContext';
import BackToTopButton from "../components/BackToTopButton";
import Head from "next/head";
import NotionPageRenderer from "@/components/NotionPageRenderer";

const HomePage = () => {
  return (
    <main>
      <Header />
      <LandingSection />
      <NotionPageRenderer pageId="1d16a365467e8010b28be6f4ba33ee55" />
      <ProjectsSection />
      <Timeline />
      <ContactMeSection />
      <Footer />
      <BackToTopButton />
      <Alert />
    </main>
  )
}

function AppContent() {
  return (
    <ChakraProvider>
      <AlertProvider>
        <ModalProvider>
          <ScrollProvider>
            <HomePage />
          </ScrollProvider>
        </ModalProvider>
      </AlertProvider>
    </ChakraProvider>
  );
}

function App() {
  return (
    <>
      <Head>
        <meta property="og:title" content="Delian Petrov: Senior Software Engineer Specialized in Ruby on Rails and React" />
        <meta property="og:description" content="I combine the power of Ruby on Rails and React to build dynamic web applications. Discover my work, learn from my experiences, and explore the world of full-stack development." />
        <meta property="og:image" content="/avatar.jpg" />
      </Head>
      <AppContent />
    </>
  )
}

export default App;
