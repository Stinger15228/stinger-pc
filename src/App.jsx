import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CatalogSection from "./components/CatalogSection";
import ConfiguratorSection from "./components/ConfiguratorSection";
import QualityBentoSection from "./components/QualityBentoSection";
import ReviewsSection from "./components/ReviewsSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import MobileStickyBar from "./components/MobileStickyBar";
import ToastNotification from "./components/ui/ToastNotification";

export default function App() {
  const [toast, setToast] = useState(null);
  const [selectedBuildForConfigurator, setSelectedBuildForConfigurator] = useState(null);

  // Auto-dismiss toast after 4.5 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleShowToast = (toastData) => {
    setToast(toastData);
  };

  const handleOpenConfigurator = () => {
    const el = document.getElementById("configurator");
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleOpenCatalog = () => {
    const el = document.getElementById("catalog");
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleSelectBuildForConfigurator = (build) => {
    setSelectedBuildForConfigurator(build);
    handleOpenConfigurator();
    handleShowToast({
      title: "Параметры переданы в конфигуратор",
      message: `Загружены компоненты сборки «${build.name}». Вы можете скорректировать видеокарту, память или корпус.`,
      icon: "copy",
      triggerConfetti: false,
    });
  };

  return (
    <div className="min-h-screen bg-[#05060A] text-slate-100 selection:bg-cyan-500/30 selection:text-white relative">
      {/* HUD Navbar */}
      <Navbar onOpenConfigurator={handleOpenConfigurator} />

      <main>
        {/* 1. Cinematic Hero Section */}
        <HeroSection
          onOpenConfigurator={handleOpenConfigurator}
          onOpenCatalog={handleOpenCatalog}
        />

        {/* 2. Ready Builds Catalog with Real-Time Game Simulator */}
        <CatalogSection
          onSelectBuildForConfigurator={handleSelectBuildForConfigurator}
          onShowToast={handleShowToast}
        />

        {/* 3. In-Page Mega-Configurator (Pro Mode & Express Quiz) */}
        <ConfiguratorSection
          onShowToast={handleShowToast}
          selectedBuildFromCatalog={selectedBuildForConfigurator}
        />

        {/* 4. Workshop Standards & Bento Grid */}
        <QualityBentoSection />

        {/* 5. Real Client Reviews & Avito 5.0 Rating */}
        <ReviewsSection />

        {/* 6. Interactive FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Luxury Dark Cyber Footer */}
      <Footer />

      {/* Touch-Friendly Sticky HUD Bar for Mobile Screens */}
      <MobileStickyBar />

      {/* Floating HUD Toast Notification with Canvas Confetti */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
