import { FC } from 'react';

import { greetingHeaderStyles } from './greetingHeaderStyle';
import { Typography } from '@/components/CoreUI/Typography';
import { Size, TypographyVariant } from '@/utils/enum';
import { Column } from '@/components/CoreUI/Flex';

export const GreetingHeader: FC = () => {
  return (
    <Column
      style={greetingHeaderStyles.greetingContainer}
    >
      <Column>
        <Typography variant={TypographyVariant.Title} size={Size.Medium} fontWeight='400'>
          Hello,
        </Typography>
        <Typography variant={TypographyVariant.Display} size={Size.Medium} fontWeight='700' color='#181616'>
          Yuvisha,
        </Typography>
      </Column>

      <Column>
        <Typography variant={TypographyVariant.Body} size={Size.Medium} fontWeight='400'>
          Let's take care of your pets!
        </Typography>
      </Column>
    </Column>
  );
};