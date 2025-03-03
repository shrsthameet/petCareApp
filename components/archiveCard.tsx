import React, { FC } from 'react';
import { Animated } from 'react-native';
import { getPetHealthRecordStyles } from './petHealthRecordCard.style';
import { Button } from '@/components/CoreUI/Button';
import { Row, Column } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import {
  TypographyVariant, Size, Fonts, IconLibraryName, Shape, 
  PetHealthRecord,
  FlexJustifyContent,
  FlexAlignItems,
  Position
} from '@/utils/enum';
import { IHealthRecordData, ITheme } from '@/utils/types';
import { Icon } from '@/components/CoreUI/Icons';
import { Avatar } from '@/components/CoreUI/Avatar';
import { globalStyles } from '@/styles/global';
import LabImg from '@/assets/images/lab.jpg';


interface IPetHealthRecordCardProps {
  theme: ITheme,
  healthRecords: IHealthRecordData[];
}

const PetHealthInfo = (record: any) => {
  console.log('record', record.recordType);
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
    PetVaccination: <Icon name='syringe' library={IconLibraryName.FontAwesome5} size={18} color={theme.colors.primary} />,
    PetMedication: <Icon name='pill' library={IconLibraryName.MaterialCommunityIcons} size={18} color={theme.colors.primary} />,
    PetMedicalCondition: <Icon name='notes-medical' library={IconLibraryName.FontAwesome5} size={18} color={theme.colors.primary} />,
    PetWeightRecord: <Icon name='weight' library={IconLibraryName.FontAwesome5} size={18} color={theme.colors.primary} />,
  };

  // Trigger animation when component mounts
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

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
          <Icon name='chevron-thin-down' library={IconLibraryName.Entypo} size={18} />
        </Row>
      </Row>

      <Column gap={30}>
        {healthRecords.map((item, index) => (
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
                {/* <Icon name='pets' library={IconLibraryName.MaterialIcons} color='rgb(252, 113 87)' size={18} /> */}
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
        ))}
      </Column>

      {/* {healthRecords.map((record: IHealthRecordData, index) => {
        return (
          <Animated.View style={[styles.card, {
            opacity: fadeAnim
          }]}
          key={index}
          >
            <Row style={styles.header}>
              <Row style={styles.iconContainer}>
                {iconMap[record.recordType]}
              </Row>
              <Typography
                variant={TypographyVariant.Body}
                size={Size.Medium}
                fontFamilyStyle={Fonts.Montserrat_SemiBold}
              >
                {record.recordType.replace('Pet', '')}
              </Typography>
            </Row>
            <Column gap={15}>
              <Column>
                <Typography
                  variant={TypographyVariant.Body}
                  size={Size.Small}
                  fontFamilyStyle={Fonts.Montserrat_SemiBold}
                >
                  {record.recordType.replace('Pet', '')} detail:
                </Typography>
                <Typography variant={TypographyVariant.Caption} size={Size.Medium}>Hey</Typography>
              </Column>

              {record.recordType}
              <Column>
                <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_SemiBold}>Due Date:</Typography>
                <Typography variant={TypographyVariant.Caption} size={Size.Medium}>{new Date(record.dueDate).toDateString()}</Typography>
              </Column>
              <PetHealthInfo
                record={record}
              />
            </Column>
            <Column>
              <Button
                title='Show Details'
                showIcon={true}
                iconPosition={Position.Right}
                iconLibrary={IconLibraryName.Ionicons}
                iconName='arrow-forward-sharp'
                size={Size.Small}
                shape={Shape.Pill}
              />
            </Column>
          </Animated.View>
        );
      })} */}
    
      {/* {record.recordType === 'PetVaccination' && (
        <Column gap={15}>
          <Column>
            <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_SemiBold}>Vaccination ID:</Typography>
            <Typography variant={TypographyVariant.Caption} size={Size.Medium}>{record.vaccination}</Typography>
          </Column>
          <Column>
            <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_SemiBold}>Due Date:</Typography>
            <Typography variant={TypographyVariant.Caption} size={Size.Medium}>{new Date(record.dueDate).toDateString()}</Typography>
          </Column>
        </Column>
      )} */}
    
      {/* {record.recordType === 'PetMedication' && (
        <>
          <Text style={styles.label}>Medication ID:</Text>
          <Text style={styles.value}>{record.medication}</Text>
          <Text style={styles.label}>Frequency:</Text>
          <Text style={styles.value}>{record.frequency}</Text>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.value}>{new Date(record.startDate).toDateString()}</Text>
        </>
      )}
    
      {record.recordType === 'PetMedicalCondition' && (
        <>
          <Text style={styles.label}>Condition ID:</Text>
          <Text style={styles.value}>{record.medicalCondition}</Text>
          <Text style={styles.label}>Diagnosed Date:</Text>
          <Text style={styles.value}>{new Date(record.diagnosedDate).toDateString()}</Text>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{record.status}</Text>
        </>
      )}
    
      {record.recordType === 'PetWeightRecord' && (
        <>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>
            {record.weight} {record.unit}
          </Text>
          <Text style={styles.label}>Recorded At:</Text>
          <Text style={styles.value}>{new Date(record.recordedAt).toDateString()}</Text>
        </>
      )} */}
    
      {/* <TouchableOpacity style={styles.expandButton}>
            <Text style={styles.expandText}>Show Details</Text>
          </TouchableOpacity> */}
    </Column>
  );
};
