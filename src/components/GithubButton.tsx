"use client";

import { Github } from "lucide-react";

const GithubButton = () => (
  <div className="h-7 w-7 flex justify-center items-center border rounded-md cursor-pointer text-foreground hover:bg-muted ">
    <Github
      className="h-4 w-4 "
      onClick={() =>
        window.open("https://github.com/TryForefront/dataset-tool")
      }
    />
  </div>
);

export default GithubButton;
