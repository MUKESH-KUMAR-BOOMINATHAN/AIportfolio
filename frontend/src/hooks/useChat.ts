import { useState } from "react";

export interface Source {
  id: string;
  category: string;
  text: string;
  similarity: number;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  suggestions?: string[];
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi there! I'm **HireMukeshkumar AI**, a customized assistant trained on my portfolio database. Ask me anything about my internships, agent architectures, or how I get things done!"
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [tone, setTone] = useState<"concise" | "detailed">("concise");

  const parseMessageContent = (text: string): { text: string; suggestions: string[] } => {
    const suggestions: string[] = [];
    const suggestionRegex = /\[SUGGESTION:\s*(.+?)\]/gi;
    let match;
    while ((match = suggestionRegex.exec(text)) !== null) {
      suggestions.push(match[1].trim());
    }
    const cleanedText = text.replace(/\[SUGGESTION:\s*.+?\]/gi, '').trim();
    return { text: cleanedText, suggestions };
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    const history = messages
      .slice(-6)
      .map(msg => ({ role: msg.role, content: msg.content }));

    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined");
      }
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: history,
          tone: tone
        }),
      });

      if (!response.ok) {
        throw new Error("Could not connect to the backend server.");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("ReadableStream is not supported.");

      let done = false;
      let streamedText = "";
      let retrievedSources: Source[] = [];
      let buffer = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: !done });
          
          let boundary = buffer.indexOf("\n\n");

          while (boundary !== -1) {
            const block = buffer.slice(0, boundary).trim();
            buffer = buffer.slice(boundary + 2);

            const lines = block.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const dataStr = line.slice(6).trim();
                if (dataStr === "[DONE]") {
                  done = true;
                  break;
                }
                try {
                  const parsed = JSON.parse(dataStr);
                  if (parsed.sources) {
                    retrievedSources = parsed.sources;
                  } else if (parsed.text) {
                    streamedText += parsed.text;
                    const parsedContent = parseMessageContent(streamedText);
                    setMessages(prev => {
                      const updated = [...prev];
                      updated[updated.length - 1] = {
                        role: "assistant",
                        content: parsedContent.text,
                        suggestions: parsedContent.suggestions.length > 0 ? parsedContent.suggestions : undefined,
                        sources: retrievedSources.length > 0 ? retrievedSources : undefined
                      };
                      return updated;
                    });
                  } else if (parsed.error) {
                    streamedText += `\n\n*(Error: ${parsed.error})*`;
                    setMessages(prev => {
                      const updated = [...prev];
                      updated[updated.length - 1] = {
                        role: "assistant",
                        content: streamedText,
                        sources: retrievedSources.length > 0 ? retrievedSources : undefined
                      };
                      return updated;
                    });
                  }
                } catch (e) {}
              }
            }
            boundary = buffer.indexOf("\n\n");
          }
        }
      }
    } catch (error: any) {
      console.error(error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I had trouble reaching my AI backend. Please verify that the server is active or configure the frontend `.env.local` file with `NEXT_PUBLIC_API_URL`."
        };
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return {
    messages,
    isTyping,
    tone,
    setTone,
    handleSend,
    handleReset
  };
}
