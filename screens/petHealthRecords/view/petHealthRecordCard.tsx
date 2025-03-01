import React, { FC } from 'react';
import { Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { getPetHealthRecordStyles } from './petHealthRecordCard.style';
import { Button } from '@/components/CoreUI/Button';
import { Row, Column } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import {
  TypographyVariant, Size, Fonts, Position, IconLibraryName, Shape, 
  PetHealthRecord
} from '@/utils/enum';
import { IHealthRecordData, ITheme } from '@/utils/types';
import { Icon } from '@/components/CoreUI/Icons';

interface IPetHealthRecordCardProps {
  theme: ITheme,
  healthRecords: IHealthRecordData[];
}

const PetHealthInfo = (record: any) => {
  switch (record.recordType) {
  case PetHealthRecord.PetVaccination:
    return (
      <Column>
        <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_SemiBold}>Due Date:</Typography>
        <Typography variant={TypographyVariant.Caption} size={Size.Medium}>{new Date(record.dueDate).toDateString()}</Typography>
      </Column>
    );
  case PetHealthRecord.PetMedication:
    return (
      <Column>
        <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_SemiBold}>Due Date:</Typography>
        <Typography variant={TypographyVariant.Caption} size={Size.Medium}>{new Date(record.dueDate).toDateString()}</Typography>
      </Column>
    );
  case PetHealthRecord.PetMedicalCondition:
    return (
      <Column>
        <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_SemiBold}>Due Date:</Typography>
        <Typography variant={TypographyVariant.Caption} size={Size.Medium}>{new Date(record.dueDate).toDateString()}</Typography>
      </Column>
    );
  case PetHealthRecord.PetWeightRecord:
    return (
      <Column>
        <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_SemiBold}>Due Date:</Typography>
        <Typography variant={TypographyVariant.Caption} size={Size.Medium}>{new Date(record.dueDate).toDateString()}</Typography>
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
    <>

      {healthRecords.map((record: IHealthRecordData, index) => {
        return (
          <Animated.View style={[styles.card, {
            opacity: fadeAnim
          }]} key={index}>
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
                <Typography variant={TypographyVariant.Caption} size={Size.Medium}>{record.vaccination}</Typography>
              </Column>

              {/* {record.recordType}
              <Column>
                <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_SemiBold}>Due Date:</Typography>
                <Typography variant={TypographyVariant.Caption} size={Size.Medium}>{new Date(record.dueDate).toDateString()}</Typography>
              </Column> */}
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
      })}
    
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
    </>
  );
};
