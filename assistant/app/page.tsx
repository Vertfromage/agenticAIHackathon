import OpenAIAssistant from "@/app/ui/openai-assistant";

export default function Home() {
  return (
    <main>
      <div className="mx-auto mb-12 max-w-lg text-center">
        <div className="m-4">
          <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl">
            Networking Helper
          </h1>
        </div>
        <OpenAIAssistant
          assistantId="asst_0qGqpNFwnaI0vKFZav9fGtOA"
          greeting="How can I help you with your networking?"
        />
      </div>
    </main>
  );
}
