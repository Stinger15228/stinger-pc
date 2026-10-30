import React, { useState, useEffect } from "react";
import BackgroundEffects from "./components/BackgroundEffects";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CatalogSection from "./components/CatalogSection";
import ConfiguratorSection from "./components/ConfiguratorSection";
import ConfiguratorModal from "./components/ConfiguratorModal";
import QualityBentoSection from "./components/QualityBentoSection";
import ReviewsSection from "./components/ReviewsSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import MobileStickyBar from "./components/MobileStickyBar";
import ToastNotification from "./components/ui/ToastNotification";

import ShowcaseMarquee from "./components/ShowcaseMarquee";
import LaserDivider from "./components/ui/LaserDivider";

export default function App() {
  const [toast, setToast] = useState(null);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [configuratorMode, setConfiguratorMode] = useState("pro");
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

  const handleOpenStudioModal = (mode = "pro") => {
    setConfiguratorMode(mode);
    setIsConfiguratorOpen(true);
  };

  const handleCloseStudioModal = () => {
    setIsConfiguratorOpen(false);
    setSelectedBuildForConfigurator(null);
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
    setConfiguratorMode("pro");
    setIsConfiguratorOpen(true);
    handleShowToast({
      title: "Сборка загружена в конфигуратор",
      message: `Комплектующие «${build.name}» предзагружены. Вы можете изменить видеокарту, процессор или корпус.`,
      icon: "copy",
      triggerConfetti: false,
    });
  };

  return (
    <div className="relative min-h-screen bg-[#05070E] text-white overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* 0. Атмосферные фоновые эффекты (5 слоев: купол, туманности, кибер-сетка, 3D HUD, курсор) */}
      <BackgroundEffects />

      {/* Контент сайта с z-10, чтобы живой фон просвечивал сквозь прозрачные секции */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Парящий стеклянный остров навигации */}
        <Navbar onOpenConfigurator={() => handleOpenStudioModal("pro")} />

        <main className="flex-1">
          {/* 2. Первый экран (Hero Section) */}
          <HeroSection
            onOpenConfigurator={() => handleOpenStudioModal("pro")}
            onOpenCatalog={handleOpenCatalog}
          />

          <LaserDivider />

          {/* 3. Каталог готовых ПК с симулятором FPS */}
          <CatalogSection
            onSelectBuildForConfigurator={handleSelectBuildForConfigurator}
            onShowToast={handleShowToast}
          />

          <LaserDivider />

          {/* 4. Бесконечная фото-лента живых сборок из мастерской (Infinite Showcase Marquee) */}
          <ShowcaseMarquee
            onOpenConfigurator={() => handleOpenStudioModal("pro")}
            onShowToast={handleShowToast}
          />

          <LaserDivider />

          {/* 5. Компактный тизер кастомной студии на странице (~420px) */}
          <ConfiguratorSection
            onOpenStudioModal={handleOpenStudioModal}
            onOpenQuizModal={() => handleOpenStudioModal("quiz")}
          />

          <LaserDivider />

          {/* 5. Стандарты лаборатории (Bento Grid с техновиджетами) */}
          <QualityBentoSection />

          <LaserDivider />

          {/* 6. Реальные отзывы клиентов (Симметричная сетка 3x2) */}
          <ReviewsSection />

          <LaserDivider />

          {/* 7. Частые вопросы (2-колоночный layout) */}
          <FaqSection />
        </main>

        {/* 8. Темный кибер-футер */}
        <Footer />
      </div>

      {/* 9. Нижняя мобильная панель */}
      <MobileStickyBar onOpenConfigurator={() => handleOpenStudioModal("pro")} />

      {/* 10. Полноэкранный Пошаговый Кибер-Конфигуратор & Квиз (Modal Overlay) */}
      <ConfiguratorModal
        isOpen={isConfiguratorOpen}
        onClose={handleCloseStudioModal}
        initialMode={configuratorMode}
        selectedBuildFromCatalog={selectedBuildForConfigurator}
        onShowToast={handleShowToast}
      />

      {/* 11. HUD Toast-уведомление с конфетти */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
