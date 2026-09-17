import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const INLINE_LINK_PATTERN = /\[([^\]\n]+)\]\(([^)\s]+)\)|https?:\/\/[^\s<>"\u00ab\u00bb]+/gi;

function getSafeHref(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (value.startsWith("#")) return value;

  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? value : null;
  } catch {
    return null;
  }
}

export default function InlineArticleText({ children }: { children: string }) {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of children.matchAll(INLINE_LINK_PATTERN)) {
    const index = match.index ?? 0;
    const isMarkdown = match[2] !== undefined;
    let address = isMarkdown ? match[2] : match[0].replace(/[.,!?;:]+$/, "");
    // Keep balanced parentheses in URLs, but leave sentence punctuation outside.
    if (!isMarkdown) {
      while (address.endsWith(")") && (address.match(/\)/g)?.length ?? 0) > (address.match(/\(/g)?.length ?? 0)) {
        address = address.slice(0, -1);
      }
      address = address.replace(/[.,!?;:]+$/, "");
    }
    const label = isMarkdown ? match[1] : address;
    const suffix = isMarkdown ? "" : match[0].slice(address.length);
    const href = getSafeHref(address);
    parts.push(children.slice(cursor, index));

    if (!href) {
      parts.push(match[0]);
    } else if (href.startsWith("/")) {
      parts.push(<Link key={`${index}-${href}`} href={href}>{label}</Link>);
    } else {
      const opensNewTab = /^https?:\/\//i.test(href);
      parts.push(
        <a
          key={`${index}-${href}`}
          href={href}
          target={opensNewTab ? "_blank" : undefined}
          rel={opensNewTab ? "noopener noreferrer" : undefined}
        >
          {label}
        </a>,
      );
    }

    if (href) parts.push(suffix);
    cursor = index + match[0].length;
  }

  parts.push(children.slice(cursor));
  return <>{parts.map((part, index) => <Fragment key={index}>{part}</Fragment>)}</>;
}
