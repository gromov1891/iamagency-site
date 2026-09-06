import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const INLINE_LINK_PATTERN = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;

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
    const href = getSafeHref(match[2]);
    parts.push(children.slice(cursor, index));

    if (!href) {
      parts.push(match[0]);
    } else if (href.startsWith("/")) {
      parts.push(<Link key={`${index}-${href}`} href={href}>{match[1]}</Link>);
    } else {
      const opensNewTab = href.startsWith("http://") || href.startsWith("https://");
      parts.push(
        <a
          key={`${index}-${href}`}
          href={href}
          target={opensNewTab ? "_blank" : undefined}
          rel={opensNewTab ? "noopener noreferrer" : undefined}
        >
          {match[1]}
        </a>,
      );
    }

    cursor = index + match[0].length;
  }

  parts.push(children.slice(cursor));
  return <>{parts.map((part, index) => <Fragment key={index}>{part}</Fragment>)}</>;
}
