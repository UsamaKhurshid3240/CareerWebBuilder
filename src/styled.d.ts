import 'styled-components';
import type { BuilderUITheme } from '@/lib/types/builderTheme';

declare module 'styled-components' {
  export interface DefaultTheme extends BuilderUITheme {}
}
