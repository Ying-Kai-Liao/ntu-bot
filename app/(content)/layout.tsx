import NavBar from "./_components/NavBar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
// bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]

const ContentLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col gap-y-10 items-center bg-gradient-to-tl from-[#a5ffff] to-[#ffb6b8]">
        <NavBar />
        {children}
      </div>
    </>
  );
};

export default ContentLayout;
