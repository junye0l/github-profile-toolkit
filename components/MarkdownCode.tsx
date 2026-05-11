"use client";

import { useState } from "react";
import {
  generateMarkdown,
  ShieldsStyle,
  SkillTheme,
} from "@/lib/badgeGenerator";
import { TypingSvgConfig, generateTypingSvgMarkdown } from "@/lib/typingSvg";
import { GitHubStatsConfig, generateGitHubStatsMarkdown } from "@/lib/githubStats";
import { PokemonConfig } from "./PokemonOptions";

interface MarkdownCodeProps {
  provider: "shields" | "skill-icons" | "typing-svg" | "github-stats" | "pokemon";
  shieldsStyle: ShieldsStyle;
  skillTheme: SkillTheme;
  perLine: number;
  typingConfig?: TypingSvgConfig;
  githubStatsConfig?: GitHubStatsConfig;
  pokemonConfig?: PokemonConfig;
}

export default function MarkdownCode({
  provider,
  shieldsStyle,
  skillTheme,
  perLine,
  typingConfig,
  githubStatsConfig,
  pokemonConfig,
}: MarkdownCodeProps) {
  const [copied, setCopied] = useState(false);

  const generatePokemonMarkdown = (config: PokemonConfig) => {
    if (!config.username || !config.chainId) {
      return "# 사용자명과 진화 라인을 선택해주세요";
    }
    // 새로운 방식: gen + starter 사용
    const gen = config.generation || "gen1";
    const cardUrl = `https://github-profile-toolkit.vercel.app//api/pokemon?user=${encodeURIComponent(config.username)}&gen=${encodeURIComponent(gen)}&starter=${encodeURIComponent(config.chainId)}`;
    return `# My Pokemon\n\n<div align="center">\n  <img src="${cardUrl}" alt="My Pokemon" />\n</div>`;
  };

  const markdown = provider === "typing-svg" && typingConfig
    ? generateTypingSvgMarkdown(typingConfig)
    : provider === "github-stats" && githubStatsConfig
    ? generateGitHubStatsMarkdown(githubStatsConfig)
    : provider === "pokemon" && pokemonConfig
    ? generatePokemonMarkdown(pokemonConfig)
    : generateMarkdown(
        provider as "shields" | "skill-icons",
        shieldsStyle,
        skillTheme,
        perLine,
      );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="markdown-section">
      <h2>GitHub README 마크다운 코드</h2>
      <button className="copy-btn" onClick={handleCopy}>
        {copied ? "복사 완료!" : "마크다운 복사"}
      </button>
      <div className="code-section">{markdown}</div>
    </div>
  );
}
