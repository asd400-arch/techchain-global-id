export default function LocaleLink({ idHref, children, style, target, rel }) {
  return (
    <a href={idHref} style={style} target={target} rel={rel}>
      {children}
    </a>
  );
}
