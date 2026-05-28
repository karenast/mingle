export default function StatusBar({ dark = false }) {
  const color = dark ? "text-mingle-dark" : "text-mingle-gray";
  return (
    <>
      <span className={`absolute left-[24px] top-[14px] text-[11px] font-normal ${color}`}>
        9:41
      </span>
      <span className={`absolute right-[24px] top-[14px] text-[10px] font-normal ${color}`}>
        ● ● ●
      </span>
    </>
  );
}
