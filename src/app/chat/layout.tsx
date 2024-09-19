import { cookies } from "next/headers";
import Navbar from "../ui/dashboard/navbar";

export default function ChatLayout({
    children, username
  }: {
    children: React.ReactNode, username:string
  }) {
    const cookiesStore = cookies();
    const userEmail =  cookiesStore.get('userEmail')?.value;

    return (
      <>
        <div className="grid grid-col-9 grid-row-1 gap-1 mx-1">
        <Navbar username={userEmail}/>
        <div className="col-start-2 col-end-9 mr-6 md:mr-0">{children}</div>
      </div>
      </>
    )
  }