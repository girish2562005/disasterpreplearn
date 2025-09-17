import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Theme Toggle Demo</h2>
        <ThemeToggle />
      </div>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Click the theme toggle button to switch between light and dark modes.
        </p>
        <div className="p-4 bg-card border border-card-border rounded-lg">
          <h3 className="font-semibold mb-2">Sample Card</h3>
          <p className="text-sm text-muted-foreground">
            This card demonstrates how the theme affects different UI elements.
          </p>
        </div>
      </div>
    </div>
  );
}