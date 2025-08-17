export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 sm:p-20">
      <div className="gap-[10px] flex justify-end w-full">
        <a href="#" className="px-4 py-2 rounded-md bg-[#5e4dcd] text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#5e5dcd]">Login</a>
        <a href="#" className="px-4 py-2 rounded-md bg-[#5e4dcd] text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#5e5dcd]">Register</a>
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form action={"/"}>
          <input 
            type="text" 
            name="url" 
            placeholder="Enter a URL of a news article"
            className="min-h-[50px] max-w-[600px] px-4 text-black text-[15px] border border-[#5e4dcd] rounded-l-md bg-transparent focus:border-[#3898EC] focus:outline-none" 
          />
          <input 
            type="submit" 
            value="Submit" 
            className="min-h-[50px] px-4 py-2 rounded-r-md bg-[#5e4dcd] text-white text-[15px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#5e5dcd]" 
          />
        </form>
      </main>
      <footer className="flex flex-col items-center justify-center">
        <span>Always FactCheck your sources</span>
        <span>Built with 
          <a href="https://spring.io/projects/spring-boot" className="text-blue-500 underline">Spring Boot</a> 
          and 
          <a href="https://nextjs.org/" className="text-blue-500 underline">Next.js</a>
        </span>
      </footer>
    </div>
  );
}
