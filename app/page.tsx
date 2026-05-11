"use client";

import { useState } from "react";
import ProviderSelector from "@/components/ProviderSelector";
import InfoBox from "@/components/InfoBox";
import StyleOptions from "@/components/StyleOptions";
import BadgePreview from "@/components/BadgePreview";
import MarkdownCode from "@/components/MarkdownCode";
import Footer from "@/components/Footer";
import { ShieldsStyle, SkillTheme } from "@/lib/badgeGenerator";
import TypingOptions from "@/components/TypingOptions";
import TypingPreview from "@/components/TypingPreview";
import { TypingSvgConfig, defaultTypingSvgConfig } from "@/lib/typingSvg";
import GitHubStatsOptions from "@/components/GitHubStatsOptions";
import GitHubStatsPreview from "@/components/GitHubStatsPreview";
import { GitHubStatsConfig, defaultGitHubStatsConfig } from "@/lib/githubStats";
import PokemonOptions, { PokemonConfig } from "@/components/PokemonOptions";
import PokemonPreview from "@/components/PokemonPreview";

export default function Home() {
  const [provider, setProvider] = useState<"shields" | "skill-icons" | "typing-svg" | "github-stats" | "pokemon">(
    "shields",
  );
  const [shieldsStyle, setShieldsStyle] = useState<ShieldsStyle>("plastic");
  const [skillTheme, setSkillTheme] = useState<SkillTheme>("dark");
  const [perLine, setPerLine] = useState(8);
  const [typingConfig, setTypingConfig] = useState<TypingSvgConfig>(defaultTypingSvgConfig);
  const [githubStatsConfig, setGithubStatsConfig] = useState<GitHubStatsConfig>(defaultGitHubStatsConfig);
  const [pokemonConfig, setPokemonConfig] = useState<PokemonConfig>({
    username: "",
    chainId: "pikachu",
    generation: "gen1",
  });

  return (
    <div className="container">
      <h1>Github Profile Toolkit</h1>
      <p className="subtitle">
        깃허브 프로필 꾸미기 편의기능 모음
      </p>

      <ProviderSelector
        currentProvider={provider}
        onProviderChange={setProvider}
      />

      <InfoBox provider={provider} />

      {provider === "typing-svg" ? (
        <>
          <TypingOptions config={typingConfig} onConfigChange={setTypingConfig} />
          <TypingPreview config={typingConfig} />
        </>
      ) : provider === "github-stats" ? (
        <>
          <GitHubStatsOptions config={githubStatsConfig} onConfigChange={setGithubStatsConfig} />
          <GitHubStatsPreview config={githubStatsConfig} />
        </>
      ) : provider === "pokemon" ? (
        <>
          <PokemonOptions config={pokemonConfig} onConfigChange={setPokemonConfig} />
          <PokemonPreview config={pokemonConfig} />
        </>
      ) : (
        <>
          <StyleOptions
            provider={provider as "shields" | "skill-icons"}
            shieldsStyle={shieldsStyle}
            skillTheme={skillTheme}
            perLine={perLine}
            onShieldsStyleChange={setShieldsStyle}
            onSkillThemeChange={setSkillTheme}
            onPerLineChange={setPerLine}
          />

          <BadgePreview
            provider={provider as "shields" | "skill-icons"}
            shieldsStyle={shieldsStyle}
            skillTheme={skillTheme}
            perLine={perLine}
          />
        </>
      )}

      <MarkdownCode
        provider={provider}
        shieldsStyle={shieldsStyle}
        skillTheme={skillTheme}
        perLine={perLine}
        typingConfig={typingConfig}
        githubStatsConfig={githubStatsConfig}
        pokemonConfig={pokemonConfig}
      />

      <Footer />
    </div>
  );
}
