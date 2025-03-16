import React, { FC } from 'react';
import { Animated } from 'react-native';
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import { Circle, useFont } from '@shopify/react-native-skia';
import type { SharedValue } from 'react-native-reanimated';
import { getPetHealthRecordStyles } from './petHealthRecordCard.style';
import { Button } from '@/components/CoreUI/Button';
import { Row, Column } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import {
  TypographyVariant, Size, IconLibraryName, Shape, 
  PetHealthRecord,
  FlexJustifyContent,
  FlexAlignItems,
  Fonts,
} from '@/utils/enum';
import { IHealthRecordData, ITheme } from '@/utils/types';
import { Icon } from '@/components/CoreUI/Icons';
import { Avatar } from '@/components/CoreUI/Avatar';
import { globalStyles } from '@/styles/global';
import LabImg from '@/assets/images/lab.jpg';
import LineImg from '@/assets/images/line.png';
import { IconButton } from '@/components/CoreUI/IconButton';
import { Tabs } from '@/components/CoreUI/Tabs';
import Montserrat from '@/assets/fonts/Montserrat-Medium.ttf';

// ...

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color='black' />;
}

interface IPetHealthRecordCardProps {
  theme: ITheme,
  healthRecords: IHealthRecordData[];
}

const PetHealthInfo = (record: any) => {
  switch (record.record.recordType) {
  case PetHealthRecord.PetVaccination:
    return (
      <Column flex={1} justifyContent={FlexJustifyContent.Between}
        style={{
          marginTop: 40
        }}>
        <Typography
          variant={TypographyVariant.Caption}
          size={Size.Large}
        >
        RabVac | Non-Core
        </Typography>
        <Row justifyContent={FlexJustifyContent.Between} style={{
          marginBottom: 15
        }}>
          <Column>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >Due date</Typography>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >2025-08-08</Typography>
          </Column>
          <Column>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >Completed</Typography>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >no</Typography>
          </Column>
        </Row>
      </Column>
    );
  case PetHealthRecord.PetMedication:
    return (
      <Column flex={1} justifyContent={FlexJustifyContent.Between}
        style={{
          marginTop: 40
        }}>
        <Typography
          variant={TypographyVariant.Body}
          size={Size.Small}
        >
        Rabbies
        </Typography>
        <Row justifyContent={FlexJustifyContent.Between} style={{
          marginBottom: 10
        }}>
          <Column>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >Diagnosed date</Typography>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >2025-08-08</Typography>
          </Column>
          <Column>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >Status</Typography>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >ongoing</Typography>
          </Column>
        </Row>
      </Column>
    );
  case PetHealthRecord.PetMedicalCondition:
    return (
      <Column flex={1} justifyContent={FlexJustifyContent.Between}
        style={{
          marginTop: 40
        }}>
        <Typography
          variant={TypographyVariant.Body}
          size={Size.Small}
        >
        Rabbies
        </Typography>
        <Row justifyContent={FlexJustifyContent.Between} style={{
          marginBottom: 10
        }}>
          <Column>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >Diagnosed date</Typography>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >2025-08-08</Typography>
          </Column>
          <Column>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >Status</Typography>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >ongoing</Typography>
          </Column>
        </Row>
      </Column>
    );
  case PetHealthRecord.PetWeightRecord:
    return (
      <Column flex={1} justifyContent={FlexJustifyContent.Between}
        style={{
          marginTop: 40
        }}>
        <Typography
          variant={TypographyVariant.Body}
          size={Size.Small}
        >
        Rabbies
        </Typography>
        <Row justifyContent={FlexJustifyContent.Between} style={{
          marginBottom: 10
        }}>
          <Column>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >Diagnosed date</Typography>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >2025-08-08</Typography>
          </Column>
          <Column>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >Status</Typography>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
            >ongoing</Typography>
          </Column>
        </Row>
      </Column>
    );
  default:
    return null;
  }
};

export const PetHealthRecordCard: FC<IPetHealthRecordCardProps> = ({ 
  theme,
  healthRecords
}) => {
  const fadeAnim = new Animated.Value(0);  // Fade-in animation
  const styles = getPetHealthRecordStyles(theme);

  const iconMap: any = {
    PetVaccination: <Icon name='syringe' library={IconLibraryName.FontAwesome5} size={18} color={'rgb(252, 113 87)'} />,
    PetMedication: <Icon name='pill' library={IconLibraryName.MaterialCommunityIcons} size={18} color={'rgb(252, 113 87)'} />,
    PetMedicalCondition: <Icon name='notes-medical' library={IconLibraryName.FontAwesome5} size={18} color={'rgb(252, 113 87)'} />,
    PetWeightRecord: <Icon name='weight' library={IconLibraryName.FontAwesome5} size={18} color={'rgb(252, 113 87)'} />,
  };

  // Trigger animation when component mounts
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);


  const DATA = Array.from({
    length: 31 
  }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  }));

  const font = useFont(Montserrat, 12);
  const { state, isActive } = useChartPressState({
    x: 0, y: {
      highTmp: 0 
    } 
  });

  return (
    <Column gap={30} style={globalStyles.horizontalPadding}>
      <Row 
        style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 10,
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0, height: 4 
          // },
          // shadowOpacity: 0.15,
          // shadowRadius: 10,
          // elevation: 5,
          marginTop: 15
        }}
        justifyContent={FlexJustifyContent.Between}
        alignItems={FlexAlignItems.Center}
      >
        <Row gap={10}>
          <Avatar
            imageUrl={LabImg}
            size={Size.Medium}
          />
          <Column style={{
            marginTop: 5
          }}>
            <Typography variant={TypographyVariant.Body} size={Size.Medium}>Max</Typography>
            <Typography variant={TypographyVariant.Caption} size={Size.Medium}>2 years 8 months</Typography>
          </Column>
        </Row>
        <Row>
          <IconButton size={Size.XSmall} bgColor={theme.colors.primary} iconName='chevron-thin-down' iconLibrary={IconLibraryName.Entypo} iconSize={16} />
        </Row>
      </Row>

      <Column gap={20} style={{
        height: 250
      }}>
        <Row justifyContent={FlexJustifyContent.Between} alignItems={FlexAlignItems.Center}>
          <Row justifyContent={FlexJustifyContent.End} alignItems={FlexAlignItems.Center}>
            <Typography variant={TypographyVariant.Body} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_SemiBold}>
              Weight track
            </Typography>
          </Row>
          <Row justifyContent={FlexJustifyContent.End} alignItems={FlexAlignItems.Center}>
            <Typography variant={TypographyVariant.Caption} size={Size.Medium} style={{
              color: theme.colors.primary
            }}>
              Filter
            </Typography>
            <Icon name='filter-list' library={IconLibraryName.MaterialIcons} size={20} color={theme.colors.primary} />
          </Row>
        </Row>
        <CartesianChart
          data={DATA}
          xKey='day'
          yKeys={['highTmp']}
          axisOptions={{
            font
          }}
          chartPressState={state}
        >
          {({ points }) => (
            <>
              <Line points={points.highTmp} color={theme.colors.primary} strokeWidth={1} />
              {isActive ? (
                <ToolTip x={state.x.position} y={state.y.highTmp.position} />
              ) : null}
            </>
          )}
        </CartesianChart>
      </Column>

      <Column gap={30}>
        {/* {healthRecords.map((item, index) => (
          <Column key={index}>
            <Row justifyContent={FlexJustifyContent.End} alignItems={FlexAlignItems.Center}>
              <Typography variant={TypographyVariant.Caption} size={Size.Medium} style={{
                marginRight: 10,
                color: theme.colors.primary
              }}>See all</Typography>
            </Row>
            <Column style={styles.cardContainer}>
              <Row alignItems={FlexAlignItems.Center} style={styles.cardFloatingTitle}>
                {iconMap[item.recordType]}
                <Typography color='rgb(252, 113 87)' variant={TypographyVariant.Body} size={Size.Small}>
                  {item.recordType.replace('Pet', '')}
                </Typography>
              </Row>
              <PetHealthInfo
                record={item}
              />
              <Button title='Show details' size={Size.Small} shape={Shape.Pill} />
            </Column>
          </Column>
        ))} */}
        <Tabs
          tabs={healthRecords.map((item, index) => {
            if (item.recordType !== 'PetWeightRecord') {
              return {
                title: item.recordType === 'PetMedicalCondition' ? 'Health' : item.recordType.replace('Pet', ''),
                content: (
                  <Column key={index}>
                    <Row justifyContent={FlexJustifyContent.End} alignItems={FlexAlignItems.Center}>
                      <Typography variant={TypographyVariant.Caption} size={Size.Medium} style={{
                        color: theme.colors.primary
                      }}>
                        {/* See all */}
                        Filter
                      </Typography>
                      <Icon name='filter-list' library={IconLibraryName.MaterialIcons} size={20} color={theme.colors.primary} />
                    </Row>
                    <Column style={styles.cardContainer}>
                      <Row alignItems={FlexAlignItems.Center} style={styles.cardFloatingTitle}>
                        {iconMap[item.recordType]}
                        <Typography color='rgb(252, 113 87)' variant={TypographyVariant.Body} size={Size.Small}>
                          {item.recordType.replace('Pet', '')}
                        </Typography>
                      </Row>
                      <PetHealthInfo
                        record={item}
                      />
                      <Button title='Show details' size={Size.Small} shape={Shape.Pill} />
                    </Column>
                  </Column>
                )
              };
            } 
          }).filter(Boolean)}  // Filter out null values
        />
      </Column>
    </Column>
  );
};
