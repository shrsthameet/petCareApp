import { FC } from 'react';

import { greetingHeaderStyles } from './greetingHeaderStyle';
import { Typography } from '@/components/CoreUI/Typography';
import { Fonts, Size, TypographyVariant } from '@/utils/enum';
import { Column } from '@/components/CoreUI/Flex';
import { globalStyles } from '@/styles/global';

export const GreetingHeader: FC = () => {
  return (
    <Column
      style={[greetingHeaderStyles.greetingContainer, globalStyles.horizontalPadding]}
    >
      <Column>
        <Typography variant={TypographyVariant.Title} size={Size.Medium}>
          Good morning,
          {/* <Typography variant={TypographyVariant.Title} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_Bold}>
            Yuvisha
          </Typography> */}
        </Typography>
        <Typography variant={TypographyVariant.Display} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_Bold}>
            Yuvisha
        </Typography>
      </Column>

      <Column>
        <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_Medium}>
          Let's take care of your pets!
        </Typography>
      </Column>
    </Column>
  );
};