'use client';

/**
 * Always links to Indonesia (`idHref`). `sgHref` is ignored — kept for call-site compatibility.
 */
export default function LocaleLink({ idHref, sgHref: _sg, children, style, target, rel }) {
  return (
    <a href={idHref} style={style} target={target} rel={rel}>
      {children}
    </a>
  );
}
