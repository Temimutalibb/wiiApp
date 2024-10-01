"use client";
import { getMessages, message } from "@/app/lib/actions";
import { chatViewState } from "@/app/lib/placeholder-data";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatViewCard({
  userID,
}: {
  userID: string | undefined;
}) {
  const pathname = usePathname();
  const [chatId, setChatId] = useState<string>("");
  const [chatData, setChatData] = useState<chatViewState[]>([]);
  const [messageData, setmessageData] = useState("");

  useEffect(() => {
    if (pathname) {
      const pathParts = pathname.split("/");
      const id: any = pathParts[2]; // Extract the '2' from '/chat/2/edit'
      setChatId(id);
      {
        /*fetching the message*/
      }
      const fetchChatData = async () => {
        const data = await getMessages(id);
        setChatData(data);
      };
      fetchChatData();
    }
  }, [pathname]);

  const handleChange = (e: any) => {
    setmessageData(e.target.value);
  };

  const handleClick = () => {
    setChatData([
      ...chatData,
      {
        conversation_id: Number(chatId),
        user_id: Number(userID),
        content: messageData,
      },
    ]);

    setTimeout(() => {
      setmessageData("");
    }, 500);
  };

  useEffect(() => {
    let interval: any;
    if (chatId) {
      const fetchChatData = async () => {
        const data = await getMessages(chatId);
        setChatData(data);
      };

      // Set up polling interval
      interval = setInterval(fetchChatData, 5000); // Poll every 5 seconds

      // Fetch initial data
      fetchChatData();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [chatId]);

  let numberId = Number(userID);

  return (
    <>
      <div className="bg-blue-100 h-screen">
        <div>
          <ul className=" h-[73vh] overflow-y-scroll">
            {chatData?.map(({ conversation_id, user_id, content }) => (
              <li
                className={`p-1 w-1/2 m-1 
          ${
            user_id === numberId
              ? "bg-green-400 mr-auto"
              : "bg-green-200 ml-auto text-right"
          }`}
                key={conversation_id}
              >
                {content}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center">
          <div className=" flex justify-center bg-blue-100  text-center fixed overflow-hidden w-[90%] bottom-0 z-10">
            <div className="rounded-2xl mx-[10%] w-[80%] bg-blue-300">
              <form
                action={message}
                className=" p-1 rounded shadow-md w-[100%]  flex"
              >
                <input
                  onChange={handleChange}
                  type="text"
                  name="content"
                  id="message"
                  value={messageData}
                  className="rounded-2xl w-full text-gray-900 sm:text-sm focus:outline-none focus:border-blue-500"
                />

                <input
                  type="text"
                  value={chatId}
                  name="conversation_id"
                  id="message"
                  className="rounded-2xl w-full text-gray-900 sm:text-sm focus:outline-none focus:border-green-500 hidden "
                />

                <input
                  type="text"
                  value={userID}
                  name="userID"
                  id="message"
                  className="rounded-2xl w-full text-gray-900 sm:text-sm focus:outline-none focus:border-green-500 hidden"
                />

                <button onClick={handleClick} type="submit" className="pl-3">
                  <PaperAirplaneIcon className="size-9 text-green-600" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
