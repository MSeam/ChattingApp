import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  console.log("Messages state updated. Length:", messages?.length, messages);

  const lastMessageRef = useRef();

  useEffect(() => {
    if (messages?.length > 0) {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* Render messages */}
      {!loading &&
        Array.isArray(messages) &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {/* Loading skeleton */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* No messages */}
      {!loading && (!Array.isArray(messages) || messages.length === 0) && (
        <p className="text-center">Send a message to start the conversation</p>
      )}

      {/* Spacer for the last message to enable smooth scroll */}
      <div ref={lastMessageRef} />
    </div>
  );
};

export default Messages;
