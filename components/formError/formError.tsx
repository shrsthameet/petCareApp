import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '../CoreUI/Typography';
import { Row } from '../CoreUI/Flex';
import { Size, TypographyVariant } from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';

interface IFormErrorProps {
  errMsg: string;
}

export const FormError: FC<IFormErrorProps> = ({ errMsg }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <Row style={{
      marginLeft: 5 
    }}>
      <Typography variant={TypographyVariant.Caption} size={Size.Medium} color={theme.colors.error}>
        {errMsg}
      </Typography>
    </Row>
  );
};
