import { FC } from 'react';

import { useSelector } from 'react-redux';
import { greetingHeaderStyles } from './greetingHeaderStyle';
import { Typography } from '@/components/CoreUI/Typography';
import { Fonts, Size, TypographyVariant } from '@/utils/enum';
import { Column } from '@/components/CoreUI/Flex';
import { globalStyles } from '@/styles/global';
import { RootState } from '@/redux/rootReducer';

export const GreetingHeader: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Column
      style={[greetingHeaderStyles.greetingContainer, globalStyles.horizontalPadding]}
    >
      <Column>
        <Typography variant={TypographyVariant.Title} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_Medium}>
          Good morning,
          {/* <Typography variant={TypographyVariant.Title} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_Bold}>
            {user.firstName}
          </Typography> */}
        </Typography>
        <Typography variant={TypographyVariant.Display} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_Bold}>
          {user.firstName}
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