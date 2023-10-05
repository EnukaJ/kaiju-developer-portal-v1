import ProjectSideBar from "@/components/ProjectSideBar"

export default function ProjectLayout({
  children,
  id,
  name,
}: {
  children: React.ReactNode,
  id:string,
  name:string
}) {
  
  return (
    <div className="h-full max-h-[100vh] w-full flex flex-row ">
      <ProjectSideBar  id={id}  name="Beat Kraft"/>
      {children}
    </div>
  )
}