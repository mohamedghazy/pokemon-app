import { Button } from "@/components/ui/button";
import type { ViewMode } from "@/types/pokemon";

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      <Button
        variant={currentView === "pagination" ? "default" : "outline"}
        onClick={() => onViewChange("pagination")}
        className={
          currentView === "pagination"
            ? "bg-pokemon-text text-pokemon-card hover:bg-pokemon-text/90"
            : "border-pokemon-shadow/40 hover:bg-pokemon-mint/50"
        }>
        Page Controls
      </Button>
      <Button
        variant={currentView === "loadMore" ? "default" : "outline"}
        onClick={() => onViewChange("loadMore")}
        className={
          currentView === "loadMore"
            ? "bg-pokemon-text text-pokemon-card hover:bg-pokemon-text/90"
            : "border-pokemon-shadow/40 hover:bg-pokemon-mint/50"
        }>
        Infinite Scroll
      </Button>
    </div>
  );
};

export default ViewToggle;
