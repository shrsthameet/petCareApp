// src/types/images.d.ts or src/images.d.ts
declare module '*.jpg' {
  const value: string | ImageSourcePropType;
  export default value;
}

declare module '*.png' {
  const value: string | ImageSourcePropType;
  export default value;
}

declare module '*.jpeg' {
  const value: string | ImageSourcePropType;
  export default value;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const value: string | ImageSourcePropType;
  export default value;
}

declare module '*.gif' {
  const value: string | ImageSourcePropType;
  export default value;
}

declare module '*.webp' {
  const value: string | ImageSourcePropType;
  export default value;
}

declare module '*.ttf' {
  const value: string;
  export default value;
}
