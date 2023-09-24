export interface IconsProps {
  icon: string;
  size?: string; // 2xs | xs | sm | lg | xl | 2xl
  color?: string;
}

function Icons(props: IconsProps) {
  let height = "1em";
  switch (props.size) {
    case "2xs":
      height = "0.625em";
      break;
    case "xs":
      height = "0.75em";
      break;
    case "sm":
      height = "0.875em";
      break;
    case "lg":
      height = "1.25em";
      break;
    case "xl":
      height = "1.5em";
      break;
    case "2xl":
      height = "2em";
      break;
    default:
      height = "1em";
  }

  switch (props.icon) {
    case "files":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={height}
          viewBox="0 0 384 512"
        >
          <style>{`svg{fill:${props.color}}`}</style>
          <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
        </svg>
      );
  }
}

export default Icons;
