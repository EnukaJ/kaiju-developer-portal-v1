import Header from "@/components/Header";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full w-full  flex flex-col ">
      <Header />
      {children}
    </div>
  );
};