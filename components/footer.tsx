export function Footer() {
  return (
    <footer className="mt-12">
      <div className="flex h-16 items-center justify-center border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
