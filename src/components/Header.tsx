import { Zap } from "lucide-react";

interface HeaderProps {
  storeName: string;
}

export function Header({ storeName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-primary via-warning to-accent border-b-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="container mx-auto px-4 h-16 flex items-center">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-none bg-foreground flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] border-2 border-foreground rotate-3">
            <Zap className="h-6 w-6 text-warning" />
          </div>
          <div>
            <h1 className="font-black text-2xl leading-none text-foreground tracking-tighter uppercase" style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.5)' }}>
              {storeName}
            </h1>
            <p className="text-xs font-bold text-foreground/80 uppercase tracking-widest">
              Catálogo Discuy
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
